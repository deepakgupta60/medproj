import React from 'react'
import { useLocation } from 'react-router-dom'

const Confirmation = () => {

    const location = useLocation(); // use location for use state..
    const {time} = location.state || {}; // then get the state from location... or set default value to it..
    
  return (
    <>
    
    <div>Confirmation: {time}</div>
    </>
  )
}

export default Confirmation