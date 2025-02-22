const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.js");
const eventRoutes = require("./routes/adminEventRoutes.js");
const adminProductRoute = require("./routes/adminProductRoute.js");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/events", eventRoutes);
app.use("/api/admin/products", adminProductRoute);
connectDB();

app.listen(4006, () => {
  console.log("listing in port  4006");
});
