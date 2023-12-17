import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import "./logadmin.css";
import { useNavigate } from "react-router-dom";

const Registeradmin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [admissionyear, setAdmissionyear] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/Registeradmin", {
        name,
        userid,
        phonenumber,
        email,
        admissionyear,
        department,
        password: password,
      })
      .then((result) => {
        console.log(result);
        navigate("/Loginadmin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reg">
      <div className="register">
        <h2>Register</h2>
        <h6>Welcome to Library Management System</h6>
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          label="User id"
          variant="outlined"
          onChange={(e) => setUserid(e.target.value)}
        />
        <br />
        <TextField
          label="Phone Number"
          variant="outlined"
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <br />
        <TextField
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          label="Admission Year"
          variant="outlined"
          onChange={(e) => setAdmissionyear(e.target.value)}
        />
        <br />
        <TextField
          label="Department"
          variant="outlined"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          className="Bttn"
          variant="contained"
          color="success"
          onClick={handleSignUp}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Registeradmin;
