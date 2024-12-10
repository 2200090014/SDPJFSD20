
import { Link } from 'react-router-dom';
import './main.css'; // Styling file for the cards


const doctors = [
    {
      id: 1,
      name:"Admin",
      type: <Link to="/adminlogin" >Admin</Link>,
    
    },
    {
      id: 2,
      name:"Doctor",
      type: <Link to="/doctorlogin" >Doctor</Link>,
   
      
    },
    {
      id: 3,
      name:"Patient",
      type: <Link to="/patientlogin" >Patient</Link>,
    
    },
  ];


export default function Login() {
  return (
    <div style={styles.teamContainer}>
      <h1>Login As</h1>
    <div style={styles.doctorGrid}>
    {doctors.map(doctor => (
      <div key={doctor.id} style={styles.doctorCard}>
       
        <div style={styles.doctorInfo}>
          <h4>{doctor.type}</h4>
        </div>
      </div>      
    ))}
    </div>
  </div>
  );
}

const styles = {
    teamContainer: {
      textAlign: 'center',
      padding: '20px',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
    },
    doctorGrid: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    doctorCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '10px',
      width: '200px',
      padding: '10px',
      textAlign: 'center',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for aesthetics
    },
    doctorImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%', // Makes the image circular
      marginBottom: '10px',
      border: '3px solid #ccc', // Optional: Border around the photo
    },
    doctorInfo: {
      backgroundColor: '#f9f9f9', // Box background color
      padding: '10px',
      borderRadius: '10px',
      width: '100%',
      boxSizing: 'border-box',
    },
  };
