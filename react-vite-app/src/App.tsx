// src/App.tsx in Vite project

import React, { useEffect, useState } from "react";
import Button from "./components/Button";

// Define the type for remote components with or without props
type RemoteComponentWithCallback = React.ComponentType<{ onClickCallback: () => void }>;
type RemoteComponentWithoutProps = React.ComponentType<{}>;

declare global {
  interface Window {
    ExternalApp?: {
      Button1?: RemoteComponentWithCallback;
      Test2?: RemoteComponentWithoutProps;
    };
  }
}

function App() {
  const [RemoteButton, setRemoteButton] = useState<RemoteComponentWithCallback | null>(null);
  const [Test2, setTest2] = useState<RemoteComponentWithoutProps | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:3000/bundle.js"; // Webpack remote bundle
    script.onload = () => {
      if (window.ExternalApp) {
        if (window.ExternalApp.Button1) {
          setRemoteButton(() => window.ExternalApp!.Button1!);
        }
        if (window.ExternalApp.Test2) {
          setTest2(() => window.ExternalApp!.Test2!);
        }
      } else {
        console.error("ExternalApp not found on window");
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleClick = () => {
    alert("Callback triggered from Vite host!");
  };

  return (
    <div>
      <h1>Vite Host</h1>
      
      {RemoteButton ? (
        <RemoteButton onClickCallback={handleClick} />
      ) : (
        <p>Loading remote button...</p>
      )}

      <Button />

      {Test2 && <Test2 />}
    </div>
  );
}

export default App;
