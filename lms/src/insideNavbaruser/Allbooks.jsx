import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Allbooks.css";

const Allbooks = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getallbooks");
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  // code for search
  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        (book) => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [query, data]);

  const handleRequestBook = (bookId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    axios
      .post(`http://localhost:5000/requestbook`, {
        userid: userId,
        bookid: bookId,
      })
      .then((response) => {
        console.log(`Book request successful for book with ID ${bookId}`);
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error requesting book with ID ${bookId}`, error);
      });
  };

  return (
    <div style={{ backgroundColor: "rgb(179, 206, 214)", minHeight: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ALL AVAILABLE BOOKS IN LIBRARY
            </Typography>
          </Toolbar>
          <div className="searchbar">
            <input
              className="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="  Search Book by name or author name..."
            />
            <Button
              className="buttn"
              type="Search"
              color="success"
              variant="contained"
              size="small"
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
                  <Card style={{ maxWidth: 800, margin: "auto" }}>
                    <Grid container>
                      <Grid
                        item
                        xs={1}
                        container
                        justify="center"
                        alignItems="center"
                      >
                        <CardMedia
                          component="img"
                          alt={book.title}
                          height="100"
                          image={book.image}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            marginLeft: "20px",
                          }}
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
                          <Typography variant="subtitle1">{`Available: ${book.isAvailable}`}</Typography>
                          <Typography variant="subtitle1">{`ISBN: ${book.ispn}`}</Typography>
                        </CardContent>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        container
                        justify="center"
                        alignItems="center"
                      >
                        <CardContent>
                          {book.isAvailable ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleRequestBook(book._id)}
                            >
                              Request Book
                            </Button>
                          ) : (
                            <Typography variant="subtitle1" color="error">
                              Book Not in Stock
                            </Typography>
                          )}
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 20 }}
            >
              No matches found.
            </Typography>
          )
        ) : (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <CircularProgress />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Allbooks;
