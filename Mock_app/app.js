const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin.js");
const authRoutes = require("./routes/auth.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded());

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://shiva:shiva123@cluster0-kjcb5.mongodb.net/mock?retryWrites=true&w=majority"
  )
  .then(result => {
    console.log("Connected!!");
    app.listen(4001);
  })
  .catch(error => {
    console.log(error);
  });
