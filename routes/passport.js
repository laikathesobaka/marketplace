const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../controllers/user");
const config = require("config");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.getUserByID(id);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      let userRes;
      try {
        userRes = await User.authenticateUser(email, password);
      } catch (err) {
        return done(err);
      }
      if (!userRes) {
        return done(null, false, { message: "Invalid email or password" });
      }
      return done(null, userRes);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("Store.google.clientID"),
      clientSecret: config.get("Store.google.clientSecret"),
      callbackURL: config.get("Store.google.callbackURL"),
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOrCreateGoogleID(profile);
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

module.exports = passport;
