import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { LocationContext } from './LocationProvider';

const Result = () => {
  const {selectedCity, setSelectedCity, selectedState, setSelectedState}=useContext(LocationContext)

  const [cityData, setCityData]=useState([]);
  const [stateData, setStateData]=useState([]);
  const [medicalCentre, setMedicalCentre]=useState([])

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
    if(selectedState && selectedCity)
    {
        fetchMedicalCentre(selectedState, selectedCity)
    }
  },[selectedCity, selectedState])

  const fetchMedicalCentre = (state, city)=>{
        axios.get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`).then((response)=>setMedicalCentre(response.data)).catch((err)=>console.log("Error Fetching Erro: ", err))
  }


  const handleStateChange=(e)=>{
    const selectState = e.target.value;

    setSelectedState(selectState)
    localStorage.setItem("state", selectState)
    setSelectedCity('')
    setMedicalCentre([])
  }


  const handleCityChange=(e)=>{
    const selectCity = e.target.value;
    localStorage.setItem("city", selectCity)
    setSelectedCity(selectCity)

  }


  const handleSearch=()=>{
   if(selectedState && selectedCity)
    {
        fetchMedicalCentre(selectedState, selectedCity)
    } 
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
        </select>
            <br/>

            <button onClick={handleSearch}>Search</button>


            <div>

                {
                    medicalCentre.length>0 ? medicalCentre.map((data)=>(
                        <Fragment>
                            
                            <p>{data.Address}</p>
                            <button onClick={}></button>
                        </Fragment>
                        
                    )) : <p>not found</p>
                }
            </div>
    </div>
    </>
  )
}

export default Result