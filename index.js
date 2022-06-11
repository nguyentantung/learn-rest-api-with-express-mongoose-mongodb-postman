const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");
//const bookController = require("./controllers/bookController");
dotenv.config();
//connect to mongodb
mongoose.connect((process.env.MONGODB_URL),() => {
    console.log("Connected to mongodb");
})
app.use(bodyParser.json({limit: "50mb"}))
app.use(cors());
app.use(morgan("common"));
// app.get("/api",(req,res) => {
//     res.status(200).json("Hello worldc")
// });
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);
app.listen(8000, () => {
    console.log("Server is running...");
});