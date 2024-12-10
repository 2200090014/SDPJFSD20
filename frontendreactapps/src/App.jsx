import './App.css'
import { BrowserRouter as Router} from "react-router-dom"
import { useEffect,useState } from 'react';
import AdminNavBar from './admin/AdminNavBar'
import MainNavBar from './main/MainNavBar';

import DoctorNavBar from './doctor/DoctorNavBar';
import PatientNavBar from './patient/PatientNavBar';


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);


    useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const doctorLoggedIn = localStorage.getItem('isDoctorLoggedIn') === 'true';
    const patientLoggedIn = localStorage.getItem('isPatientLoggedIn') === 'true';
    
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsDoctorLoggedIn(doctorLoggedIn);
    setIsPatientLoggedIn(patientLoggedIn);

  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onDoctorLogin = () => {
    localStorage.setItem('isDoctorLoggedIn', 'true');
    setIsDoctorLoggedIn(true);
  };

  const onPatientLogin = () => {
    localStorage.setItem('isPatientLoggedIn', 'true');
    setIsPatientLoggedIn(true);
  };

  

  return (
    <div className="App">
      <h3 style={{fontSize:"20px"}}>Chennai Hospital</h3>
      <Router>
        {isAdminLoggedIn ? (
         <AdminNavBar/>
        ) : isPatientLoggedIn ? (
          <PatientNavBar />
        ) : isDoctorLoggedIn ? (
          <DoctorNavBar />
        ):(
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onDoctorLogin={onDoctorLogin}
            onPatientLogin={onPatientLogin}
          />
        )}
      </Router>
    </div>
  )
}

export default App
