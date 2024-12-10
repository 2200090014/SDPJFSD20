import { useState } from 'react';
import axios from 'axios';
import './patient.css';

export default function PatientReg() {
    const [patient, setPatient] = useState({
        name: '',
        gender: '',
        dateofbirth: '',
        location: '',
        email: '',
        password: '',
        contact: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid page reloading
        try {
            const response = await axios.post('http://localhost:2003/hms/patreg', patient);
            if (response.status === 200) { // if Successfully added
                setMessage(response.data);
                setPatient({
                    name: '',
                    gender: '',
                    dateofbirth: '',
                    location: '',
                    email: '',
                    password: '',
                    contact: ''
                });
            }
        } 
        catch (error) {
            console.log(error.message); // for debugging purpose
            setMessage(error.message);
        }
    };

    return (
        <div className='form-container'>
            {message ? 
                <p style={{color:"red", fontWeight:"bolder"}}>{message}</p> :
                <p></p>
            }
            <h2 className="form-title">Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={patient.name} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="gender" value={patient.gender} onChange={handleChange} required className="form-input">
                        <option value="">---Select Gender---</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHERS">Others</option>
                    </select>
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="dateofbirth" value={patient.dateofbirth} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={patient.location} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={patient.email} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={patient.password} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                    <label>Contact:</label>
                    <input type="number" name="contact" value={patient.contact} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                    <button type="submit" className="form-button">Register</button>
                    <button type="reset" className="form-button" onClick={() => setPatient({
                        name: '',
                        gender: '',
                        dateofbirth: '',
                        location: '',
                        email: '',
                        password: '',
                        contact: ''
                    })}>Clear</button>
                </div>
            </form>
        </div>
    );
}
