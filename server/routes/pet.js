const express = require("express");
const petController = require("../controllers/petController");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});
router.get("/all", petController.getAll);

router.get("/get/:id", petController.getOne);

router.get("/category/:categoryId", petController.getByCategory);

router.post(
  "/create",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "additionalImages",
      maxCount: 5,
    },
  ]),
  petController.create
);
router.patch(
  "/update/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "additionalImages",
      maxCount: 5,
    },
  ]),
  petController.update
);

router.delete("/delete/:id", petController.delete);

module.exports = router;
