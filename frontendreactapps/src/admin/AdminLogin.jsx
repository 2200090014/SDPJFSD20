import { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AdminLogin({ onAdminLogin }) {
  const [formData, setFormData] = useState({
    username: '',
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
        'http://localhost:2003/hms/checkadminlogin', formData, 
        {
          headers: {
            'Content-Type': 'application/json', // Sending JSON data
          },
        }
        
      );

      console.log('Admin Login Response:', response.data); 

      if (response.data != null) {
        onAdminLogin();
        localStorage.setItem('admin', JSON.stringify(response.data));
        navigate('/adminhome');
      } else {
        setMessage('Login Failed');
        setError('');
      }
    } catch (error) {
      
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className='form'>
      <h3 className='doctorheading'>
        <u>Admin Login</u>
      </h3>
      {message ? (
        <h4>{message}</h4>
      ) : (
        <h4 style={{ color: 'red' }}>{error}</h4>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text"  id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required/>
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}

AdminLogin.propTypes = {
  onAdminLogin: PropTypes.func,
};
