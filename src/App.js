import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Result from './Result';

function App() {
  
  return (
      
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />

          <Route path='/result' element={<Result/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
