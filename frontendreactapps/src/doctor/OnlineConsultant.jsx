import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './doctor.css';
import AddPrescription from './AddPrescription';

export default function OnlineConsultant() {
  const location = useLocation();
  const { patientmail, doctorname, patientid, patientgender, doctordepartment, appointmentdate } = location.state || {};
  const [meetingLink, setMeetingLink] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:2003/hms/sendemail', null, {
        params: {
          patientmail,
          meetingLink,
          doctorname,
        },
      });
      setMsg(response.data || 'Email sent successfully!');
      setError('');
    } catch (error) {
      setError('Failed to send Email: ' + (error.response?.data || error.message));
      setMsg('');
    }
  };

  // const handleStatusChange = async (patientid, status) => {
  //   try {
  //     await axios.post(`http://localhost:2003/hms/changepatientstatus?id=${patientid}&status=${status}`);
  //     setError(''); // Set error to ""
  //   } catch (error) {
  //     setError(error.response.data);
  //   }
  // };

  if (showAddPrescription) {
    return (
      <AddPrescription
        patientmail={patientmail}
        doctorname={doctorname}
        patientid={patientid}
        patientgender={patientgender}
        doctordepartment={doctordepartment}
        appointmentdate={appointmentdate}
      />
    );
  }

  return (
    <div>
      <h3>Send Online Consultation Link</h3>
      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={patientmail} readOnly required />
        </div>
        <div>
          <label>Doctor Name</label>
          <input type="text" value={doctorname} readOnly required />
        </div>
        <div>
          <label>Meeting Link</label>
          <input
            type="text"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>

      <button onClick={() => setShowAddPrescription(true)}>Add Prescription</button>
      {/* <button onClick={() => handleStatusChange(patientid, "COMPLETED")}>Mark as Completed</button> */}
    </div>
  );
}

OnlineConsultant.propTypes = {
  patientmail: PropTypes.string,
  doctorname: PropTypes.string,
  patientid: PropTypes.string,
  appointmentdate: PropTypes.string,
  doctordepartment: PropTypes.string,
  patientgender: PropTypes.string,
};
