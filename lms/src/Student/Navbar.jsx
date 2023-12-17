import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import "./Navbar.css"

const Navbar = () => {
    var[data,setData] = useState({});
    var[out,setOut] = useState([])
  return (
    <div>
       <div>
       
       <AppBar position='static' style={{backgroundColor:'gray'}}>
            <Toolbar  position='static'>
            <img src='https://i.pinimg.com/originals/1a/7f/37/1a7f372e8751d3a80edf08aa6a91366c.png' style={{ width: '100px', height: '50px', display: 'inline-block' }} />&nbsp;&nbsp;&nbsp;
                <Typography variant='h6' component='div' sx={{flexGrow:1}} align='left'>Library Management System(LMS)</Typography>
                
                <Button ><Link to={'/Home'} style={{textDecoration:"none",color:"black", fontSize:"40px"}}><IoMdHome/></Link></Button>
              
            </Toolbar>
        </AppBar>
      
        
           
      
      </div>
    </div>
    
    
  )
}

export default Navbar