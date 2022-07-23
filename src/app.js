const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
require("./database");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");

const PORT = 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });

  user.save((err) => {
    if (err) {
      res.status(500).send("ERROR AL REGISTRO");
    } else {
      res.status(200).send("USUARIO REGISTRADO");
    }
  });
});

app.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send("ERROR AUTH");
    } else if (!user) {
      res.status(500).send("USUARIO NO EXISTE");
    } else {
      user.isCorrectPassword(password, (err, result) => {
        if (err) {
          res.status(500).send("ERROR AL AUTH");
        } else if (result) {
          res.status(200).send("USUARIO AUTH CORRECTAMENTE");
        } else {
          res.status(500).send("USUARIO Y/O CONTRASEÑA INCORRECTA");
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});
