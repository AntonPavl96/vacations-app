import React, { Fragment, useEffect, useState } from "react";
import { Header, VacationCard } from "../../components";
import { useHistory } from "react-router-dom";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import styles from "./VacationsList.module.css";

const VacationsList = () => {
  const [vacationsArr, setVacationsArr] = useState([]);

  const history = useHistory();

  if (!localStorage.role) {
    history.push("/login");
  }

  useEffect(() => {
    fetch("http://localhost:1000/vacations/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVacationsArr(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addVacation = () => {
    history.push("/vacations/add");
  };

  const fabStyle = { position: "fixed", bottom: "3vh", right: "3vw" };

  return (
    <Fragment>
      <Header setVacationsArr={setVacationsArr} />
      <div className={styles.container}>
        {vacationsArr.length ? (
          vacationsArr.map((vacation) => (
            <VacationCard
              setVacationsArr={setVacationsArr}
              vacation={vacation}
              key={vacation.vacationID}
            />
          ))
        ) : (
          <h1>No vacations yet</h1>
        )}
      </div>
      {localStorage.role == "admin" ? (
        <Fab color="primary" onClick={addVacation} sx={fabStyle}>
          <Add />
        </Fab>
      ) : null}
    </Fragment>
  );
};

export default VacationsList;
