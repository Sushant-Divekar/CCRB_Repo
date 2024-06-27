import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; // Import your Modal component if separate

const AccusedModal = ({ firno, onClose }) => {
  const [accusedData, setAccusedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccusedData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/accusedcase/${firno}`
        );
        setAccusedData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching accused data:", error);
        setError("Error fetching accused data. Please try again later.");
      }
    };

    if (firno) {
      fetchAccusedData();
    }

    return () => {
      setAccusedData([]);
    };
  }, [firno]);

  return (
    <Modal onClose={onClose}>
      <h2>Accused Details for FIR No: {firno}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="accused-details">
        {accusedData.map((accused, index) => (
          <div key={index} className="accused-item">
            <p>Name: {accused.accusedname}</p>
            <p>Age: {accused.accusedage}</p>
            <p>
              Address: {accused.abuilding}, {accused.astreet},{" "}
              {accused.alandmark}, {accused.acity}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AccusedModal;
