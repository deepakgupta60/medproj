import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Result from './Result';

function App() {
  const [selectedState,setSelectedState]=useState(()=>{
    const selectState = localStorage.getItem("state");
    return selectState || ''
  });
  const [selectedCity,setSelectedCity]=useState(()=>{
    const selectCity = localStorage.getItem("city");
    return selectCity || ''
  });
  
  return (
      
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home 
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          
          />}  />

          <Route path='/result' element={<Result
          
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          
          />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
