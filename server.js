require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const FileStore = require("session-file-store")(session);
const passport = require("./routes/passport");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

console.log("🧚‍♀️", process.env.NODE_ENV);
console.log("🎒", process.env.PORT);
console.log("👑", process.env);
console.log("DIRNAME ", __dirname);
console.log("PATH ------- ", __dirname, "client/build");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Express server is running on port ${PORT}`)
);
