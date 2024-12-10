import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function AddPrescription() {
  const [error, setError] = useState('');
  const [prescription, setPrescription] = useState({
    id: '',
    email: '',
    gender: '',
    doctorname: '',
    department: '',
    medicine: '',
    additionalinformation: '',
    date: '',
  });

  const location = useLocation();
  const { patientmail, doctorname, patientid, patientgender, doctordepartment, appointmentdate } = location.state || {};

  const [message, setMessage] = useState('');

  // Use effect to set initial state values based on location state
  useEffect(() => {
    console.log('Appointment Date:', appointmentdate); // Debugging line
    console.log('doctordepartment:', doctordepartment); // Debugging line
  
    // Ensure all required data is present
    if (patientid && patientmail && patientgender && doctorname && doctordepartment && appointmentdate) {
      // Convert the date array to "yyyy-MM-dd" format with zero-padding
      const formattedDate = Array.isArray(appointmentdate)
        ? `${appointmentdate[0]}-${String(appointmentdate[1]).padStart(2, '0')}-${String(appointmentdate[2]).padStart(2, '0')}`
        : appointmentdate;
  
      console.log('Formatted Date:', formattedDate); // Debugging line
  
      setPrescription({
        id: patientid,
        email: patientmail,
        gender: patientgender,
        doctorname: doctorname,
        department: doctordepartment,
        medicine: '',
        additionalinformation: '',
        date: formattedDate,
      });
    }
  }, [patientid, patientmail, patientgender, doctorname, doctordepartment, appointmentdate]);
  
  
  const handleChange = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2003/hms/addprescription',
        prescription,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Prescription added successfully!');
        // Reset the form after successful submission
        setPrescription({
          id: '',
          email: '',
          gender: '',
          doctorname: '',
          department: '',
          medicine: '',
          additionalinformation: '',
          date: '',
        });
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data || error.message));
    }
  };

  const handleStatusChange = async (patientid, status) => {
    try {
     const response= await axios.post(`http://localhost:2003/hms/changepatientstatus?id=${patientid}&status=${status}`);
      if (response.status === 200) {
        // Show a success message
        alert("Patient consulted successfully");
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div>
       
    <div className="form">
    {error && <p className="error">{error}</p>}
      {message && <p className="error-message">{message}</p>}
      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Id</label>
          <input type="number" name="id" value={prescription.id} readOnly required />
        </div>
        <div>
          <label>Patient Email</label>
          <input type="email" name="email" value={prescription.email} readOnly required />
        </div>
        <div>
          <label>Patient Gender</label>
          <input type="text" name="gender" value={prescription.gender} readOnly required />
        </div>
        <div>
          <label>Doctor Name</label>
          <input type="text" name="doctorname" value={prescription.doctorname} readOnly required />
        </div>
        <div>
        <select name="department" value={prescription.department} readOnly required>
    <option value="">---Select Department---</option>
    <option value="Cardiology">Cardiology</option>
    <option value="Dermatology">Dermatology</option>
    <option value="Neurology">Neurology</option>
    <option value="Nephrology">Nephrology</option>
</select>
</div>
<div>
  <label>Appointment Date</label>
  <input type="date" name="date" value={prescription.date} readOnly required />
</div>

<div>
  <label>Medicine</label>
  <textarea 
    name="medicine" 
    value={prescription.medicine} 
    onChange={handleChange} 
    required 
    rows="4" 
    cols="50"
   
  />
</div>
<div>
  <label>Additional Information</label>
  <textarea 
    name="additionalinformation" 
    value={prescription.additionalinformation} 
    onChange={handleChange} 
    required 
    rows="4" 
    cols="50" 
  />
</div>

        <div className="action-buttons">
          <button type="submit" className="add-button">Add Prescription</button>
          <button type="reset" className="clear-button">Clear</button>
        </div>
      

      </form>
    </div>
    <button onClick={() => handleStatusChange(patientid, "COMPLETED")}>Mark as Completed</button>
    </div>
  );
}

AddPrescription.propTypes = {
  patientmail: PropTypes.string,
  doctorname: PropTypes.string,
  patientid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  patientgender: PropTypes.string,
  doctordepartment: PropTypes.string,
  appointmentdate: PropTypes.string,
};
