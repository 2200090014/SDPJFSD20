import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import DoctorHome from "./DoctorHome";
//import ViewAllPatients from "./ViewAllPatients";
import './doctor.css'
import PendingAppointments from './PendingAppointments'
import UpdateDoctorProfile from './UpdateDoctorProfile';
import AcceptedAppointments from './AcceptedAppointments';
import OnlineConsultant from './OnlineConsultant';
import DoctorProfile from './DoctorProfile';
import AddPrescription from './AddPrescription';
export default function DoctorNavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isDoctorLoggedIn');
    localStorage.removeItem('doctor');

    navigate('/doctorlogin');
    window.location.reload()
  };
  return (
    <div>
       <div ></div>

       <nav className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      {/* <Link to="/viewallpatients" className="nav-item">ViewAllPatients</Link> */}
      <Link to="/acceptedappointments" className="nav-item">MyAppointments</Link>
      <Link to="/pendingappointments" className="nav-item">PendingAppointments</Link>
    
      <li className="dropdown" tabIndex="0">
      <Link>Profile</Link>
        <div className="dropdown-content">
        <Link to="/doctupdateprofile" className="nav-item">UpdateProfile</Link>
        <Link to="/doctorprofile" className="nav-item" >Profile</Link>
        </div>
        </li>
      <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
      </nav>


      <Routes>
        <Route path="/" element={<DoctorHome/>}/>
        {/* <Route path="/viewallpatients" element={<ViewAllPatients/>}/> */}
        <Route path="/pendingappointments" element={<PendingAppointments/>}/>
        <Route path="/acceptedappointments" element={<AcceptedAppointments/>}/>
        <Route path="/doctorhome" element={<DoctorHome/>}/>
        <Route path='/doctupdateprofile' element={<UpdateDoctorProfile/>}/>
        <Route path='/onlineconsultant' element={<OnlineConsultant/>}/>
        <Route path='/doctorprofile' element={<DoctorProfile/>}/>
        <Route path='/addprescription' element={<AddPrescription/>}/>
      </Routes>
      
    </div>
  )
}
