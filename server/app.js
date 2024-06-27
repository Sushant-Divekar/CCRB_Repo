const cors = require("cors");
const express = require("express");
const pool = require("./db");
const app = express();

app.use(express.json());
app.use(cors());

// Insert data into duty_officer
app.post("/duty_officer", async (req, res) => {
  try {
    const { daadhar, dname, dmobile, batch } = req.body;
    const newDutyOfficer = await pool.query(
      "INSERT INTO duty_officer (daadhar, dname, dmobile, batch) VALUES($1, $2, $3, $4) RETURNING *",
      [daadhar, dname, dmobile, batch]
    );
    res.json(newDutyOfficer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Insert data into crime_info
app.post("/crime_info", async (req, res) => {
  try {
    const {
      firno,
      stationname,
      ipcno,
      incidentdate,
      incidenttime,
      reportingdate,
      casestatus,
      incidentdetails,
      investigatingofficer,
      daadhar,
    } = req.body;
    const newCrimeInfo = await pool.query(
      "INSERT INTO crime_info (firno, stationname, ipcno, incidentdate, incidenttime, reportingdate, casestatus, incidentdetails, investigatingofficer, daadhar) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        firno,
        stationname,
        ipcno,
        incidentdate,
        incidenttime,
        reportingdate,
        casestatus,
        incidentdetails,
        investigatingofficer,
        daadhar,
      ]
    );
    res.json(newCrimeInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Insert data into victim
app.post("/victim", async (req, res) => {
  try {
    const {
      vname,
      vage,
      vmobile,
      vaadhar,
      vbuilding,
      vstreet,
      vlandmark,
      vcity,
      firno,
    } = req.body;
    const newVictim = await pool.query(
      "INSERT INTO victim (vname, vage, vmobile, vaadhar, vbuilding, vstreet, vlandmark, vcity, firno) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        vname,
        vage,
        vmobile,
        vaadhar,
        vbuilding,
        vstreet,
        vlandmark,
        vcity,
        firno,
      ]
    );
    res.json(newVictim.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Insert data into accused
app.post("/accused", async (req, res) => {
  try {
    const {
      firno,
      accused_aadhar,
      accusedname,
      accusedage,
      abuilding,
      astreet,
      alandmark,
      acity,
    } = req.body;
    const newAccused = await pool.query(
      "INSERT INTO accused (firno, accused_aadhar, accusedname, accusedage, abuilding, astreet, alandmark, acity) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        firno,
        accused_aadhar,
        accusedname,
        accusedage,
        abuilding,
        astreet,
        alandmark,
        acity,
      ]
    );
    res.json(newAccused.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/get_crime_info", async (req, res) => {
  try {
    const { startDate, endDate, policeStation } = req.body;
    const crimeInfo = await pool.query(
      "SELECT * FROM crime_info WHERE stationname = $1 AND incidentdate BETWEEN $2 AND $3",
      [policeStation, startDate, endDate]
    );
    res.json(crimeInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET endpoint for duty_officer
app.get("/duty_officer", async (req, res) => {
  try {
    const allDutyOfficers = await pool.query("SELECT * FROM duty_officer");
    res.json(allDutyOfficers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET endpoint for crime_info
app.get("/crime_info", async (req, res) => {
  try {
    const allCrimeInfo = await pool.query("SELECT * FROM crime_info");
    res.json(allCrimeInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET endpoint for victim
app.get("/victim", async (req, res) => {
  try {
    const allVictims = await pool.query("SELECT * FROM victim");
    res.json(allVictims.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET endpoint for accused
app.get("/accused", async (req, res) => {
  try {
    const allAccused = await pool.query("SELECT * FROM accused");
    res.json(allAccused.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET endpoint for crime_info_victim
app.get("/crime_info_victim", async (req, res) => {
  try {
    const allCrimeInfoVictim = await pool.query(
      "SELECT * FROM crime_info_victim"
    );
    res.json(allCrimeInfoVictim.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET endpoint for crime_info_accused
app.get("/crime_info_accused", async (req, res) => {
  try {
    const allCrimeInfoAccused = await pool.query(
      "SELECT * FROM crime_info_accused"
    );
    res.json(allCrimeInfoAccused.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/get_crime_info", async (req, res) => {
  try {
    const { startDate, endDate, policeStation } = req.body;
    const crimeInfo = await pool.query(
      "SELECT * FROM crime_info WHERE stationname = $1 AND incidentdate BETWEEN $2 AND $3",
      [policeStation, startDate, endDate]
    );
    res.json(crimeInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/accusedcase/:firno", async (req, res) => {
  try {
    const { firno } = req.params;
    const accusedInfo = await pool.query(
      "SELECT * FROM accused WHERE firno = $1",
      [firno]
    );
    res.json(accusedInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get victim information for a specific FIR number
app.get("/victimcase/:firno", async (req, res) => {
  try {
    const { firno } = req.params;
    const victimInfo = await pool.query(
      "SELECT * FROM victim WHERE firno = $1",
      [firno]
    );
    res.json(victimInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get officers related to a specific FIR number
app.get("/officer/:firno", async (req, res) => {
  try {
    const { firno } = req.params;
    const officerInfo = await pool.query(
      "SELECT * FROM duty_officer WHERE daadhar IN (SELECT DISTINCT daadhar FROM crime_info WHERE firno = $1)",
      [firno]
    );
    res.json(officerInfo.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});
