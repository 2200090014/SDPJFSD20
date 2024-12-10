import { useState } from 'react';
import axios from 'axios';
import './admin.css';

export default function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: '',
    gender: '',
    dateofbirth: '',
    department: '',
    salary: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2003/hms/adddoctor',
        doctor,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setMessage(response.data);
        setDoctor({
          name: '',
          gender: '',
          dateofbirth: '',
          department: '',
          salary: '',
          email: '',
          password: '',
          location: '',
          contact: '',
        });
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="form">
      {message && <p className="error-message">{message}</p>}
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select name="gender" value={doctor.gender} onChange={handleChange} required>
            <option value="">---Select Gender---</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" name="dateofbirth" value={doctor.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Department</label>
          <select name="department" value={doctor.department} onChange={handleChange} required>
            <option value="">---Select Department---</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Nephrology">Nephrology</option>
          </select>
        </div>
        <div>
          <label>Salary</label>
          <input type="number" name="salary" value={doctor.salary} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={doctor.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={doctor.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" name="location" value={doctor.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={doctor.contact}
            pattern="[6789][0-9]{9}"
            title="Phone number with 6-9 and remaining 9 digits with 0-9"
            onChange={handleChange}
            required
          />
        </div>
        <div className="action-buttons">
          <button type="submit" className="add-button">Add</button>
          <button type="reset" className="clear-button">Clear</button>
        </div>
      </form>
    </div>
  );
}
