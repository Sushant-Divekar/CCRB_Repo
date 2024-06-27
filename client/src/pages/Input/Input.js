import React, { useState } from "react";
import axios from "axios";
import "./Input.css";

const Input = () => {
  const initialState = {
    crime_info: {
      firno: "",
      stationname: "",
      ipcno: "",
      incidentdate: "",
      incidenttime: "",
      reportingdate: "",
      casestatus: "",
      incidentdetails: "",
      investigatingofficer: "",
      daadhar: "",
    },
    victim: {
      vname: "",
      vage: "",
      vmobile: "",
      vaadhar: "",
      vbuilding: "",
      vstreet: "",
      vlandmark: "",
      vcity: "",
      firno: "",
    },
    accused: {
      firno: "",
      accused_aadhar: "",
      accusedname: "",
      accusedage: "",
      abuilding: "",
      astreet: "",
      alandmark: "",
      acity: "",
    },
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/crime_info", formData.crime_info);
      await axios.post("http://localhost:5000/victim", formData.victim);
      await axios.post("http://localhost:5000/accused", formData.accused);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Invalidation of data");
    }
  };

  const renderFields = (section, fields) => {
    return fields.map((field) => (
      <div className="form-field" key={field.name}>
        <label className="form-label">
          {field.label}:
          <input
            className="form-input"
            type={field.type}
            name={field.name}
            value={formData[section][field.name]}
            onChange={(e) => handleChange(section, field.name, e.target.value)}
            pattern={field.pattern}
            maxLength={field.maxLength}
            required={field.required}
          />
        </label>
      </div>
    ));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="section-title">Crime Info Form</h2>
        {renderFields("crime_info", [
          { name: "firno", label: "FIR No", type: "text", required: true },
          {
            name: "stationname",
            label: "Station Name",
            type: "text",
            required: true,
          },
          { name: "ipcno", label: "IPC No", type: "text", required: true },
          {
            name: "incidentdate",
            label: "Incident Date",
            type: "date",
            required: true,
          },
          {
            name: "incidenttime",
            label: "Incident Time",
            type: "time",
            required: true,
          },
          {
            name: "reportingdate",
            label: "Reporting Date",
            type: "date",
            required: true,
          },
          {
            name: "casestatus",
            label: "Case Status",
            type: "text",
            required: true,
          },
          {
            name: "incidentdetails",
            label: "Incident Details",
            type: "text",
            required: true,
          },
          {
            name: "investigatingofficer",
            label: "Investigating Officer",
            type: "text",
            required: true,
          },
          {
            name: "daadhar",
            label: "DA Aadhaar",
            type: "text",
            pattern: "\\d{12}",
            maxLength: 12,
            required: true,
          },
        ])}

        <h2 className="section-title">Victim Form</h2>
        {renderFields("victim", [
          { name: "vname", label: "Name", type: "text", required: true },
          { name: "vage", label: "Age", type: "number", required: true },
          {
            name: "vmobile",
            label: "Mobile",
            type: "text",
            pattern: "\\d{10}",
            maxLength: 10,
            required: true,
          },
          {
            name: "vaadhar",
            label: "Aadhaar",
            type: "text",
            pattern: "\\d{12}",
            maxLength: 12,
            required: true,
          },
          {
            name: "vbuilding",
            label: "Building",
            type: "text",
            required: true,
          },
          { name: "vstreet", label: "Street", type: "text", required: true },
          {
            name: "vlandmark",
            label: "Landmark",
            type: "text",
            required: true,
          },
          { name: "vcity", label: "City", type: "text", required: true },
          { name: "firno", label: "FIR No", type: "text", required: true },
        ])}

        <h2 className="section-title">Accused Form</h2>
        {renderFields("accused", [
          { name: "firno", label: "FIR No", type: "text", required: true },
          {
            name: "accused_aadhar",
            label: "Aadhaar",
            type: "text",
            pattern: "\\d{12}",
            maxLength: 12,
            required: true,
          },
          { name: "accusedname", label: "Name", type: "text", required: true },
          { name: "accusedage", label: "Age", type: "number", required: true },
          {
            name: "abuilding",
            label: "Building",
            type: "text",
            required: true,
          },
          { name: "astreet", label: "Street", type: "text", required: true },
          {
            name: "alandmark",
            label: "Landmark",
            type: "text",
            required: true,
          },
          { name: "acity", label: "City", type: "text", required: true },
        ])}

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
