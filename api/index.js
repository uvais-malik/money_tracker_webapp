const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Replace with your actual MongoDB Atlas URI — localhost won't work on Vercel
mongoose.connect('mongodb+srv://newjuni1234:admin123@cluster0.21xdgaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/api/add", (req, res) => {
  const { category_select, amount_input, info, date_input } = req.body;

  const data = {
    Category: category_select,
    Amount: amount_input,
    Info: info,
    Date: date_input
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      return res.status(500).send("Database insert error");
    }
    console.log("Record Inserted Successfully");
    return res.status(200).send("Record inserted");
  });
});

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": '*'
  });
  return res.redirect("/index.html");
});

module.exports = {
  handler: serverless(app)
};
