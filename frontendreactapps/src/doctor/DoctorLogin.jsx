import { useState } from 'react';
import './doctor.css';  // Ensure the form.css is imported into your main CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function DoctorLogin({ onDoctorLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:2003/hms/checkdoctorlogin', formData, 
        {
          headers: {
            'Content-Type': 'application/json', // Sending JSON data
          },
        }
      );

      console.log('Doctor Login Response:', response.data); 

      if (response.data != null && response.data.id) {
        onDoctorLogin();
        localStorage.setItem('doctor', JSON.stringify(response.data));
        navigate('/doctorhome');
      } else {
        setMessage('Login Failed');
        setError('');
      }
    } catch (error) {
      console.error('Doctor Login Error:', error); 
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className="form">
      <h3 className='doctorheading'>
        <u>Doctor Login</u>
      </h3>
      {message ? (
        <h4>{message}</h4>
      ) : (
        <h4 style={{ color: 'red' }}>{error}</h4>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}

DoctorLogin.propTypes = {
  onDoctorLogin: PropTypes.func,
};
