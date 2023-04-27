const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    //reikalingas priedas cookie parser, turi būti įrašytas į app.js
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const verified = jwt.verify(token, "superSecretCode");
      req.userData = verified;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = auth;
