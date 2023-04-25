require("dotenv").config();
const jwt = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
  const token = req?.header("authorization");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.body.user_id = decoded.id;
      req.body.user_name = decoded.userName;

      next();
    } catch (err) {
      return res.status(401).json({ msg: "Session Expired!" });
    }
  } else {
    return res.status(401).json({ msg: "Login Required!" });
  }
};
module.exports = { ensureAuth };
