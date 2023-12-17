import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import './Recomandationadmin.css';

const Recommandbookadmin = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reccomdbyadmin?query=${searchQuery}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRequestBook = (bookId) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    axios.post(`http://localhost:5000/requestbook`, { userid: userId, bookid: bookId })
      .then(response => {
        console.log(`Book request successful for book with ID ${bookId}`);
        console.log(response);
      })
      .catch(error => {
        console.error(`Error requesting book with ID ${bookId}`, error);
      });
  };

  return (
    <div style={{ backgroundColor: 'rgb(179, 206, 214)', minHeight: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="">
          <Toolbar>
            <Typography variant="h6" fontSize={'25px'} sx={{ flexGrow: 1 }}>
              RECOMMENDED BOOKS
            </Typography>
          </Toolbar>
          <div className='searchbar'>
            <input
              className='search'
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="  Search Book by name or author name..."
            />
            <Button
              className='buttn'
              type='button'
              color='success'
              variant='contained'
              size='small'
              onClick={() => setSearchQuery(query)}
            >
              Search
            </Button>
          </div>
        </AppBar>
        <br></br><br></br>
        {data ? (
          <Grid container spacing={2}>
            {data.map((book) => (
              <Grid item xs={12} key={book._id}>
                <Card style={{ maxWidth: 800, margin: 'auto' }}>
                  <Grid container>
                    <Grid item xs={1} container justify="center" alignItems="center">
                      <CardMedia
                        component="img"
                        alt={book.title}
                        height="100"
                        image={book.image}
                        style={{ objectFit: 'cover', width: '100%', marginLeft: "20px" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CardContent>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="subtitle1">{`Author: ${book.author}`}</Typography>
                        <Typography variant="subtitle1">{`Year: ${book.year}`}</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                      <CardContent>
                        <Typography variant="subtitle1">{`Genre: ${book.genre}`}</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={3} container justify="center" alignItems="center">
                      <CardContent>
                        <Typography
                          variant="contained"
                          color={book.isAvailable ? 'primary' : 'error'}
                          onClick={() => handleRequestBook(book._id)}
                        >
                          {book.isAvailable ? 'Book in Stock' : 'Book Not in Stock'}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <CircularProgress />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Recommandbookadmin;
