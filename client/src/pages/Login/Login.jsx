import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (localStorage.role) {
      history.push("/vacations");
    }
  }, []);

  const inputChangeHandler = (e) => {
    if (e.target.id == "username-input") {
      setUsername(e.target.value);
      return;
    }
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:1000/users/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (!data.err) {
      localStorage.username = data.username;
      localStorage.firstName = data.firstName;
      localStorage.lastName = data.lastName;
      localStorage.role = data.role;
      history.push("/vacations");
    } else {
      setUsername("");
      setPassword("");
      alert(data.msg);
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={loginHandler}>
        <Typography variant="h3" component="div" color="#0082FD">
          Welcome to "Vacations" please sign in
        </Typography>
        <div className="formInputsDiv">
          <TextField
            id="username-input"
            label="Username"
            variant="standard"
            value={username}
            required
            onChange={inputChangeHandler}
          />
          <TextField
            id="password-input"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            required
            onChange={inputChangeHandler}
          />
        </div>
        <Typography variant="h6" component="div">
          Don't have an acount yet? <NavLink to="/register">Register</NavLink>
        </Typography>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
