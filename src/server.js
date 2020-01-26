require("dotenv").config();
const express = require("express");
const next = require("next");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const uid = require("uid-safe");
const authRoutes = require("./routes/auth-routes");
const gameRoutes = require("./routes/game-routes");
const roomRoutes = require("./routes/room-routes");
const User = require("./models/userModel");
const loginStrategy = require("./strategies/login-strategy");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src"
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CON, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 //24h
    },
    resave: false,
    saveUninitialized: true
  };
  server.use(session(sessionConfig));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  loginStrategy(passport);

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes(passport));
  server.use(gameRoutes());
  server.use(roomRoutes());

  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  server.use("/profile", restrictAccess);

  server.get("*", handle);

  server.listen(process.env.PORT, () =>
    console.log(`Listening on ${process.env.PORT}`)
  );
});
