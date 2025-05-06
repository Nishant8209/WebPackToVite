import React from 'react';
import logo from './logo.svg';
import './App.css';

import Test2 from './components/Test2';
import Paymentwigid from './PaymentWidget';

function App() {
  return (
   <>
   <Paymentwigid  onClickCallback={()=>{console.log('uhhgjhbjhbb')}}></Paymentwigid>
   </>
  );
}

export default App;
