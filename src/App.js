import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Result from './Result';
import Confirmation from './Confirmation';
import Testimonial from './Testimonial';




function App() {


  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/result' element={<Result />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/testimonial' element={<Testimonial />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
