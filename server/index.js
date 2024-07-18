const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const petRoutes = require("./routes/pet");
const adoptionRoutes = require("./routes/adoption");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.use("/api/category", categoryRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoption", adoptionRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const mongoUrl = "mongodb://localhost:27017/PawfectDatabase";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error while connecting", err);
});

app.listen(4000, () => {
  console.log("App is running on port 4000");
});
