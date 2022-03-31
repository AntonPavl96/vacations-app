import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";
import { Search, Logout, BarChart } from "@mui/icons-material";
import styles from "./Header.module.css";

const Header = ({ setVacationsArr }) => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const showAllVacations = () => {
    fetch("http://localhost:1000/vacations/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVacationsArr(data))
      .catch((err) => console.log(err));
  };

  const searchInpHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchHandler = () => {
    fetch(`http://localhost:1000/vacations/search/${searchValue}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return;
        }
        console.log(data);
        setSearchValue("");
        setVacationsArr(data);
      })
      .catch((err) => console.log(err));
  };

  const logoutHandler = () => {
    fetch("http://localhost:1000/users/logout", {
      method: "delete",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/login");
        localStorage.removeItem("username");
        localStorage.removeItem("firstName");
        localStorage.removeItem("role");
      })
      .catch((err) => console.log(err));
  };

  const statsHandler = () => {
    history.push("/statistics");
  };

  return (
    <Box width="100%">
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box className={styles.flex}>
            <Tooltip title="All Vacations">
              <Typography
                variant="h5"
                component="div"
                onClick={showAllVacations}
                sx={{ cursor: "pointer" }}
              >
                Vacations
              </Typography>
            </Tooltip>
            <Box className={styles.searchDiv}>
              <InputBase
                sx={{ ml: 1, color: "white" }}
                placeholder="Search Destination..."
                value={searchValue}
                onChange={searchInpHandler}
              />
              <Tooltip title="Search">
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={searchHandler}
                >
                  <Search sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box className={styles.flex}>
            <Typography variant="h5" component="div">
              {localStorage.role == "admin"
                ? "Hello Admin"
                : `Hello ${localStorage.firstName} ${localStorage.lastName}`}
            </Typography>
            {localStorage.role == "admin" ? (
              <Tooltip title="Statistics">
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="statistics"
                  onClick={statsHandler}
                >
                  <BarChart sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            ) : null}
            <Tooltip title="Logout">
              <IconButton
                sx={{ p: "10px" }}
                aria-label="logout"
                onClick={logoutHandler}
              >
                <Logout sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
