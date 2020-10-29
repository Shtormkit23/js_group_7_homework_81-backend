const express = require("express");
const links = require("./app/links");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8001;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
  await mongoose.connect("mongodb://localhost/links", {useNewUrlParser: true});

  app.use("/links", links());

  console.log("Connected to mongoDB");

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(console.log);


