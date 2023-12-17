import {Button, TextField , Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import "./Addbookadmin.css"
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const  Addbookadmin = () => {

  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const [ispn, setIspn] = useState()
  const [author, setAuthor] = useState()
  const [publisher, setpublisher] = useState()
  const [image, setImage] = useState()
  const [year, setYear] = useState()
  const [genre, setGenre] = useState()

  const handleBook= async (e) => {
    // Make a request to the backend to create a new user account
    e.preventDefault()
    axios.post('http://localhost:5000/createbook',{title,ispn,author,publisher,image,year,genre})
    .then(result => {console.log(result)
     navigate('/Allbookadmin')
    })
    .catch(err => console.log(err)) 
  }

  return (
      <div>
      <div className='recomm'>
      <div className='recommondat'>
        <h1>Add a New Book</h1><br></br>
      <TextField 
      type='text' label='title' variant='outlined' onChange={(e) => setTitle(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='isbn' variant='outlined' onChange={(e) => setIspn(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='author' variant='outlined' onChange={(e) => setAuthor(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='publisher' variant='outlined'onChange={(e) => setpublisher(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='image' variant='outlined' onChange={(e) => setImage(e.target.value)}/><br></br><br></br>
      <TextField 
      type='number' label='year' variant='outlined' onChange={(e) => setYear(e.target.value)}/><br></br><br></br>
      <TextField 
      type='text' label='genre' variant='outlined' onChange={(e) => setGenre(e.target.value)}/><br></br><br></br>
      {/* <TextField 
      type='number' label='number of copies' variant='outlined'/><br></br><br></br> */}
      <Button  variant='contained' color='success' onClick={handleBook}>Add Book</Button><br></br><br></br>
      {/* <Link to={'/Regform'} style={{textDecoration:"none",color:"black"}}>Not a member yet,<u>SignUp</u></Link> */}
      </div>
    </div>
    </div>
    
  )
}

export default Addbookadmin;


/////////////////////

// Add this code to your React component where you handle form submission
// import React, { useState } from 'react';

// const Addbookadmin = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     // Add other fields as needed
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/books', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // Handle successful submission
//         console.log('Book added successfully!');
//       } else {
//         // Handle error
//         const errorData = await response.json();
//         console.error(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Add a New Book</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input type="text" name="title" value={formData.title} onChange={handleChange} />

//         <label>Author:</label>
//         <input type="text" name="author" value={formData.author} onChange={handleChange} />

//         {/* Add other form fields as needed */}

//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default Addbookadmin;

