const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');


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
  const { email, password, confirmPassword, firstName, lastName, type } = req.body;
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
      type

    });
    const token = jwt.sign({ email: result.email, id: result.id }, "codesecret", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};

exports.getUserList = async(req, res) => {
  try {
    const userList = await User.find();
    res.status(200).json({result: userList, count: userList.length});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

exports.deleteUser = async(req, res) => {
  try {
    const userList = await User.findOneAndDelete({ '_id' : req.body.key._id });
    res.status(200).json({result: userList, count: userList.length});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}
