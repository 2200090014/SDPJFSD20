import { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css';

export default function DoctorHome() {
  const [doctorData, setDoctorData] = useState("");
  const [pendingappoint, setpendingappoint] = useState(0);
  const [acceptedappoint, setacceptedappoint] = useState(0);

  useEffect(() => {
    const storedDoctorData = localStorage.getItem("doctor");
    if (storedDoctorData) {
      const parsedDoctorData = JSON.parse(storedDoctorData);
      setDoctorData(parsedDoctorData);
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorData.name) return; // Exit early if doctorData.name is not set

      try {
        const pendingResponse = await axios.get(
          `http://localhost:2003/hms/pendingappointcount?doctorname=${doctorData.name}`
        );
        //console.log("Pending Appointments Response:", pendingResponse.data);
        setpendingappoint(pendingResponse.data);

        const acceptedResponse = await axios.get(
          `http://localhost:2003/hms/acceptedappointscount?doctorname=${doctorData.name}`
        );
       // console.log("Accepted Appointments Response:", acceptedResponse.data);
        setacceptedappoint(acceptedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAppointments();
  }, [doctorData]);

  return (
    <div>
      {doctorData && (
        <div style={{ padding: "20px", textAlign: "left" }}>
          <h4 style={{ fontSize: "35px" }}>Welcome Dr.{doctorData.name}</h4>
          <div className="doctor-card">
            <p>Pending Appointments: {pendingappoint}</p>
          </div>
          <div className="doctor-card">
          <p>Accepted Appointments: {acceptedappoint}</p>
          </div>
        </div>
      )}
    </div>
  );
}
