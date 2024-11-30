const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const adminAuth=require("./routes/adminAuth")
const doctorAuth=require('./routes/doctorAuth')
const cookieParser =require('cookie-parser')
require("dotenv").config();
const PORT = process.env.port;
const mongourl=process.env.mongourl;

app.use(
  cors({ 
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/", doctorAuth);
app.use("/", adminAuth);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongourl);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});