const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const User = require("../model/users");

passport.use(
  new LocalStrat(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "Invalid username/password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          req.flash("error", err);
          return done(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => {
      console.log("user not found");
      return done(err);
    });
});
passport.checkAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/auth/sign-in");
};
passport.setAuthUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
