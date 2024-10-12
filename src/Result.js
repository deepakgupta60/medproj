import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Result = ({selectedCity, setSelectedCity, selectedState, setSelectedState}) => {
  
  const [cityData, setCityData]=useState([]);
  const [stateData, setStateData]=useState([]);
  
  useEffect(()=>{
    
    axios.get('https://meddata-backend.onrender.com/states').then((response)=>setStateData(response.data)).catch((err)=>console.log("Error Fetching while"))

  },[])

  useEffect(()=>{
    if(selectedState)
    {
        axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`).then((response)=>setCityData(response.data)).catch((err)=>console.log("Error While Fetching", err))

    }
  },[selectedState])


  useEffect(()=>{

  },[])

  const fetchMedicalCentre = ()=>{
    
  }


  const handleStateChange=(e)=>{
    const selectState = e.target.value;
    setSelectedState(selectState)
    setSelectedCity('')

  }


  const handleCityChange=(e)=>{
    const selectCity = e.target.value;
    setSelectedCity(selectCity)

  }



    return (
    <>
    

    <div>

        <select value={selectedState} onChange={handleStateChange} >

            <option value={""}>Select State</option>
            {stateData.length>0 ? stateData.map((data, idx)=>(
                <option value={data} key={idx}>{data}</option>
            )):<option>No Found State</option>}
        </select>

        <select value={selectedCity} onChange={handleCityChange}>
            <option value={""}>Select City</option>
            {
                cityData.length>0 ? cityData.map((data, idx)=>(
                    <option key={idx} value={data}>{data}</option>
                )) : <option>No City Found</option>
            }
            <option></option>
        </select>

    </div>
    </>
  )
}

export default Result