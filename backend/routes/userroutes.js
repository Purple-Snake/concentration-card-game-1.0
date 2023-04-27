const express = require("express");
const userController = require("../controllers/userController");
// const { route } = require("../app");


const userRouter = express.Router();


// change Routers
// userRouter
// .route("/")
// .get(userController.getUsers)

userRouter
.route("/")
.post(userController.signup)
// .get(userController.getHighScore)

userRouter
.route("/login")
.post(userController.login)

userRouter
.route("/logout")
.get(userController.logout)

userRouter
.route("/updateHighscore")
.patch(userController.updateHighScore)

// userRouter
// .route("/")
// .get(userController.getUser)
// .post(userController.postUser)

module.exports = userRouter;