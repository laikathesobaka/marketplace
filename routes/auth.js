const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../controllers/user");

const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ authenticated: false });
};

router.get("/authenticated", isAuthenticated, async (req, res, next) => {
  res.send({ ...req.user, authenticated: true });
});

router.post("/signin", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    req.login(user, async (err) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(user);
    });
  })(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let userExistsRes;
  try {
    userExistsRes = await User.getUserByEmail(email);
  } catch (err) {
    throw err;
  }

  if (userExistsRes) {
    res.status(400).send({ alreadyRegistered: true, user: userExistsRes });
  }
  let registerRes;
  try {
    registerRes = await User.createUser(firstName, lastName, email, password);
  } catch (err) {
    throw err;
  }
  res.status(200).send(registerRes);
});

router.get("/signout", async (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
