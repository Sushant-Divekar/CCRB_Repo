// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const ViewReport = () => {
//   const { region } = useParams();
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [crimeData, setCrimeData] = useState([]);
//   const [error, setError] = useState(null); // State to handle errors
//   const [selectedStation, setSelectedStation] = useState("");

//   // Define an array of regions and their associated police stations
//   const regions = {
//     NORTH: {
//       name: "NORTH REGION OF MUMBAI POLICE WELCOMES YOU",
//       description: "Select Police station whose data is to be accessed",
//       policeStations: ["Borivali", "Kandivali", "Goregaon", "Jogeshwari"],
//     },
//     SOUTH: {
//       name: "SOUTH REGION OF MUMBAI POLICE WELCOMES YOU",
//       description: "Select Police station whose data is to be accessed",
//       policeStations: ["Malabar Hill", "CSMT", "Byculla"],
//     },
//     EAST: {
//       name: "EAST REGION OF MUMBAI POLICE WELCOMES YOU",
//       description: "Select Police station whose data is to be accessed",
//       policeStations: ["Ghatkopar", "Chembur", "Vikhroli", "Mulund"],
//     },
//     WEST: {
//       name: "WEST REGION OF MUMBAI POLICE WELCOMES YOU",
//       description: "Select Police station whose data is to be accessed",
//       policeStations: ["Andheri", "Vile Parle", "Bandra", "Mahim"],
//     },
//     CENTRAL: {
//       name: "CENTRAL REGION OF MUMBAI POLICE WELCOMES YOU",
//       description: "Select Police station whose data is to be accessed",
//       policeStations: ["Dadar", "Parel", "Sion"],
//     },
//   };

//   const regionData = regions[region];

//   if (!regionData) {
//     return <div>Region not found</div>;
//   }

//   const handleStationClick = (station) => {
//     setSelectedStation(station);
//     setCrimeData([]);
//     setError(null);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!startDate || !endDate || !selectedStation) {
//       setError("Please select a police station and enter both start and end dates");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/get_crime_info", {
//         startDate,
//         endDate,
//         policeStation: selectedStation,
//       });
//       setCrimeData(response.data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching crime data:", error);
//       setError("Error fetching crime data. Please try again later.");
//     }
//   };

//   return (
//     <div className="body">
//       <div className="region">
//         <div className="h1">
//           <div className="region_name">
//             <p className="text1">{regionData.name}</p>
//           </div>
//         </div>

//         <div className="select_ps">
//           <p className="text2">{regionData.description}</p>
//         </div>

//         <div className="ps_name">
//           {regionData.policeStations.map((station, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleStationClick(station)}
//               className={`enter_button ${selectedStation === station ? "selected" : ""}`}
//             >
//               {station} Police Station
//             </button>
//           ))}
//         </div>

//         {selectedStation && (
//           <div className="date_form">
//             <div className="text_div">
//               <p className="text1">Enter the date range for the report</p>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="date">
//                 <div className="start_date">
//                   <input
//                     className="input_1"
//                     type="date"
//                     placeholder="Enter initial date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     name="startDate"
//                     required
//                   />
//                 </div>
//                 <div className="last_date">
//                   <input
//                     className="input_1"
//                     type="date"
//                     placeholder="Enter final date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     name="endDate"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="submit">
//                 <input className="join-button" type="submit" value="CRIME INFO" />
//               </div>
//             </form>
//           </div>
//         )}

//         {error && <div className="error-message">{error}</div>}

//         {crimeData.length > 0 && (
//           <div className="data-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>FIR No</th>
//                   <th>Police Station</th>
//                   <th>IPC No</th>
//                   <th>Incident Date</th>
//                   <th>Incident Time</th>
//                   <th>Reporting Date</th>
//                   <th>Case Status</th>
//                   <th>Incident Details</th>
//                   <th>Investigating Officer</th>
//                   <th>Officer Aadhar</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {crimeData.map((crime, index) => (
//                   <tr key={index}>
//                     <td>{crime.firno}</td>
//                     <td>{crime.stationname}</td>
//                     <td>{crime.ipcno}</td>
//                     <td>{crime.incidentdate}</td>
//                     <td>{crime.incidenttime}</td>
//                     <td>{crime.reportingdate}</td>
//                     <td>{crime.casestatus}</td>
//                     <td>{crime.incidentdetails}</td>
//                     <td>{crime.investigatingofficer}</td>
//                     <td>{crime.daadhar}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <Link to="/">
//           <button className="back_button">Go Back</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewReport;

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./DataForm.css"; // Import your CSS file

