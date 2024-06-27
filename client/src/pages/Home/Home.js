import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="homecontainer">
        <Link to={"/report"} className="button-container">
          <button>View Report</button>
        </Link>
        <Link to={"/input"} className="button-container">
          <button>Register A Case</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
