const Planing = require("../models/calendrier.js");

exports.getSpecificPlaning = async (req, res) => {
  const email = req.params.id;
  try {
    const existingPlaning = await Planing.model.findOne({ email: email });
    if (!existingPlaning) {
      res.statusMessage = "contact us your planing doesn't exists";
      return res.status(404).send("contact us your planing doesn't exists");
    }
    res.status(200).json(existingPlaning);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

exports.updatePlaning = async (req, res) => {
  const { email, planing } = req.body;
  try {
    const existingPlaning = await Planing.model.findOneAndReplace(
      { email: email },
      { email: email, planing: planing },
      { upsert: true, returnDocument: "after" }
    );
    res.status(200).json(existingPlaning);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
exports.createPlaning = async (req, res) => {
  const { email, planing } = req.body;
  console.log('email :' + email);
  try {
    const existingPlaning = await Planing.model.findOne({ email });

    if (!existingPlaning) {
      const newPlaning = await Planing.model.create({
        email: email,
        planing: planing,
      });
      const result = await newPlaning.save();
      res.status(201).json(newPlaning);
    } else {
      res.status(200).json(existingPlaning);
    }
  } catch (error) {
    console.log(error);
    res.status(409).send({ message: error.message });
  }
};

exports.botPlaning = async (req, res) => {
  const { email, planing } = req.body;
  try {
    const existingPlaning = await Planing.model.findOneAndUpdate(
      { email: email },
      { $push: { planing: planing } },
      { returnDocument: "after" }
    );
    res.status(200).json(existingPlaning);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
