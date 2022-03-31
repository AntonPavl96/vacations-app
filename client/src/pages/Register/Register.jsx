import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (localStorage.role) {
      history.push("/vacations");
    }
  }, []);

  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case "firstName-input":
        setFirstName(e.target.value);
        break;
      case "lastName-input":
        setLastName(e.target.value);
        break;
      case "username-input":
        setUsername(e.target.value);
        break;
      case "password-input":
        setPassword(e.target.value);
        break;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:1000/users/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (!data.err) {
      history.push("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={submitHandler} className="form">
        <Typography variant="h3" component="div" color="#0082FD">
          Register
        </Typography>
        <div className="formInputsDiv">
          <TextField
            id="username-input"
            label="Username"
            variant="standard"
            value={username}
            onChange={inputChangeHandler}
            required
          />
          <TextField
            id="password-input"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={inputChangeHandler}
            required
          />
          <TextField
            id="firstName-input"
            label="First Name"
            variant="standard"
            value={firstName}
            onChange={inputChangeHandler}
            required
          />
          <TextField
            id="lastName-input"
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <Typography variant="h6" component="div">
          Already have an acount? <NavLink to="/login">Login</NavLink>
        </Typography>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { useHistory } from "react-router";
// import { NavLink } from "react-router-dom";

// export default function Register() {
//   const [firstName, setfirstName] = useState("");
//   const [password, setPassword] = useState("");

//   const history = useHistory();

//   const register = async () => {
//     // fetch().then(res=>res.json()).then(data=>clg(data))
//     const res = await fetch("http://localhost:1000/users/register", {
//       method: "post",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ firstName, password }),
//       credentials: "include",
//     });
//     const data = await res.json();
//     console.log(data);
//     if (!data.err) {
//       history.push("/login");
//     } else {
//       alert(data.msg);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="user name"
//         onChange={(e) => setfirstName(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={register}>Register</button>
//       <NavLink to="/login">Already have an account?</NavLink>
//       <NavLink to="/">Or continue as a guest</NavLink>
//     </div>
//   );
// }
