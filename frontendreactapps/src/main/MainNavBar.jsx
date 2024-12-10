import PropTypes from 'prop-types';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import DoctorLogin from '../doctor/DoctorLogin';
import AdminLogin from '../admin/AdminLogin';
import PatientLogin from '../patient/PatientLogin';
import PatientReg from '../patient/PatientReg';
import './main.css';
import Contact from './Contact';
import OurVision from './OurVision';

export default function MainNavBar({ onAdminLogin, onDoctorLogin, onPatientLogin }) {
  const popalert = () => {
    alert("Please Login!!");
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul className="navbar">
          <div className="navbar-left">
            <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/ourvision">Ourvision</Link></li>
            <li><button onClick={popalert}>Book Appointment</button></li>
            <li><Link to="/login">Login</Link></li>
  
          </div>
        </ul>

        
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/doctorlogin" element={<DoctorLogin onDoctorLogin={onDoctorLogin} />} />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} />
        <Route path="/patientlogin" element={<PatientLogin onPatientLogin={onPatientLogin} />} />
        <Route path="/patientreg" element={<PatientReg />} />
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/ourvision" element={<OurVision/>}/>
      </Routes>
    </div>
  );
}

MainNavBar.propTypes = {
  onAdminLogin: PropTypes.func,
  onDoctorLogin: PropTypes.func,
  onPatientLogin: PropTypes.func,
  onPharmacistLogin:PropTypes.func,
};
