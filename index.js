require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./db/models");

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["authorization"],
};

app.use(cors(corsOption));
app.use("/", require("./app/app"));
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const setPort = process.env.PORT || 5001;

sequelize
  .authenticate()
  .then(() => {
    app.listen(setPort, () => {
      console.log(`Rent Potential on port number ${setPort}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