const ViewReport = () => {
  const { region } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [crimeData, setCrimeData] = useState([]);
  const [error, setError] = useState(null); // State to handle errors
  const [selectedStation, setSelectedStation] = useState("");

  // Define an array of regions and their associated police stations
  const regions = {
    NORTH: {
      name: "NORTH REGION OF MUMBAI POLICE WELCOMES YOU",
      description: "Select Police station whose data is to be accessed",
      policeStations: ["Borivali", "Kandivali", "Goregaon", "Jogeshwari"],
    },
    SOUTH: {
      name: "SOUTH REGION OF MUMBAI POLICE WELCOMES YOU",
      description: "Select Police station whose data is to be accessed",
      policeStations: ["Malabar Hill", "CSMT", "Byculla"],
    },
    EAST: {
      name: "EAST REGION OF MUMBAI POLICE WELCOMES YOU",
      description: "Select Police station whose data is to be accessed",
      policeStations: ["Ghatkopar", "Chembur", "Vikhroli", "Mulund"],
    },
    WEST: {
      name: "WEST REGION OF MUMBAI POLICE WELCOMES YOU",
      description: "Select Police station whose data is to be accessed",
      policeStations: ["Andheri", "Vile Parle", "Bandra", "Mahim"],
    },
    CENTRAL: {
      name: "CENTRAL REGION OF MUMBAI POLICE WELCOMES YOU",
      description: "Select Police station whose data is to be accessed",
      policeStations: ["Dadar", "Parel", "Sion"],
    },
  };

  const regionData = regions[region];

  if (!regionData) {
    return <div>Region not found</div>;
  }

  const handleStationClick = (station) => {
    setSelectedStation(station);
    setCrimeData([]);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!startDate || !endDate || !selectedStation) {
      setError("Please select a police station and enter both start and end dates");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/get_crime_info", {
        startDate,
        endDate,
        policeStation: selectedStation,
      });
      setCrimeData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching crime data:", error);
      setError("Error fetching crime data. Please try again later.");
    }
  };

  return (
    <div className="view-report-body">
      <div className="region">
        <div className="region-header">
          <p className="region-name">{regionData.name}</p>
        </div>

        <div className="region-description">
          <p className="description-text">{regionData.description}</p>
        </div>

        <div className="police-stations">
          {regionData.policeStations.map((station, idx) => (
            <button
              key={idx}
              onClick={() => handleStationClick(station)}
              className={`police-station-button ${selectedStation === station ? "selected" : ""}`}
            >
              {station} Police Station
            </button>
          ))}
        </div>

        {selectedStation && (
          <div className="date-form">
            <div className="date-form-header">
              <p className="date-form-text">Enter the date range for the report</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="date-inputs">
                <div className="start-date">
                  <input
                    className="date-input"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    name="startDate"
                    required
                  />
                </div>
                <div className="end-date">
                  <input
                    className="date-input"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    name="endDate"
                    required
                  />
                </div>
              </div>
              <div className="submit-button">
                <input className="submit-button-style" type="submit" value="CRIME INFO" />
              </div>
            </form>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {crimeData.length > 0 && (
          <div className="crime-data-table">
            <table>
              <thead>
                <tr>
                  <th>FIR No</th>
                  <th>Police Station</th>
                  <th>IPC No</th>
                  <th>Incident Date</th>
                  <th>Incident Time</th>
                  <th>Reporting Date</th>
                  <th>Case Status</th>
                  <th>Incident Details</th>
                  <th>Investigating Officer</th>
                  <th>Officer Aadhar</th>
                </tr>
              </thead>
              <tbody>
                {crimeData.map((crime, index) => (
                  <tr key={index}>
                    <td>{crime.firno}</td>
                    <td>{crime.stationname}</td>
                    <td>{crime.ipcno}</td>
                    <td>{crime.incidentdate}</td>
                    <td>{crime.incidenttime}</td>
                    <td>{crime.reportingdate}</td>
                    <td>{crime.casestatus}</td>
                    <td>{crime.incidentdetails}</td>
                    <td>{crime.investigatingofficer}</td>
                    <td>{crime.daadhar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link to="/" className="back-link">
          <button className="back-button">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewReport;

