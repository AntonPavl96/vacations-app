const { myQuery } = require("../DB-config");

const router = require("express").Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ err: true, msg: "missing username or password" });
    }

    const user = await myQuery(
      `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`
    );

    if (!user.length) {
      return res
        .status(401)
        .send({ err: true, msg: "incorrect username or password" });
    }

    req.session.user = {
      userID: user[0].userID,
      username,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      role: user[0].role,
    };

    res.send({
      msg: `Welcome ${user[0].firstName} ${user[0].lastName}`,
      username,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      role: user[0].role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName) {
      return res
        .status(400)
        .send({ err: true, msg: "missing some information" });
    }

    const user = await myQuery(
      `SELECT * FROM users WHERE username = "${username}"`
    );

    if (user.length) {
      return res.status(400).send({ err: true, msg: "username already taken" });
    }

    await myQuery(
      `INSERT INTO users (username, password, firstName, lastName) VALUES ("${username}", "${password}", "${firstName}", "${lastName}")`
    );

    res.status(201).send({ msg: "user added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// LOGOUT
router.delete("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.send({ msg: "disconnected successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
