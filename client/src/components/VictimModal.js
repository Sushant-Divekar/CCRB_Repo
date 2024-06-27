import React, { useState, useEffect } from "react";
import axios from "axios";

const VictimModal = ({ firno, onClose }) => {
  const [victimData, setVictimData] = useState([]);

  useEffect(() => {
    const fetchVictimData = async () => {
      try {
        const response = await axios.get(`/victimcase?firno=${firno}`);
        setVictimData(response.data);
      } catch (error) {
        console.error("Error fetching victim data:", error);
      }
    };

    fetchVictimData();
  }, [firno]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Victim Details for FIR No: {firno}</h2>
        <ul>
          {victimData.map((victim, index) => (
            <li key={index}>{/* Render victim data here */}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VictimModal;
