const passport = require("passport");

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }
  res.render("login");
};
module.exports.register = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }
  res.render("register");
};
module.exports.createSession = function (req, res) {
  if (req.isAuthenticated()) {
    req.flash("success", "Login successfull");
    res.redirect("/");
    return;
  }
  res.redirect("/auth/login");
};
module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return;
    }
    req.flash("success", "Logged out successfully");
  });

  res.redirect("/");
};
