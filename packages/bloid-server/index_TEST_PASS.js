import { BloidTemplate } from 'bloid-template'
export { BloidServer}
import { BloidRealtime } from 'bloid-realtime'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// import getPort, {portNumbers} from 'get-port';
import getPort from 'get-port';
const open = require('open');



// passport
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });


//passport
    app.use(sessionMiddleware);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('./public/'));


const DUMMY_USER = {
  id: 1,
  username: "john",
};



passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "john" && password === "doe") {
      console.log("authentication OK");
      return done(null, DUMMY_USER);
    } else {
      console.log("wrong credentials");
      return done(null, false);
    }
  })
);

app.get("/", (req, res) => {
  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    console.log(`user is authenticated, session is ${req.session.id}`);
  } else {
    console.log("unknown user");
  }
  res.sendFile(isAuthenticated ? "./public/index.html" : "./public/login.html", { root: __dirname });
});


//  app.use(express.static('./public/'));
// // app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   // res.sendFile('./public/index.html');
//   res.sendFile('./public/index.html');
// });


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.post("/logout", (req, res) => {
  console.log(`logout ${req.session.id}`);
  const socketId = req.session.socketId;
  if (socketId && io.of("/").sockets.get(socketId)) {
    console.log(`forcefully closing socket ${socketId}`);
    io.of("/").sockets.get(socketId).disconnect(true);
  }
  req.logout();
  res.cookie("connect.sid", "", { expires: new Date() });
  res.redirect("/");
});

passport.serializeUser((user, cb) => {
  console.log(`serializeUser ${user.id}`);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log(`deserializeUser ${id}`);
  cb(null, DUMMY_USER);
});

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);


class BloidServer extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'server',
      ...options
    };
    super(options)
    this.core.socket = new BloidRealtime({core: this.core, server:server})
let io = this.io = this.core.io


io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'))
  }
});

io.on('connect', (socket) => {
  console.log(`new connection ${socket.id}`);
  socket.on('whoami', (cb) => {
    cb(socket.request.user ? socket.request.user.username : '');
  });

  const session = socket.request.session;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();
});

    //  app.use(express.static('./public/'));
    // // app.use(express.static('./public'));
    // app.get('/', (req, res) => {
    //   // res.sendFile('./public/index.html');
    //   res.sendFile('./public/index.html');
    // });

    this.listen()
    //console.log(this.core)
  }

  async listen(){
    // this.port = await getPort({port: portNumbers(3000, 3100)})
    this.port = await getPort({port: [5000, 5001, 5002]})
    server.listen(this.port, () => {
      console.log('server running at localhost:'+this.port);
      console.log('1. First time client install: `npm run client:install`')
      console.log('2. later client update: `npm run client:update`');
      open('http://localhost:'+this.port);
    });
  }
}
