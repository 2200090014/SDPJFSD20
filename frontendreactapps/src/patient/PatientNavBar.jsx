import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import PatientProfile from "./PatientProfile";
import PatientHome from './PatientHome';
import UpdateProfile from "./UpdateProfile";
import AddAppointment from './AddAppointment';
// import ViewAllDoctors from './ViewAllDoctors';
import ViewDoctorsByDepartment from './ViewDoctorsByDept';
import PatientReg from './PatientReg'; // Import the registration component
import MyAppointments from './MyAppointments';
import ViewPrescription from './ViewPrescription';

export default function PatientNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isPatientLoggedIn');
    localStorage.removeItem('patient');
    navigate('/patientlogin');
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
       
        <Link to="/patienthome" className="nav-item">Home</Link>
        <Link to="/addappointment" className="nav-item">Book Appointment</Link>
        {/* <Link to="/viewalldoctors" className="nav-item">View Doctors</Link> */}
        <Link to="/myappointments" className="nav-item">My Appointments</Link>
        <Link to="/myprescription" className="nav-item">Prescriptions</Link>
        <Link to="/viewdocbydept" className="nav-item">View Doctors By Department</Link>
        <li className="dropdown" tabIndex="0"> {/* Make the dropdown focusable */}
        <Link>Profile</Link>
        <div className="dropdown-content">
        <Link to="/PatientProfile" className="nav-item">Profile</Link>
       
        </div>
      </li>
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/patienthome" element={<PatientHome/>}/>
        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/UpdateProfile" element={<UpdateProfile />} />
        <Route path="/addappointment" element={<AddAppointment />} />
        {/* <Route path="/viewalldoctors" element={<ViewAllDoctors />} /> */}
        <Route path="/myappointments" element={<MyAppointments/>}/>
        <Route path="/viewdocbydept" element={<ViewDoctorsByDepartment />} />
        <Route path="/patientregistration" element={<PatientReg />} /> 
        <Route path="/myprescription" element={<ViewPrescription/>}/>
     
      </Routes>
    </div>
  );
}
