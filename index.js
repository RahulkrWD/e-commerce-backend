const express = require("express");
// const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const product = require("./routes/product");
const cors = require("cors");

// config dotenv file
dotenv.config();
const app = express();
// app.use(morgan("dev"));
app.use(express.json()); // Parse incoming request bodies in JSON format
connectDB(); // connection to mongodb
app.use(cors());

app.get("/", function (req, res) {
  res.send({ message: "welcome to my app e-commerce app" });
});

// auth router
app.use("/auth", authRoute);

// product router
app.use("/product", product);

// PORT 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT} and ${process.env.DEV_MODE}`);
});
