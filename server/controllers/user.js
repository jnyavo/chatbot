const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Send = require("../utility/sendEmail.js");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.model.findOne({ email });

    if (!existingUser) {
      res.statusMessage = "User doesn't exists.";
      return res.status(404).send("User doesn't exists.");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.statusMessage = "Invalid Password.";
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      "codesecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};
exports.signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    type,
  } = req.body;
  try {
    const existingUser = await User.model.findOne({ email });
    if (existingUser) {
      res.statusMessage = "User Already exists.";
      return res.status(404).json({ message: "User Already exists." });
    }
    if (password !== confirmPassword) {
      res.statusMessage = "Password don't match.";
      return res.status(404).json({ message: "Password don't match." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.model.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      type,
    });
    const token = jwt.sign(
      { email: result.email, id: result.id },
      "codesecret",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: result, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const userList = await User.model.find();
    console.log("lelena");
    res.status(200).json({ result: userList, count: userList.length });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userList = await User.model.findOneAndDelete({
      _id: req.body.key._id,
    });
    res.status(200).json({ result: userList, count: userList.length });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "this Email is not registered" });
    }

    const secret = "codesecret" + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = await jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://localhost:3000/reset-password/${user._id}/${token}`;
    const response = await Send.sendEmail(user.email, link);
    return res.status(200).json({ message: "check your email" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { id, token, password, confirmPassword } = req.body;
    const user = await User.model.findById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "error please contact us" });
    }
    if (password !== confirmPassword) {
      return res.status(404).json({ message: "Password don't match." });
    }
    const secret = "codesecret" + user.password;
    const payload = await jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 12);
    const userUp = await User.model.findOneAndUpdate(
      { _id: payload.id },
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({ message: "password successfully  updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};
