const Pet = require("../models/Pet");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json({
      status: "success",
      data: pets,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    res.status(200).json({
      status: "success",
      data: pet,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const pets = await Pet.find({ category: categoryId }).populate("category");

    res.json(pets);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, age, breed, color, description, imageLabel, category } =
      req.body;
    const { image, additionalImages } = req.files;

    let imagePath = "";
    let additionalImagesPaths = [];

    if (image && image.length > 0) {
      imagePath = image[0].path;
    }
    if (additionalImages && additionalImages.length > 0) {
      additionalImagesPaths = additionalImages.map((file) => file.path);
    }

    const createdPet = await Pet.create({
      name,
      age,
      breed,
      color,
      description,
      imageLabel,
      category,
      image: imagePath,
      additionalImages: additionalImagesPaths,
    });

    res.status(201).json({
      status: "success",
      data: createdPet,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, breed, color, description, imageLabel, category } =
      req.body;
    const { image, additionalImages } = req.files;

    let imagePath = "";
    let additionalImagesPaths = [];

    if (image && image.length > 0) {
      imagePath = image[0].path;
    }
    if (additionalImages && additionalImages.length > 0) {
      additionalImagesPaths = additionalImages.map((file) => file.path);
    }

    const existingPet = await Pet.findById(id);

    // Delete old additional images if new ones are provided
    if (additionalImagesPaths.length > 0) {
      await Promise.all(
        existingPet.additionalImages.map(async (img) => {
          try {
            await fs.promises.unlink(path.join(__dirname, "../", img));
            console.log("Additional image deleted successfully");
          } catch (err) {
            console.error(`Failed to delete additional image: ${img}`, err);
          }
        })
      );
    } else {
      additionalImagesPaths = existingPet.additionalImages;
    }

    // Delete old main image if a new one is provided
    if (imagePath.length > 0 && existingPet.image) {
      try {
        await fs.promises.unlink(
          path.join(__dirname, "../", existingPet.image)
        );
        console.log("Main image deleted successfully");
      } catch (err) {
        console.error(`Failed to delete main image: ${existingPet.image}`, err);
      }
    } else {
      imagePath = existingPet.image;
    }
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      {
        name,
        age,
        breed,
        color,
        description,
        imageLabel,
        category,
        image: imagePath,
        additionalImages: additionalImagesPaths,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedPet,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Pet.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
    });
  }
};
