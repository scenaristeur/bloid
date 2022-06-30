import { BloidTemplate } from 'bloid-template'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export { BloidUser }

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('./database.sqlite3-users');

const creation_req = `CREATE TABLE IF NOT EXISTS "users" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "username" TEXT,
  "password" TEXT, -- sha256 hash of the plain-text password
  "salt" TEXT -- salt that is appended to the password before it is hashed
)`

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

passport.use(new LocalStrategy(function(username, password, done) {
  db.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
    db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});

class BloidUser extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'bloidUser',
      ...options
    };
    super(options)
    // console.log("config", this.name, this.base)
    console.log("core type test = ", this.core.type)

    db.run(creation_req);
  }
}

//   login(params){
//     console.log("login db", params)
//     passport.authenticate('local', function (err, account) {
//     req.logIn(account, function() {
//         res.status(err ? 500 : 200).send(err ? err : account);
//     });
// })(this.req, this.res, this.next);
//     //  { successRedirect: '/good-login',
//     // failureRedirect: '/bad-login' }
//   );
//
// }
//
// logout(params){
//   console.log("logout db", params)
// }
//
// }
//
// function callback(e, u, i) {
//   console.log("cb")
//   error = e;
//   user = u;
//   info = i;
//   console.log(error,user, info)
//   done();
// }
