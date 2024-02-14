const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Yetkilendirme tokeni gerekli",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await Auth.findById(decodedToken.id);
      next();
    } catch (error) {
      return res.status(401).json({ message: "İstek yetkili değil" });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = authMiddleware;
