import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './AdminHome';
import AddDoctor from './AddDoctor';
import ViewAllPatients from './ViewAllPatients';
import ViewAllPharmacist from './ViewAllPharmacist';
import ViewAllDoctors from './ViewAllDoctors';
import './admin.css'; // Importing the CSS file
import AddPharmacist from './AddPharmacist';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminhome" className="nav-item">Home</Link>
        
        <div className="dropdown">
          <Link className="nav-item">Add</Link>
          <div className="dropdown-content">
            <Link to="/adddoctor" className="nav-item">Doctor</Link>
            <Link to="/addpharmacist" className="nav-item">Pharmacist</Link>
          </div>
        </div>

        <div className="dropdown">
          <Link className="nav-item">View All</Link>
          <div className="dropdown-content">
            <Link to="/viewallpatients" className="nav-item">Patients</Link>
            <Link to="/viewallpharmacist" className="nav-item">Pharmacists</Link>
            <Link to="/viewalldoctors" className="nav-item">Doctors</Link>
          </div>
        </div>

        <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<Home />} />
        <Route path="/adddoctor" element={<AddDoctor />} />
        <Route path="/addpharmacist" element={<AddPharmacist />} />
        <Route path="/viewallpatients" element={<ViewAllPatients />} />
        <Route path="/viewallpharmacist" element={<ViewAllPharmacist />} />
        <Route path="/viewalldoctors" element={<ViewAllDoctors />} />
      </Routes>
    </div>
  );
}
