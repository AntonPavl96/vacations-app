import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router";
import { IconButton, Tooltip } from "@mui/material";
import { Home } from "@mui/icons-material";
import styles from "./Statistics.module.css";

const Statistics = () => {
  const [likedVacations, setLikedVacations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:1000/admin/statistics", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLikedVacations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const homeHandler = () => {
    history.push("/vacations");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Statistics</h1>
        <Tooltip title="Home">
          <IconButton
            sx={{ p: "10px" }}
            aria-label="home"
            onClick={homeHandler}
          >
            <Home sx={{ color: "black" }} />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles.chartDiv}>
        <Bar
          data={{
            labels: likedVacations.map(
              (vacation) => `vacationID: ${vacation.vacationID}`
            ),
            datasets: [
              {
                label: "# of votes",
                data: likedVacations.map((vacation) => vacation.likes),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default Statistics;
