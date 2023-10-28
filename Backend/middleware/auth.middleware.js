const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.userID =  decoded.userID
        req.body.username = decoded.username
        console.log(decoded)
        next();
      } else {
        res.send({message: "You are not authorized"});
      }
    });
  } else {
    res.send({ message: "Please Login First!" });
  }
};

module.exports = { auth };
