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
} from "@mui/material";
import { Button as MUIButton } from "@material-ui/core";
import "./Currentlyissueedbook.css";

const Currentlyissueedbook = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/currentlyissuedbook/${userId}`
        );

        const updatedData = await Promise.all(
          response.data.map(async (book) => {
            const { issuedDate, _id } = book;
            const { calculatedFine, remainingDays, daysOverdue } =
              handleReturn(issuedDate);
            return { ...book, calculatedFine, remainingDays, daysOverdue };
          })
        );

        setData(updatedData);
        setFilteredData(updatedData); // Initialize filteredData with all data
        console.log(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReturn = (issuedDate) => {
    const currentDate = new Date();
    const parsedIssuedDate = new Date(issuedDate);

    const timeDifference = currentDate - parsedIssuedDate;
    const daysTaken = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    console.log("Days taken:", daysTaken);

    if (daysTaken > 30) {
      const remainingDays = daysTaken - 30;
      const calculatedFine = remainingDays * 20;
      return { calculatedFine, remainingDays: 0, daysOverdue: remainingDays };
    } else {
      const remainingDays = 30 - daysTaken;
      return {
        calculatedFine: 0,
        remainingDays: remainingDays,
        daysOverdue: 0,
      };
    }
  };

  // const handleSearch = () => {
  //   if (data) {
  //     const filtered = data.filter(
  //       (book) =>
  //         book.title.toLowerCase().includes(query.toLowerCase()) ||
  //         book.author.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   }
  // };
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

  return (
    <div className="bk">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              CURRENTLY ISSUED BOOK
            </Typography>
          </Toolbar>
          <div className="searchbar">
            <input
              className="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="  Search Book by title or author..."
            />
            <MUIButton
              className="buttn"
              type="button"
              color="success"
              variant="contained"
              size="small"
              // onClick={handleSearch}
            >
              Search
            </MUIButton>
          </div>
        </AppBar>
        <br />
        <br />
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
                          <div>
                            {book.remainingDays !== null &&
                            book.remainingDays >= 0 ? (
                              <div>
                                {book.remainingDays > 0 && (
                                  <Typography variant="subtitle1">{`Days Remaining to Return: ${book.remainingDays}`}</Typography>
                                )}
                                {book.calculatedFine > 0 && (
                                  <Typography variant="subtitle1">{`Fine: ${book.calculatedFine}`}</Typography>
                                )}
                                {book.daysOverdue > 0 && (
                                  <Typography variant="subtitle1">{`Days Overdue: ${book.daysOverdue}`}</Typography>
                                )}
                                {book.remainingDays === 0 &&
                                  book.calculatedFine === 0 &&
                                  book.daysOverdue === 0 && (
                                    <Typography variant="subtitle1">{`Return today to avoid fine`}</Typography>
                                  )}
                              </div>
                            ) : (
                              <Typography variant="subtitle1">{`Book is overdue.`}</Typography>
                            )}
                          </div>
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

export default Currentlyissueedbook;
