const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/all", categoryController.getAll);

//creating new
router.post("/create", categoryController.create);
//update
router.patch("/update/:id", categoryController.update);
router.delete("/delete/:id", categoryController.delete);

module.exports = router;
