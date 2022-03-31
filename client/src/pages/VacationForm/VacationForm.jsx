import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

const VacationForm = () => {
  const { action, vacationID } = useParams();
  const history = useHistory();

  const today = new Date().toISOString().split("T")[0];

  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (action == "edit") {
      fetch(`http://localhost:1000/vacations/${vacationID}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          const fromDay = +data.fromDate.split("T")[0].split("-")[2] + 1;
          const fromMonth = data.fromDate.split("T")[0].split("-")[1];
          const fromYear = data.fromDate.split("T")[0].split("-")[0];
          const newFromDate = `${fromYear}-${fromMonth}-${fromDay}`;

          const toDay = +data.toDate.split("T")[0].split("-")[2] + 1;
          const toMonth = data.toDate.split("T")[0].split("-")[1];
          const toYear = data.toDate.split("T")[0].split("-")[0];
          const newToDate = `${toYear}-${toMonth}-${toDay}`;
          setDescription(data.description);
          setDestination(data.destination);
          setImageUrl(data.imageUrl);
          setFromDate(newFromDate);
          setToDate(newToDate);
          setPrice(data.price);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case "description-input":
        setDescription(e.target.value);
        break;
      case "destination-input":
        setDestination(e.target.value);
        break;
      case "imageUrl-input":
        setImageUrl(e.target.value);
        break;
      case "fromDate-input":
        setFromDate(e.target.value);
        break;
      case "toDate-input":
        setToDate(e.target.value);
        break;
      case "price-input":
        setPrice(e.target.value);
        break;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const myParams = action == "add" ? "add" : `edit/${vacationID}`;
    const res = await fetch(`http://localhost:1000/admin/${myParams}`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        description,
        destination,
        imageUrl,
        fromDate,
        toDate,
        price,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.err) {
      history.push("/vacations");
    } else {
      alert(data.msg);
    }
  };

  const cancelHandler = () => {
    history.goBack();
  };

  return (
    <div className="formContainer">
      <form onSubmit={submitHandler} className="form">
        <Typography variant="h3" component="div" color="#0082FD">
          {action == "add" ? "Add New Vacation" : "Edit Vacation"}
        </Typography>
        <div className="formInputsDiv">
          <TextField
            id="description-input"
            label="Description"
            variant="standard"
            value={description}
            required
            onChange={inputChangeHandler}
          />
          <TextField
            id="destination-input"
            label="Destination"
            variant="standard"
            value={destination}
            required
            onChange={inputChangeHandler}
          />
          <TextField
            id="imageUrl-input"
            label="Image Url"
            variant="standard"
            value={imageUrl}
            required
            onChange={inputChangeHandler}
          />
          <TextField
            id="fromDate-input"
            label="From Date"
            variant="standard"
            value={fromDate}
            required
            type="date"
            onChange={inputChangeHandler}
          />
          <TextField
            id="toDate-input"
            label="To Date"
            variant="standard"
            value={toDate}
            required
            type="date"
            onChange={inputChangeHandler}
          />
          <TextField
            id="price-input"
            label="Price"
            variant="standard"
            value={price}
            required
            type="number"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="formButtonsDiv">
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="contained" type="button" onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VacationForm;
