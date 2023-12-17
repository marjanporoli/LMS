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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./Allissuedbookadmin.css";

const Allissuedbookadmin = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [issuedDate, setIssuedDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [fine, setFine] = useState(0);
  const [daysTaken, setDaysTaken] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/issuedbook");
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  const handleCloseRequest = async (bookId) => {
    console.log(bookId);
    try {
      await axios.patch(`http://localhost:5000/retrunBook/${bookId}`);
      // code for removing the request after delete
      setData((prevData) => prevData.filter((book) => book._id !== bookId));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBookReturn = async (bookId, issuedDate) => {
    console.log("handle return is called");
    console.log("Issued date:", issuedDate);
    const currentDate = new Date();
    const parsedIssuedDate = new Date(issuedDate);

    const timeDifference = currentDate - parsedIssuedDate;
    const calculatedDaysTaken = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    console.log("Days taken:", calculatedDaysTaken);

    if (calculatedDaysTaken > 30) {
      const calculatedFine = (calculatedDaysTaken - 30) * 20;
      console.log("Fine:", calculatedFine);

      setFine(calculatedFine);
      setDaysTaken(calculatedDaysTaken);

      setOpenDialog(true);
    } else {
      alert("No fine. Book returned on time.");
      await handleCloseRequest(bookId);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = (searchText) => {
    const filtered = data.filter(
      (book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    handleSearch(searchText);
  };

  return (
    <div style={{ backgroundColor: "rgb(179, 206, 214)", minHeight: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ALL ISSUED BOOK
            </Typography>
          </Toolbar>
          <div className="searchbar">
            <input
              className="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search Book by name or author name..."
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleBookReturn(book._id, book.issuedDate)
                          }
                        >
                          Return Book
                        </Button>
                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                          <DialogActions>
                            <Button onClick={handleCloseDialog}>Close</Button>
                          </DialogActions>
                          <DialogTitle>Fine Information</DialogTitle>
                          <DialogContent>
                            <p>{`You are ${daysTaken - 30} days overdue.`}</p>
                            <p>{`Your fine is ${fine}.`}</p>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => handleCloseRequest(book._id)}
                            >
                              Fine Paid
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <CircularProgress />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Allissuedbookadmin;
