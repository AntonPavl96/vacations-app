import React, { useState, useEffect } from "react";
import { VacationHeader } from "..";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./VacationCard.module.css";

const VacationCard = ({ vacation, setVacationsArr }) => {
  const [likes, setLikes] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  const fromDay = +vacation.fromDate.split("T")[0].split("-")[2] + 1;
  const fromMonth = vacation.fromDate.split("T")[0].split("-")[1];
  const fromYear = vacation.fromDate.split("T")[0].split("-")[0];
  const newFromDate = `${fromDay}/${fromMonth}/${fromYear}`;

  const toDay = +vacation.toDate.split("T")[0].split("-")[2] + 1;
  const toMonth = vacation.toDate.split("T")[0].split("-")[1];
  const toYear = vacation.toDate.split("T")[0].split("-")[0];
  const newToDate = `${toDay}/${toMonth}/${toYear}`;

  useEffect(() => {
    fetch(`http://localhost:1000/vacations/likes/${vacation.vacationID}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLikes(data))
      .catch((err) => console.log(err));
  }, [isChanged]);

  return (
    <Card
      className={styles.card}
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
    >
      <VacationHeader
        setVacationsArr={setVacationsArr}
        vacationID={vacation.vacationID}
        destination={vacation.destination}
        setIsChanged={setIsChanged}
      />
      <CardMedia
        component="img"
        className={styles.cardMedia}
        image={vacation.imageUrl}
        alt={`Image of ${vacation.destination}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {vacation.description}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          From: {newFromDate}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          To: {newToDate}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Price: {vacation.price}$
        </Typography>
      </CardContent>
      <div className={styles.likes}>
        <Typography variant="h6" component="div">
          {likes.length}
        </Typography>
      </div>
    </Card>
  );
};

export default VacationCard;
