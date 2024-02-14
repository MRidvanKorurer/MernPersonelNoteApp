const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "email adresi zaten kayıtlı",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = await Auth.create({ name, email, password: hashPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "kayıt işlemi başarılı",
      newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "email adresi hatalı",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "parola hatalı",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "giriş işlemi başarılı",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
