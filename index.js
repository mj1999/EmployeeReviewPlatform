const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/db-config");
const layout = require("express-ejs-layouts");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
const session = require("express-session");
const MongoStrore = require("connect-mongo");
const passportStrat = require("./config/passport-local");
const passport = require("passport");

//for decrypting form data
app.use(express.urlencoded());

//static files
app.use(express.static("./assets"));

//layout
app.use(layout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//views and view engine
app.set("view engine", "ejs");
app.set("views", "views");

//session initialisation
app.use(
  session({
    name: "ERP-cookie",
    secret: "erp-pass",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStrore.create({
      mongoUrl: "mongodb://127.0.0.1:27017",
      autoRemove: "disabled",
    }),
  })
);

//passport initialisation
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);

//flash messages initialisation
app.use(flash());
app.use(customMiddleware.setFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
    return;
  }
  console.log("Server started on port:", port);
});
