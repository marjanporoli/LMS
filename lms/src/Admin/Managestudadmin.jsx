import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import "./Managestudadmin.css";

const Managestudatadmin = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/manageuser");
        // Filter out only user details (assuming there's a "role" property)
        const usersOnly = response.data.filter((user) => user.role === "user");
        setData(usersOnly);
        setFilteredData(usersOnly);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${userId}`);
      setData((prevData) => prevData.filter((user) => user._id !== userId));
      setFilteredData((prevData) => prevData.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}`, error);
    }
  };

  const handleSearch = () => {
    if (data) {
      const filtered = data.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          (user.takenbook && user.takenbook.some((book) => book.title.toLowerCase().includes(query.toLowerCase())))
      );
      setFilteredData(filtered);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(); // Call handleSearch on each input change
  };

  return (
    <div style={{ backgroundColor: "rgb(179, 206, 214)", minHeight: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              MANAGE USER
            </Typography>
          </Toolbar>
          <div className="searchbar">
            <input
              className="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="  Search  by name or book name..."
            />
            <Button
              className="buttn"
              type="Search"
              color="success"
              variant="contained"
              size="small"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </AppBar>
        <br />
        <br />
        {filteredData ? (
          <Grid container spacing={2}>
            {filteredData.map((user) => (
              <Grid item xs={12} key={user._id}>
                <Card style={{ maxWidth: 800, margin: "auto" }}>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardContent>
                        <Typography variant="h6">{user.title}</Typography>
                        <Typography variant="subtitle1">{`User Name: ${user.name}`}</Typography>
                        <Typography variant="subtitle1">{`Department: ${user.department}`}</Typography>
                        <Typography variant="subtitle1">{`Admissionyear: ${user.admissionyear}`}</Typography>
                        <Typography variant="subtitle1">{`Phonenumber: ${user.phonenumber}`}</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                      <CardContent>
                        {user.takenbook && user.takenbook.length > 0 ? (
                          user.takenbook.map((book) => (
                            <Typography key={book._id} variant="subtitle1">
                              <Typography>{`Book: ${book.title}`}</Typography>
                              <Typography>{`Author: ${book.author}`}<br></br></Typography>
                              <Typography>{`Year: ${book.year}`}</Typography>
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="subtitle1">
                            No books taken
                          </Typography>
                        )}
                      </CardContent>
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                      <CardContent>
                        <Button
                          onClick={() => handleDeleteUser(user._id, "delete")}
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          DELETE
                        </Button>
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

export default Managestudatadmin;
