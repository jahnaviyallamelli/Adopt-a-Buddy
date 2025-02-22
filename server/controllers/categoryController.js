const Category = require("../models/Category");

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const created = await Category.create({ name });
    res.status(201).json({
      status: "success",
      data: created,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Category.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: "",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
