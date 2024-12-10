import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdatePatientProfile() {
  const [patientData, setPatientData] = useState({
    id: '',
    name: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialPatientData, setInitialPatientData] = useState({});

  useEffect(() => {
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData);
      setInitialPatientData(parsedPatientData); // Store initial patient data
    }
  }, []);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in patientData) {
        if (patientData[key] !== initialPatientData[key] && initialPatientData[key] !== '') {
          updatedData[key] = patientData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        updatedData.email = patientData.email;
        const response = await axios.put('http://localhost:2003/hms/updatepatientprofile', updatedData);
        setMessage(response.data);
        console.log(response.data)
        setError('');

        const res = await axios.get(`http://localhost:2003/hms/patientprofile/${patientData.email}`);
        localStorage.setItem("patient", JSON.stringify(res.data));
        console.log(patientData)
      } else {
        setMessage('No Changes in Patient Profile');
        setError('');
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div className="form">
      <h3><u>Update Patient Profile</u></h3>
      {message ? <h4>{message}</h4> : <h4 style={{ color: 'red' }}>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID</label>
          <input type="text" id="id" value={patientData.id} readOnly />
        </div>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={patientData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" id="gender" value={patientData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={patientData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={patientData.email} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={patientData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={patientData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="text" id="contact" value={patientData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}