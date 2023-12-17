import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setName] = useState();
  const [password, setPassword] = useState();

  const handleSignUp = async (e) => {
    // Make a request to the backend to create a new user account
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { username, password: password })
      .then((result) => {
        console.log(result);
        console.log(result.data.user.role);

        const userId = result.data.user._id;
        console.log(userId);
        // storeing userId to the localstorage
        localStorage.setItem("userId", userId);
        //  navigate('/Navbarinside')
        // console.log(result.data.role)
        if (result.data.user.role === "admin") {
          navigate("/Navbaradmin");
        } else if (result.data.user.role === "user") {
          navigate("/Navbarinside");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    // <div>
    //   <br></br><br></br><br></br>
    //   <Typography variant='h4'>Login page</Typography>
    //   <br></br>
    //   <TextField variant="outlined" label='user id'/><br></br><br></br>
    //   <TextField variant='filled' label='password' type='password'></TextField><br></br><br></br>
    //   <Button variant='contained' color='success'>Log In</Button><br></br><br></br>
    //   <Link to={'/Regform'} style={{textDecoration:"none",color:"black"}}>If you don't have account then ,SignUp</Link>
    // </div>

    <div className="log">
      <div className="login">
        <h1>Login</h1>
        <h6>Welcome to Library Management System</h6>
        <br></br>
        <TextField
          type="text"
          label="username"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <TextField
          type="text"
          label="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <Button
          className="Bttnn"
          variant="contained"
          color="success"
          onClick={handleSignUp}
        >
          LogIn
        </Button>
        <br></br>
        <br></br>
        <Link
          to={"/Regform"}
          style={{ textDecoration: "none", color: "black" }}
        >
          Not a member yet? <u>SignUp</u>
        </Link>
      </div>
    </div>
  );
};
export default Login;
