require("dotenv").config();
const expressApp = require("express")();
const server = require("http").Server(expressApp);
const next = require("next");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const uid = require("uid-safe");
const io = require("socket.io")(server);
const axios = require("axios");
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

io.on("connection", socket => {
  socket.on("updateRoom", data => {
    axios.post("/api/room/update", data).then(resp => {
      if (resp.data.msg) console.log(resp.data.msg);
    });
    socket.broadcast.emit("updateRoom", data);
  });
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  //const server = express();

  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 //24h
    },
    resave: false,
    saveUninitialized: true
  };
  expressApp.use(session(sessionConfig));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  loginStrategy(passport);

  expressApp.use(passport.initialize());
  expressApp.use(passport.session());
  expressApp.use(authRoutes(passport));
  expressApp.use(gameRoutes());
  expressApp.use(roomRoutes());

  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  expressApp.use("/profile", restrictAccess);
  expressApp.use("/room/*", restrictAccess);
  expressApp.use("/create-room", restrictAccess);
  expressApp.use("/join-room", restrictAccess);
  expressApp.use("/to-room", restrictAccess);

  expressApp.get("*", handle);

  server.listen(process.env.PORT, () =>
    console.log(`Listening on ${process.env.PORT}`)
  );
});
