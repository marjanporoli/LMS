import {Button, TextField , Typography} from '@mui/material';
import { Link } from 'react-router-dom';
 import "./Reccomondation.css"
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Recommondation = () => {

  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [genre, setGenre] = useState()
  const [year, setYear] = useState()
  const [image, setImage] = useState()
 
  const handleReccomnd= async (e) => {
    // Make a request to the backend to create a new user account
    e.preventDefault()
    axios.post('http://localhost:5000/reccoemndbyuser',{title,author,genre,year,image})
    .then(result => {console.log(result)
     navigate('/Navbarinside')
    })
    .catch(err => console.log(err)) 
  }

  return (
    <div>
      <div className='recommond'>
      <div className='recommondation'>
        <h1>Recommand <br></br> a Book</h1><br></br>
      <TextField 
      type='text' label='title' variant='outlined'  onChange={(e) => setTitle(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='author' variant='outlined'  onChange={(e) => setAuthor(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='genre' variant='outlined'  onChange={(e) => setGenre(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='year' variant='outlined'  onChange={(e) => setYear(e.target.value)}/><br></br><br></br>
       <TextField 
      type='url' label='image' variant='outlined'  onChange={(e) => setImage(e.target.value)}/><br></br><br></br>
      <Button  variant='contained' color='success' onClick={handleReccomnd}>Send Request</Button><br></br><br></br>
      {/* <Link to={'/Regform'} style={{textDecoration:"none",color:"black"}}>Not a member yet,<u>SignUp</u></Link> */}
      </div>
    </div>
    </div>
  )
}

export default Recommondation
