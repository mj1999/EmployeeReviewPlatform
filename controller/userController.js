const User = require("../model/users");
const Reviews = require("../model/reviews.js");
module.exports.createUser = async function (req, res) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { eid: req.body.eid }],
    });

    if (!user) {
      const newUser = await User.create(req.body);
      if (req.xhr) {
        const employees = await User.find({ _id: { $ne: req.user.id } });
        res.status(200).json({
          data: { newUser, employees },
          message: "New employee added , default password is 'password'",
        });
      } else {
        req.flash("success", `User ${req.body.name} created successfully`);
        res.redirect("/auth/login");
      }
    } else {
      if (req.xhr) {
        res.status(500).json({
          message:
            "Error adding employee, Try using different credentials, employee already exists",
        });
        return;
      }
      req.flash(
        "error",
        "User by this email-address/employee ID already exists, if logging in for the first time try using default password : 'password' to login to your account"
      );
      res.redirect("back");
    }
  } catch (err) {
    if (req.xhr) {
      res.status(500).json({
        message:
          "Error adding employee, Make sure all fields are filled properly : ",
      });
      return;
    }
    req.flash("error", "Make sure all the fields are filled properly");
    console.log(err);
    res.redirect("back");
  }
};

module.exports.employeeView = async function (req, res) {
  try {
    const employees = await User.find({ _id: { $ne: req.user.id } });
    res.render("employees", { employees });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.toggleStatus = async function (req, res) {
  try {
    const employee = await User.findById(req.body.id);
    employee.admin = !employee.admin;
    employee.save();
    res.status(200).json({
      data: { employee },
      message: "Employee status updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating employee status, Internal Server Error",
    });
    console.log(err);
  }
};

module.exports.remove = async function (req, res) {
  try {
    const employee = await User.findByIdAndDelete(req.body.id);
    await Reviews.deleteMany({$or:[{reviewer: req.body.id},{reviewee: req.body.id}]});
    res.status(200).json({
      data: { id: req.body.id },
      message: "Employee removed from the db",
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Error deleting employee, Internal Server Error",
    });
    console.log(err);
  }
};
