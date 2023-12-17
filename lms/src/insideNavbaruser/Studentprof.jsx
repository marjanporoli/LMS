import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Studentprof.css"
import { CgProfile } from "react-icons/cg";


const Studentprof = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        // Replace 'your-backend-api-endpoint' with the actual endpoint
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/getprofile/${userId}`);
        console.log(response.data)

        // Set the fetched data to the state
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function (optional) - use if needed
    return () => {
      // Perform cleanup if necessary
    };
  }, []);

  return (
    <div className='stu'>
    <div className='profile'>
      <div style={{textDecoration:'none',color:'Black', fontSize:'100px'}}><CgProfile/>
      </div>

      {/* Use optional chaining to prevent errors if 'data' is null */}
     <strong> Name:</strong> {data?.name}<br></br>
     <strong> Email:</strong> {data?.email}<br></br>
     <strong>User id:</strong> {data?._id}<br></br>
     <strong>Department:</strong> {data?.department}<br></br>
     <strong> Phone number:</strong> {data?.phonenumber}<br></br>
     <strong>Admission Year:</strong> {data?.admissionyear}<br></br>
    </div>
  </div>
  )
}

export default Studentprof
