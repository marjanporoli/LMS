import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  ButtonGroup,
} from '@mui/material';
import './Issuerequestadmin.css';

const Issuerequestadmin = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bookrequests');
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleissuereq = (requestid, newStatus) => {
    const userId = localStorage.getItem('userId');
    const currentDate = new Date().toISOString();

    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    axios.patch(`http://localhost:5000/manageBookRequest/${requestid}`, {
        newStatus,
        issuedDate: currentDate,
      })
      // setData((prevData) => prevData.filter((user) => user._id !== userId));

      .then((response) => {
        console.log(`Book request successful for book with ID ${requestid}`);
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error requesting book with ID ${requestid}`, error);
      });
  };

  const handleSearch = (searchText) => {
    const filtered = data.filter(
      (book) =>
        book.userid.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (book.bookid && book.bookid.title.toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    handleSearch(searchText);
  };

  return (
    <div style={{ backgroundColor: 'rgb(179, 206, 214)', minHeight: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ALL ISSUE REQUEST
            </Typography>
          </Toolbar>
          <div className="searchbar">
            <input
              className="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="  Search by name or Book name..."
            />
            <Button
              className="buttn"
              type="Search"
              color="success"
              variant="contained"
              size="small"
              onClick={() => handleSearch(query)}
            >
              Search
            </Button>
          </div>
        </AppBar>
        <br></br>
        <br></br>
        {filteredData ? (
          filteredData.length > 0 ? (
            <Grid container spacing={2}>
              {filteredData.map((book) => (
                <Grid item xs={12} key={book._id}>
                  <Card style={{ maxWidth: 800, margin: 'auto' }}>
                    <Grid container>
                      <Grid item xs={1} container justify="center" alignItems="center">
                        <CardMedia
                          component="img"
                          alt={book.bookid ? book.bookid.title : 'No Title'}
                          height="100"
                          image={book.bookid ? book.bookid.image : 'placeholder-image-url'}
                          style={{ objectFit: 'cover', width: '100%', marginLeft: '20px' }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CardContent>
                          <Typography variant="h6">{`${book.bookid ? book.bookid.title : 'No title'}`}</Typography>
                          <Typography variant="subtitle1">{`Name: ${book.userid && book.userid.name}`}</Typography>
                          <Typography variant="subtitle1">{`Admissionyear: ${book.userid && book.userid.admissionyear}`}</Typography>
                          <Typography variant="subtitle1">{`Department: ${book.userid && book.userid.department}`}</Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={4}>
                        <CardContent>
                          <Typography variant="subtitle1">{`Genre: ${book.bookid ? book.bookid.genre : 'No Genre'}`}</Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={4} container justify="center" alignItems="center">
                        <CardContent>
                          <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={() => handleissuereq(book._id, 'accepted')} style={{ backgroundColor: 'green', color: 'white', marginRight: '8px' }}>
                              Accept
                            </Button>
                            <Button onClick={() => handleissuereq(book._id, 'reject')} style={{ backgroundColor: 'red', color: 'white' }}>
                              Reject
                            </Button>
                          </ButtonGroup>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
              No matches found.
            </Typography>
          )
        ) : (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <CircularProgress />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Issuerequestadmin;
