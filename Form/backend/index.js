const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { Form_routes } = require("./src/routes/form");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/form", Form_routes);

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGO_URL);
  console.log(`server started at http://localhost:${process.env.PORT}/`);
});
