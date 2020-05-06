const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
import { v4 as uuidv4 } from "uuid";
const FileStore = require("session-file-store")(session);
const passport = require("./routes/passport");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware");
      return uuidv4();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
