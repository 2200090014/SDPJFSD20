import { useState, useEffect } from 'react';
import axios from 'axios';
import './patient.css';

export default function AddAppointment() {
    // Get the current date (in YYYY-MM-DD format)
    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0]; 
    };
    //to get the data from localstorage
    const [patientData, setPatientData] = useState("");
    useEffect(() => {
        const storedPatientData = localStorage.getItem('patient');
        if (storedPatientData) {
            const parsedPatientData = JSON.parse(storedPatientData);
            setPatientData(parsedPatientData);
        }
    }, []); // Load patient data only once
    
    const [appointment, setAppointment] = useState({
        name: '',
        gender: '',
        email: '',
        contactno: '',
        department: '',
        doctorname: '',
        apdate: '',  
        aptime: ''   
    });

    // Update appointment state after patientData is loaded
useEffect(() => {
    if (patientData) {
        setAppointment((prevState) => ({
            ...prevState,
            name: patientData.name || '',
            gender: patientData.gender || '',
            email: patientData.email || '',
        }));
    }
}, [patientData]);

    const [message, setMessage] = useState('');
    const [doctors, setDoctors] = useState([]); // All doctors fetched from the API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // To store doctors filtered by department



    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:2003/hms/viewalldoctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setMessage('Failed to fetch doctor list');
            }
        };
    
        fetchDoctors();
    }, []); // Fetch doctors only once

    // Filter doctors based on selected department
    useEffect(() => {
        if (appointment.department) {
            const filtered = doctors.filter(doctor => doctor.department === appointment.department);
            setFilteredDoctors(filtered);
        } else {
            setFilteredDoctors([]); // If no department is selected, reset the filtered doctors
        }
    }, [appointment.department, doctors]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({ ...appointment, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        console.log("appointment booked details:",appointment)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2003/hms/addappointment', appointment, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200) {
                setMessage(response.data);
                setAppointment({
                    name: '',
                    gender: '',
                    email: '',
                    contactno: '',
                    department: '',
                    doctorname: '',
                    apdate: '',  
                    aptime: ''   
                });
            }
        } catch (error) {
            console.error(error.message);
            setMessage(error.message);
        }
    };

    const departments = ["Cardiology", "Dermatology", "Neurology", "Nephrology"];


    return (
        <div className='form'>
            {message && <p className="appointment-message">{message}</p>}
            <h2 className="form-title">Book an Appointment</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <labe7l>Name</labe7l>
                    <input type="text" name="name" value={patientData.name}  readOnly  />
                </div>
                
                <div>
                    <label >Email</label>
                    <input type="email" name="email" value={patientData.email} readOnly required  />
                </div>
                <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input type="text" name="contactno" value={appointment.contactno} onChange={handleChange} required  />
                </div>
                <div>
                    <label >Department</label>
                    <select name="department" value={appointment.department} onChange={handleChange} required >
                        <option value="">---Select Department---</option>
                        {departments.map(department => (
                            <option key={department} value={department}>{department}</option>
                        ))}
                    </select>
                </div>
                <div >
                    <label >Doctor Name</label>
                    <select name="doctorname" value={appointment.doctorname} onChange={handleChange} required >
                        <option value="">---Select Doctor---</option>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => (
                                <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                            ))
                        ) : (
                            <option value="">No doctors available</option>
                        )}
                    </select>
                </div>
                <div >
                    <label >Appointment Date</label>
                    <input 
                        type="date" 
                        name="apdate" 
                        value={appointment.apdate} 
                        onChange={handleChange} 
                        min={getCurrentDate()} // Prevent selection of past dates
                        required 
                       
                    />
                </div>
                {/* <div>
                    <label >Appointment Time</label>
                    <input 
                        type="time" 
                        name="aptime" 
                        value={appointment.aptime} 
                        onChange={handleChange} 
                        required 
                    />
                </div> */}
                <div>
                    <label>Appointment Time</label>
                    <select name="aptime" value={appointment.aptime} onChange={handleChange} required className="form-input">
                        <option value="">---Select Slot---</option>
                        <option value="10:00AM to 11:30AM">10:00AM to 11:30AM</option>
                        <option value="11:30AM to 01:00PM">11:30AM to 01:00PM</option>
                        <option value="03:00PM to 05:30PM">03:00PM to 05:30PM</option>
                        <option value="05:30PM to 07:30PM">05:30PM to 07:30PM</option>
                    </select>
                </div>
                <div>
                    <button type="submit" >Book Appointment</button>
                    <button type="reset" onClick={() => setAppointment({
                        name: '',
                        gender: '',
                        email: '',
                        contactno: '',
                        department: '',
                        doctorname: '',
                        apdate: '',
                        aptime: ''
                    })} >Clear</button>
                </div>
            </form>
        </div>
    );
}