import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ViewReport.css"; // Import your CSS file

const ViewReport = () => {
  const { regionName } = useParams();
  const [selectedStation, setSelectedStation] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [crimeData, setCrimeData] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [modalContent, setModalContent] = useState(""); // State to hold modal content

  // Define police stations based on regions
  const regions = {
    north: [
      "Borivali Police Station",
      "Kandivali Police Station",
      "Goregaon Police Station",
      "Jogeshwari Police Station",
    ],
    south: [
      "Malabar Hill Police Station",
      "CSMT Police Station",
      "Byculla Police Station",
    ],
    east: [
      "Ghatkopar Police Station",
      "Chembur Police Station",
      "Vikhroli Police Station",
      "Mulund Police Station",
    ],
    west: [
      "Andheri Police Station",
      "Vile Parle Police Station",
      "Bandra Police Station",
      "Mahim Police Station",
    ],
    central: [
      "Dadar Police Station",
      "Parel Police Station",
      "Sion Police Station",
      "Prabhadevi Police Station",
    ],
  };

  // Function to fetch crime data from backend
  const fetchCrimeData = async () => {
    if (!startDate || !endDate || !selectedStation) {
      setError(
        "Please select a police station and enter both start and end dates."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/get_crime_info",
        {
          startDate,
          endDate,
          policeStation: selectedStation,
        }
      );
      setCrimeData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching crime data:", error);
      setError("Error fetching crime data. Please try again later.");
    }
  };

  // Function to fetch victim data
  const fetchVictimData = async (firno) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/victimcase/${firno}`
      );
      setModalContent(response.data); // Set modal content with fetched data
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching victim data:", error);
      setError("Error fetching victim data. Please try again later.");
    }
  };

  // Function to fetch accused data
  const fetchAccusedData = async (firno) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/accusedcase/${firno}`
      );
      setModalContent(response.data); // Set modal content with fetched data
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching accused data:", error);
      setError("Error fetching accused data. Please try again later.");
    }
  };

  // Function to fetch officer data
  const fetchOfficerData = async (firno) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/officer/${firno}`
      );
      setModalContent(response.data); // Set modal content with fetched data
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching officer data:", error);
      setError("Error fetching officer data. Please try again later.");
    }
  };

  // Effect to log regionName and perform initial actions if needed
  useEffect(() => {
    console.log("Region Name:", regionName);
    // Additional initialization or data fetching logic if needed
  }, [regionName]);

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(""); // Clear modal content when closing
  };

  // Render component JSX
  return (
    <div className="view-report-body">
      <div className="region">
        <div className="region-header">
          <p className="region-name">
            {regionName.toUpperCase()} REGION POLICE WELCOMES YOU
          </p>
        </div>

        <div className="select-ps">
          <p className="description-text">Select Police Station:</p>
        </div>

        <div className="ps-name">
          {regions[regionName]?.map((station, idx) => (
            <button
              key={idx}
              className="police-station-button"
              onClick={() => setSelectedStation(station)}
            >
              {station}
            </button>
          ))}
        </div>
        <Link to="/" className="back-link">
          <button className="back-button">Go Back</button>
        </Link>
      </div>

      {selectedStation && (
        <div className="crime-data-section">
          <h2 className="crime-data-header">{selectedStation} Crime Data</h2>
          <div className="date-form">
            <div className="form-header">
              <p className="form-text">Enter the date range for the report</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchCrimeData();
              }}
            >
              <div className="date-inputs">
                <div className="start-date">
                  <input
                    className="input-field"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    name="startDate"
                    required
                  />
                </div>
                <div className="end-date">
                  <input
                    className="input-field"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    name="endDate"
                    required
                  />
                </div>
              </div>
              <div className="submit-button">
                <input
                  className="submit-button-style"
                  type="submit"
                  value="CRIME INFO"
                />
              </div>
            </form>

            {error && <div className="error-message">{error}</div>}

            {crimeData.length > 0 && (
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>FIR No</th>
                      <th>Station Name</th>
                      <th>IPC No</th>
                      <th>Incident Date</th>
                      <th>Incident Time</th>
                      <th>Reporting Date</th>
                      <th>Case Status</th>
                      <th>Incident Details</th>
                      <th>Investigating Officer</th>
                      <th>Officer Aadhar</th>
                      <th>Actions</th>
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
                        <td>
                          <button onClick={() => fetchVictimData(crime.firno)}>
                            Victim
                          </button>
                        </td>
                        <td>
                          <button onClick={() => fetchAccusedData(crime.firno)}>
                            Accused
                          </button>
                        </td>
                        <td>
                          <button onClick={() => fetchOfficerData(crime.firno)}>
                            Officer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal to display fetched data */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-content">
              {/* Render modal content based on modalContent state */}
              <pre>{JSON.stringify(modalContent, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReport;
