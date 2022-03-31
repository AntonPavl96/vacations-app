const { myQuery } = require("../DB-config");
const { onlyUsers, allLoggedUsers } = require("../helpers");

const router = require("express").Router();

// ALL vacations sorted
router.get("/", allLoggedUsers, async (req, res) => {
  try {
    const vacations = await myQuery(
      `SELECT vacations.*, likes.userID FROM vacations LEFT JOIN likes 
      ON likes.vacationID = vacations.vacationID 
      AND likes.userID = ${req.session.user.userID} ORDER BY userID DESC`
    );
    res.send(vacations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// VACATION by ID
router.get("/:vacationID", allLoggedUsers, async (req, res) => {
  try {
    const { vacationID } = req.params;
    const vacations = await myQuery(
      `SELECT * FROM vacations WHERE vacationID = "${vacationID}"`
    );
    res.send(vacations[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// VACATIONS by DESTINATION
router.get("/search/:destination", allLoggedUsers, async (req, res) => {
  try {
    const { destination } = req.params;
    const vacations = await myQuery(
      `SELECT * FROM vacations WHERE destination LIKE "%${destination}%"`
    );
    if (!vacations.length) {
      res.send({ err: true, msg: "no vacations with that destination." });
    }
    res.send(vacations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// get Likes by vacationID
router.get("/likes/:vacationID", allLoggedUsers, async (req, res) => {
  try {
    const { vacationID } = req.params;
    const likes = await myQuery(
      `SELECT * FROM likes WHERE vacationID = "${vacationID}"`
    );
    res.send(likes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// LIKE or UNLIKE a vacation
router.put("/like/:vacationID", onlyUsers, async (req, res) => {
  try {
    const { vacationID } = req.params;

    const likedVacation = await myQuery(
      `SELECT * FROM likes WHERE userID = "${req.session.user.userID}" AND vacationID = "${vacationID}" `
    );
    const mySQL = likedVacation.length
      ? `DELETE FROM likes WHERE userID = "${req.session.user.userID}" AND vacationID = "${vacationID}" `
      : `INSERT INTO likes (userID, vacationID) VALUES ("${req.session.user.userID}","${vacationID}")`;

    await myQuery(mySQL);

    res.send({
      msg: likedVacation.length ? "vacation unliked" : "vacation liked",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// check if specific vacation is liked and return T/F
router.get("/isLiked/:vacationID", onlyUsers, async (req, res) => {
  try {
    const { vacationID } = req.params;
    const likedVacation = await myQuery(
      `SELECT * FROM likes WHERE userID = "${req.session.user.userID}" AND vacationID = "${vacationID}" `
    );
    const isLiked = likedVacation.length ? true : false;
    res.send(isLiked);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
