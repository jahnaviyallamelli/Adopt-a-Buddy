const Adoption = require("../models/Adoption");

exports.getAll = async (req, res) => {
  try {
    const data = await Adoption.find();
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Adoption.findById(id);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
    });
  }
};

exports.create = async (req, res) => {
  const { firstName, lastName, email, address, phone, pet } = req.body;
  try {
    const created = await Adoption.create({
      firstName,
      lastName,
      email,
      address,
      phone,
      pet,
    });
    res.status(201).json({
      status: "success",
      data: created,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, address, phone, pet } = req.body;
  try {
    const updated = await Adoption.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        address,
        phone,
        pet,
      },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      message: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Adoption.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
