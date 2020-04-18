const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/CreditSelection");
require("./models/Order");
require("./models/Post");
require("./models/Product");
require("./models/User"); //add use schema before using it in ./services/passport.js
require("./models/UserVerify");
require("./services/passport"); //not assigned to a variable since we need this to run only once
if (!(process.env.NODE_ENV === "production")) {
  require("./webhooks/ngrok"); //use ngrok in development
}

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes/authRoute")(app);
require("./routes/authRoutes/authRouteFacebook")(app);
require("./routes/authRoutes/authRouteGithub")(app);
require("./routes/authRoutes/authRouteGoogle")(app);
require("./routes/authRoutes/authRouteLocal")(app);
require("./routes/authRoutes/authRouteTwitter")(app);
require("./routes/billingRoutes")(app);
require("./routes/mojangRoutes")(app);
require("./routes/postRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/profileRoutes")(app);

const path = require("path");
//Express will serve up production assets like main.css and main.js files
app.use(express.static(path.join(__dirname, "client/build")));

//Express will serve up the index.html file if it does not recognize the route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//utils
require("./utils/initProducts")();
