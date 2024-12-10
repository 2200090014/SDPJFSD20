import { useState, useEffect } from 'react';
import axios from 'axios';
import './doctor.css';  // Import the CSS for styling

export default function UpdateDoctorProfile() {
  const [doctorData, setDoctorData] = useState({
    id: '',
    name: '',
    gender: '',
    dateofbirth: '',
    department: '',
    salary: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialDoctorData, setInitialDoctorData] = useState({});

  // Load doctor data from localStorage and initialize state
  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctor');
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctorData(parsedDoctorData);
      setInitialDoctorData(parsedDoctorData); // Store initial doctor data
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in doctorData) {
        if (doctorData[key] !== initialDoctorData[key] && initialDoctorData[key] !== '') {
          updatedData[key] = doctorData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = doctorData.email;
        const response = await axios.put('http://localhost:2003/hms/updatedoctorprofile', updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`http://localhost:2003/hms/doctorprofile/${doctorData.email}`);
        localStorage.setItem('doctor', JSON.stringify(res.data));
      } else {
        // No changes
        setMessage('No Changes in Doctor Profile');
        setError('');
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div className="appointment single-page">
      <div className="appointment-inner">
        <div className="title">
          <h3>Update Profile</h3>
        </div>

        {message ? <h4>{message}</h4> : <h4 style={{ color: 'red' }}>{error}</h4>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>ID</label>
            <input type="text" id="id" value={doctorData.id} readOnly />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" id="name" value={doctorData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <input type="text" id="gender" value={doctorData.gender} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" id="dateofbirth" value={doctorData.dateofbirth} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" id="department" value={doctorData.department} readOnly />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input type="number" id="salary" value={doctorData.salary} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" value={doctorData.email} readOnly />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" id="password" value={doctorData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" id="location" value={doctorData.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input type="number" id="contact" value={doctorData.contact} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn">Update</button>
        </form>
      </div>
    </div>
  );
}
