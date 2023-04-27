const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userroutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Router
app.use("/api/users", userRouter);
module.exports = app;
