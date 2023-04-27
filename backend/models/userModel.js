const mongoose = require("mongoose");

// User schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Must have a email"],
    unique: [true, "Email must be unique"],
  },
  userName: {
    type: String,
    required: [true, "Must have a user name"],
  },
  password: {
    type: String,
    required: [true, "Must have a password"],
  },
  highScore: {
    type: Number,
    default: true
}
});

// User model
const User = mongoose.model("User", userSchema);

module.exports = User;
