const colors = require("colors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const globalErrHandler = require("./middleware/globalErrHandler");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const rewardsRouter = require("./routes/rewards");
const choresRouter = require("./routes/chores");
const childRouter = require("./routes/child");
const habitsRouter = require("./routes/habits");
const choreAssignmentsRouter = require("./routes/choreAssignments");
const verifyToken = require("./middleware/verifyToken");
// console.log("colors is working".magenta.bgYellow);

// initialize express
const app = express();

// middleware configuration
app.use(express.json());
app.use(morgan("dev"));

// MongoDB connection
mongoose
  .connect(process.env.DB)

  .then(() => {
    console.log("Connected to the database".magenta);
  });

// route handlers
app.use("/api/auth", authRouter);
app.use("/api/auth/child", authRouter);
app.use("/api/user", userRouter);
app.use("/api/children", childRouter);
app.use("/api/habits", habitsRouter);
app.use("/api/chores", choresRouter);
app.use("/api/choreAssignments", choreAssignmentsRouter);
app.use("/api/rewards", rewardsRouter);

// error handlers
app.use(globalErrHandler);

// start the server
app.listen(8080, () => {
  console.log("listening on port 8080".magenta);
});
