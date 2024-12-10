import { useState } from 'react';
import axios from 'axios';

export default function AddPharmacist() {
  const [pharmacist, setPharmacist] = useState({
    name: '',
    gender: '',
    dateofbirth: '',
    salary: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPharmacist({ ...pharmacist, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2003/hms/addpharmacist',
        pharmacist
      );
      if (response.status === 200) {
        setMessage(response.data);
        setPharmacist({
          name: '',
          gender: '',
          dateofbirth: '',
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
      <h2>Add New Pharmacist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={pharmacist.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select name="gender" value={pharmacist.gender} onChange={handleChange} required>
            <option value="">---Select Gender---</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" name="dateofbirth" value={pharmacist.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={pharmacist.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={pharmacist.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" name="location" value={pharmacist.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={pharmacist.contact}
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
