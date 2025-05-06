Integrating a Webpack Remote Component into a Vite Application
This guide explains how to load a React component built with Webpack into a Vite application using a bundle.js file.

 Step-by-Step Integration
 
Step 1: Create Components in the Webpack Application
Build your React components (e.g., PaymentWidget, Button1) inside your Webpack project.

Step 2: Expose Components via the window Object
In your Webpack entry file (e.g., index.ts), attach the components to the global window object like this:

    import Button1 from './components/Button1';
    import PaymentWidget from './components/PaymentWidget';

    const ExternalApp = {
      PaymentWidget,
      Button1
    };

    (window as any).ExternalApp = ExternalApp;


Step 3: Configure Webpack and TypeScript
        webpack.config.js should include:

      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        },
      output: {
      filename: 'bundle.js',
      library: 'ExternalApp',
      libraryTarget: 'umd',
    },

This tells Webpack not to bundle React and ReactDOM, and to expose your module as window.ExternalApp.
tsconfig.json should include:

    {
      "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "es6"],
        "jsx": "react-jsx",
        ...
      }
    }
    

Step 4: Build and Run the Webpack App
Build the Webpack app using:

      npm run build

Then serve the bundle.js on a local server (e.g., http://localhost:3000/bundle.js).

Step 5: Patch React in the Vite Host App
In your Vite app's main.tsx, expose React and ReactDOM globally:

    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;

     This is required because the Webpack bundle expects them to be globally available due to the externals config.

Step 6: Dynamically Load the Webpack Bundle
In your Vite component, dynamically inject the script and set the remote component:

    useEffect(() => {
      const s = document.createElement('script');
      s.src = 'http://localhost:3000/bundle.js';
      s.onload = () => {
        if (window.ExternalApp?.PaymentWidget) {
          setRemote(() => window.ExternalApp.PaymentWidget!);
        } else {
          console.error('PaymentWidget not found on window.ExternalApp');
        }
      };
      s.onerror = () => console.error('Failed to load remote bundle');
      document.body.appendChild(s);
    
      return () => {
        document.body.removeChild(s);
      };
    }, []);


Step 7: Use the Remote Component
After loading, render the remote component like a regular React component:

    {Remote ? (
      <Remote
        onClickCallback={(data) => {
          console.log('Form Data:', { firstName, lastName });
          console.log('Payment Data:', data);
        }}
      />
    ) : (
      <p>Loading remote widget…</p>
    )}


✅ Summary
  1.Webpack exposes components via window.ExternalApp
  2.React is made global in the Vite app to support externals
  3.Components are loaded dynamically via <script>
  4.The pattern reduces bundle size and allows microfrontend-style sharing

