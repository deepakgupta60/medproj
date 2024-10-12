import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ selectedCity, setSelectedCity, selectedState, setSelectedState }) => {

    const [stateData, setStateData] = useState([])
    const [cityData, setCityData] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        axios.get('https://meddata-backend.onrender.com/states').then((response) => setStateData(response.data)).catch((err) => console.log("Error while fetching state"))
    }, [])


    useEffect(() => {
        if(selectedState)
        {
            axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`).then((response) => setCityData(response.data)).catch((err) => console.log("Error while fetching city"))

        }
    }, [selectedState])


    const handleSearch=()=>{
        navigate("/result")
    }

    return (
        <>
            <div>
               

                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <option value={""}>Select State</option>
                    {stateData.length > 0 ? stateData.map((data, idx) => (
                        <option key={idx} value={data}>{data}</option>
                    )) : <option>No Found State</option>
                    }
                </select>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>

                    <option value={""}>Select City</option>
                    {cityData.length > 0 ? cityData.map((data, idx) => (
                        <option key={idx} value={data}>{data}</option>
                    )) : <option>Not Found City</option>}
                </select>

                <br/>

                <button onClick={handleSearch}>Search</button>

            </div>


        </>
    )
}

export default Home