import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'


import { LocationContext } from './LocationProvider';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const { selectedCity, setSelectedCity, selectedState, setSelectedState } = useContext(LocationContext)

  const [cityData, setCityData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [medicalCentre, setMedicalCentre] = useState([])
  
  const navigate = useNavigate();

  // for related to create tabs..
  const [selectedCentre, setSelectedCentre]=useState(null)
  const [activeTab, setActiveTab]=useState('today');
  const [selectedTime, setSelectedTime]=useState(null)


  
  useEffect(() => {

    axios.get('https://meddata-backend.onrender.com/states').then((response) => setStateData(response.data)).catch((err) => console.log("Error Fetching while"))

  }, [])

  useEffect(() => {
    if (selectedState) {
      axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`).then((response) => setCityData(response.data)).catch((err) => console.log("Error While Fetching", err))

    }
  }, [selectedState])


  useEffect(() => {
    if (selectedState && selectedCity) {
      fetchMedicalCentre(selectedState, selectedCity)
    }
  }, [selectedCity, selectedState])

  const fetchMedicalCentre = (state, city) => {
    axios.get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`).then((response) => setMedicalCentre(response.data)).catch((err) => console.log("Error Fetching Erro: ", err))
  }


  const handleStateChange = (e) => {
    const selectState = e.target.value;

    setSelectedState(selectState)
    localStorage.setItem("state", selectState)
    setSelectedCity('')
    setMedicalCentre([])
  }


  const handleCityChange = (e) => {
    const selectCity = e.target.value;
    localStorage.setItem("city", selectCity)
    setSelectedCity(selectCity)

  }


  const handleSearch = () => {
    if (selectedState && selectedCity) {
      fetchMedicalCentre(selectedState, selectedCity)
    }
  }




  // booking related code

  const handleAppointment=(centreId)=>{
    setSelectedCentre(centreId)
  }


  const handleTabChange=(tab)=>{
    setActiveTab(tab)
  }



  const handleTimeSlot=(time)=>{
    setSelectedTime(time)
    if(window.confirm('are you confirm Booking'))
    {

      navigate('/confirmation',{state:{time}})
    }
    
  }

  return (
    <>


      <div>

        <select value={selectedState} onChange={handleStateChange} >

          <option value={""}>Select State</option>
          {stateData.length > 0 ? stateData.map((data, idx) => (
            <option value={data} key={idx}>{data}</option>
          )) : <option>No Found State</option>}
        </select>

        <select value={selectedCity} onChange={handleCityChange}>
          <option value={""}>Select City</option>
          {
            cityData.length > 0 ? cityData.map((data, idx) => (
              <option key={idx} value={data}>{data}</option>
            )) : <option>No City Found</option>
          }
        </select>
        <br />

        <button onClick={handleSearch}>Search</button>


        <div>

          {
            medicalCentre.length > 0 ? medicalCentre.map((data) => (
              <Fragment>

              <button onClick={()=>handleAppointment(data["Provider ID"])}>Book Appointment</button>
              
                <p>{data.Address}</p>
                {
                  selectedCentre===data["Provider ID"] && (
                    <div>
                      <div>
                      <p>Available Slots</p>
                      <button onClick={()=>handleTabChange('today')} className={activeTab ==="today" ? 'today':''}>Today</button>
                      <button onClick={()=>handleTabChange('tommorow')} className={activeTab==='tommorow'?'active-tab':''}>Tomorrow</button>      

                      </div>

                      <div>

                        {activeTab==='today' && (
                          <div>
                            <button onClick={()=>handleTimeSlot('10:00 AM')}>10:30 AM</button>
                            <button onClick={()=>handleTimeSlot('11:30 PM')}>11:30 PM</button>
                          </div>
                        )}
                      </div>

                    </div>
                    
                  )
                }
               
              </Fragment>

            )) : <p>not found</p>
          }
        </div>
      </div>
    </>
  )
}

export default Result