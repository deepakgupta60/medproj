import React, { createContext, useState } from 'react'


export const LocationContext = createContext()

const LocationProvider = ({children}) => {
  
    const [selectedCity, setSelectedCity]=useState(()=>{
    const selectCity = localStorage.getItem("city");
    return selectCity || ''
  })

  const [selectedState, setSelectedState]=useState(()=>{
    const selectState = localStorage.getItem("state");
    return selectState || ''
  })
    

  
  return (
    <LocationContext.Provider value={{selectedCity, setSelectedCity, selectedState, setSelectedState}}>
        {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider