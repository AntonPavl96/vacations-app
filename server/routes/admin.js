const { myQuery } = require("../DB-config");
const { onlyAdmins } = require("../helpers");

const router = require("express").Router();

router.use(onlyAdmins);

// ADD or EDIT vacation
router.post("/:action/:vacationID?", async (req, res) => {
  try {
    const { action, vacationID } = req.params;

    const { description, destination, imageUrl, fromDate, toDate, price } =
      req.body;

    if (
      !description ||
      !destination ||
      !imageUrl ||
      !fromDate ||
      !toDate ||
      !price
    ) {
      return res.status(400).send({ err: true, msg: "missing some info" });
    }
    if (action == "add") {
      await myQuery(
        `INSERT INTO vacations (description, destination, imageUrl, fromDate, toDate, price) VALUES ("${description}","${destination}","${imageUrl}","${fromDate}","${toDate}","${price}")`
      );
      res.send({ msg: "vacation added successfully" });
    } else {
      await myQuery(
        `UPDATE vacations SET description = "${description}", destination = "${destination}", imageUrl = "${imageUrl}", fromDate = "${fromDate}", toDate = "${toDate}", price = "${price}" WHERE vacationID = ${vacationID}`
      );
      res.send({ msg: "vacation edited successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// DELETE vacation
router.delete("/delete/:vacationID", async (req, res) => {
  try {
    const { vacationID } = req.params;
    await myQuery(`DELETE FROM likes WHERE vacationID = ${vacationID}`);
    await myQuery(`DELETE FROM vacations WHERE vacationID = ${vacationID}`);
    const myVacations = await myQuery("SELECT * FROM vacations");
    res.send({ msg: "vacation deleted successfully", myVacations });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// get STATISTICS (table of liked vacations by id with number of likes)
router.get("/statistics", async (req, res) => {
  try {
    const likedVacations = await myQuery(
      "SELECT vacationID, count(vacationID) AS likes FROM likes GROUP BY vacationID"
    );
    res.send(likedVacations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
