const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "s0me r@ndom $ecret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/users", require("./routes/users"));
app.use("/vacations", require("./routes/vacations"));
app.use("/admin", require("./routes/admin"));

app.listen(1000, () => console.log("server up and running on port 1000"));
