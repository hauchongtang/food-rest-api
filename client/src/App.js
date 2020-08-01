import React from 'react';
import FoodTable from './components/FoodTable'
import InputForm from './components/InputForm'
import Instructions from './components/Instructions'

import './App.css'

function App() {
  return (
    <>
      <Instructions />
      <InputForm />
      <FoodTable />
    </>
  );
}

export default App;
