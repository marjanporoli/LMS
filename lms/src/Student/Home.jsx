import React from 'react'
import "./Home.css"
import { Link } from "react-router-dom"
import StudentIMage from "../images/user.png"
import AdminIMage from "../images/admin2.jpeg"
import { Button } from '@mui/material'


const Home = () => {
  return (

    // <div className='img' style={{ backgroundImage:`url(/homebackground.jpg)`,backgroundRepeat:"none",backgroundSize:"contain",

    // }}>
    <div >
      <div className='headg'>
        <h1> Library management System(LMS) </h1></div>
      <div className="HomePage"  >
        <div className="card" style={{ marginLeft: "10%" }}>
          <Link to ="/Loginadmin"><img src={AdminIMage} alt="StudentIMage" style={{ height: "260px", width: "260px" }} /></Link>
          <br />
          <Link to="/Loginadmin" style={{ textDecoration: "none", color: "white"}}>
             <Button variant='contained' >Signin as  Admin</Button></Link>
        </div>
        <div className='card' style={{ marginLeft: "10%" }}>
         <Link to ="/Login"> <img src={StudentIMage} alt="StudentIMage" style={{ height: "260px", width: "240px",border:'20px',backgroundImage:'transparent'  }} /></Link>
          <br />
          <Link to="/Login" style={{ textDecoration: "none", color: "white" }}> 
          <Button variant='contained' >Signin as  User</Button></Link>
        </div>
      </div>

    </div>



  )
}
export default Home

