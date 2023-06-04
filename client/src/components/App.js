import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import PhysiciansContainer from "./PhysiciansContainer"
import Login from "./Login";
import AppointmentForm from "./AppointmentForm";
import Flowsheet from "./Flowsheet";
import PatAptContainer from "./PatAptContainer";


function App() {

  const [physicianData, setPhysicianData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [userList, setUserList] = useState([])
  const [patientData, setPatientData] = useState([])
  const [appointmentData, setAppointmentData] = useState([])

  useEffect(() => {
    async function fetchPhysiciansData() {
      let response = await fetch("/physicians")
      response = await response.json()
      setPhysicianData(response)
    }
    fetchPhysiciansData()
  }, [])

  useEffect(() => {
    async function fetchPatientData() {
      let response = await fetch("/patients")
      response = await response.json()
      setPatientData(response)
    }
    fetchPatientData()
  }, [])


  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          updateUser(user);
          console.log("current", user)
        });
      }
    })
  },[])
  // useEffect(() => {
  //   async function fetchUsers() {
  //     let response = await fetch("/users")
  //     response = await response.json()
  //     setUserList(response)
  //   }
  //   fetchUsers()
  // }, [])

  useEffect(() => {
    fetch("/users")
    .then(res => res.json())
    .then(data => {
      setUserList(data)
      
    
    })
    
  }, [])

  useEffect(() => {
    fetch("/appointments")
    .then(res => res.json())
    .then(data => {
      setAppointmentData(data)
      
    
    })
    
  }, [])

  const addAppointment = (data) => setAppointmentData(current => [data, ...current])
  
  const updateUser = (user) => setCurrentUser(user)
  
  if (!currentUser) return <Login updateUser={updateUser} />;

  return (
    <div className="App">
      <Navbar setCurrentUser={setCurrentUser} />
      <Routes>
      <Route path="/" element={ < PhysiciansContainer physicianData={physicianData} /> } />
      <Route path="/appointment_new" element={ <AppointmentForm currentUser={currentUser} addAppointment={addAppointment} /> } />
      <Route path="/appointments/flowsheet/:id" element={ < Flowsheet currentUser={currentUser} /> } />
      <Route path="/appointments" element={ < PatAptContainer  currentUser={currentUser} /> } />
      <Route path="/footer" element={ <Footer/> } />
      
      </Routes>
    </div>
  );
}

export default App;
