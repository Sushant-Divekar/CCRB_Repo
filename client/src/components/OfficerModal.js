import React, { useState, useEffect } from "react";
import axios from "axios";

const OfficerModal = ({ firno, onClose }) => {
  const [officerData, setOfficerData] = useState([]);

  useEffect(() => {
    const fetchOfficerData = async () => {
      try {
        const response = await axios.get(`/officer?firno=${firno}`);
        setOfficerData(response.data);
      } catch (error) {
        console.error("Error fetching officer data:", error);
      }
    };

    fetchOfficerData();
  }, [firno]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Officer Details for FIR No: {firno}</h2>
        <ul>
          {officerData.map((officer, index) => (
            <li key={index}>{/* Render officer data here */}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OfficerModal;
