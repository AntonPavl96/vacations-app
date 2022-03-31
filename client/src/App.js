import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import {
  Login,
  Register,
  VacationsList,
  VacationForm,
  Statistics,
} from "./pages";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <img
          src="https://media.cntraveler.com/photos/60e612ae0a709e97d73d9c60/1:1/w_3840,h_3840,c_limit/Beach%20Vacation%20Packing%20List-2021_GettyImages-1030311160.jpg"
          alt="random vacation image"
          className={styles.img}
        />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/vacations" exact>
            <VacationsList />
          </Route>

          <Route path="/vacations/:action/:vacationID?">
            <VacationForm />
          </Route>

          <Route path="/statistics">
            <Statistics />
          </Route>

          <Route path="/*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
