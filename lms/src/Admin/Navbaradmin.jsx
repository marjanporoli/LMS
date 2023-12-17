import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiBooksDuotone } from "react-icons/pi";
import { MdRecommend } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { IoIosGitPullRequest } from "react-icons/io";
import { IoIosBookmarks } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";
const Navbaradmin = () => {
  return (
    <div className="nav">
      <Box className="back">
        <AppBar position="static" style={{ backgroundColor: "gray" }}>
          <Toolbar position="static">
            <Box sx={{ flexGrow: 5 }}></Box>
            <Button color="inherit" variant="contained">
              <Link
                to={"/Allbookadmin"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <PiBooksDuotone /> All Books
              </Link>
            </Button>
            <Button color="inherit" variant="contained">
              <Link
                to={"/Addbookadmin"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <MdOutlineLibraryBooks /> Add Book
              </Link>
            </Button>
            <Button color="inherit" variant="contained">
              <Link
                to={"/Managestudadmin"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <PiStudent /> Manage User
              </Link>
            </Button>
            <Button color="inherit" variant="contained">
              <Link
                to={"/Issuerequestadmin"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <IoIosGitPullRequest /> Issue Request
              </Link>
            </Button>
            <Button color="inherit" variant="contained">
              <Link
                to={"/Allissuedbookadmin"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <IoIosBookmarks /> All Issued Books
              </Link>
            </Button>
            <Button color="inherit" variant="contained">
              <Link
                to={"/Recommandbookadmin"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <MdRecommend /> Recommended Books
              </Link>
            </Button>
            <Button
              color="inherit"
              variant="contained"
            >
              <Link
                to={"/Home"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "medium",
                }}
              >
                <IoMdLogOut /> Logout
              </Link>
            </Button>
            <Button color="primary">
              <Link
                to={"/Adminprof"}
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontSize: "30px",
                }}
              >
                <CgProfile />
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)",
            // width: '100%',
            minHeight: "80vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%", // Set backgroundSize to cover the entire div
          }}
        >
       <div style={{ position: 'relative', display: 'inline-block' }}>
  <img
    src="https://i.pinimg.com/originals/3c/9d/9e/3c9d9e8ea848482f955610c6bd3ba8c3.jpg"
    alt="your image"
    style={{  width: '800px', height: '400px', marginTop: '50px'}}
  />
  <div
    style={{
      position: 'absolute',
      top: 50,
      left: 0,
      width: '800px',
      height: '400px',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
    }}
  ></div>
</div>



        </div>
      </Box>
    </div>
  );
};

export default Navbaradmin;
