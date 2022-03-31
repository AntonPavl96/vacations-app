import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, IconButton, Checkbox, Tooltip } from "@mui/material";
import { FavoriteBorder, Favorite, Edit, Delete } from "@mui/icons-material";
import styles from "./VacationHeader.module.css";

const VacationHeader = ({
  vacationID,
  destination,
  setIsChanged,
  setVacationsArr,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.role === "user") {
      fetch(`http://localhost:1000/vacations/isLiked/${vacationID}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setIsLiked(data))
        .catch((err) => console.log(err));
    }
  }, []);

  const likeHandler = () => {
    fetch(`http://localhost:1000/vacations/like/${vacationID}`, {
      method: "put",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLiked((isLiked) => !isLiked);
        setIsChanged((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  const editHandler = () => {
    history.push(`/vacations/edit/${vacationID}`);
  };

  const deleteHandler = () => {
    fetch(`http://localhost:1000/admin/delete/${vacationID}`, {
      method: "delete",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        setVacationsArr(data.myVacations);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.header}>
      <Typography variant="h5" component="div">
        {destination}
      </Typography>
      {localStorage.role === "admin" ? (
        <div className={styles.buttonsDiv}>
          <Tooltip title="Edit">
            <IconButton size="large" onClick={editHandler}>
              <Edit fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="large" onClick={deleteHandler}>
              <Delete fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={isLiked}
          onChange={likeHandler}
        />
      )}
    </div>
  );
};

export default VacationHeader;
