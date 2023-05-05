const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// SIGNUP
exports.signup = (req, res) => {
  const { email, userName, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      try {
        User.findOne({ $or: [{ email: email }, { userName: userName }] })
          .then((existingUser) => {
            if (existingUser) {
              res.status(422).json({
                message: "Naudotojas jau egzistuoja, vietoj jo prisijunkite.",
              });
            } else {
              const createdUser = new User({
                email,
                userName,
                password: hash,
                highScore: 0,
              });

              createdUser
                .save()
                .then((doc) => {
                  res
                    .status(201)
                    .json({ message: `Vartotojas sėkmingai sukurtas.` });
                })
                .catch((err) => res.status(404).json({ message: err.message }));
            }
          })
          .catch((err) => res.status(404).json({ message: err.message }));
      } catch {
        res
          .status(500)
          .json({ error: "Užsiregistruoti nepavyko, bandykite vėliau." });
      }
    });
  });
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // validate
    if (!userName || !password) {
      return res.status(400).json({message: "Please enter all required fields."});
    }

    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(401).json({message: "Neteisingas vartotjojo vardas arba slaptažodis."});
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Wrong username or password."});
    }

    res
      .send(`${existingUser.userName}.${existingUser.highScore}`);
  } catch {
    res.status(500).json({message: "Prisijungti nepavyko, bandykite vėliau."});
  }
};

exports.updateHighScore = async (req, res) => {
  try {
    const { userName, newHighScore } = req.body;

    let existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(400).send("No user found");
    }
    
    let updatedUser = await User.findOneAndUpdate({ userName }, { $set: { highScore: newHighScore } }, { new: true });
    if (!updatedUser) {
      return res.status(400).send("No user found");
    }

    res.status(200).json({ message: "High score updated successfully", highScore: updatedUser.highScore });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("Loged out");
};
