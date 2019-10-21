let express = require('express');
let session = require('express-session');
const proxy = require('express-http-proxy');
var parseurl = require('parseurl');
const router = express.Router();
let app = express();
let fetch = require('cross-fetch');
let passport = require('passport');
let GitHubStrategy = require('passport-github').Strategy;
let { URL } = require('url');
const cors = require('cors');
app.use(cors());
app.use('/vue', proxy('http://localhost:8080/'));

//initialize the current session
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

// 1. PRIVATE KEYS
const GITHUB_CLIENT_ID = "b6a9073d65c4527d5f69";
const GITHUB_CLIENT_SECRET = "8c921ac9a6d68bd493fcdddd70f6acb004e0440b";

//Session things inspired by https://codeforgeek.com/manage-session-using-node-js-express-4/
// This is how Passport keeps track of user sessions / if a login has been successful.
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
/* app.use(function (req, res, next) {
    if (!req.session.pageviews) {
      req.session.pageviews = 0
    }
    else{
        req.session.pageviews 
    }
    next()
  }); */

app.get('/pageviews', function (req, res){
    res.json(req.session);
});
// 3. PASSPORT
// Create github strategy

//Passport information came from piazza
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"  // update URL if you don't use localhost
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}
));

// Configure authenticated session persistence. 
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Initialize and restore authentication state, if any, from the session. This will create a
// new session every time the server is restarted -- so note that you have to restart the
// server for it to detect logouts on an external website (eg. github).µµ
//
// These two lines must come AFTER your call to require('express-session')
app.use(passport.initialize());
app.use(passport.session());

var sess;

// Serve up the original html and js files.
app.get('/',
  require('connect-ensure-login').ensureLoggedIn(), // this is how you require authentication on a route
  (req, res) => {
    sess = req.session;
    if (!req.session.pageviews) {
        req.session.pageviews = 0
      }
    req.session.pageviews++;
    res.redirect('http://localhost:8080/');
    //alert('Congrats ' + req.session.passport.user.username + 'You have visited this page ' + req.session.pageviews + ' times! :D');
   // app.use(express.static('public'));
    // do whatever you want to server the '/' route
    //res.sendFile(__dirname + '/public/index.html')
  });

// Set up the login callbacks.
app.get('/login',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("Successful authentication, redirect home.")
    res.redirect('/');
  });

app.get('/API', require('connect-ensure-login').ensureLoggedIn(), async (req,res) => {
    let paraList = req.query;
    // console.log("WENT THRU");

    let API = paraList['api'];
    delete paraList['api'];
    let url = new URL('https://api.harvardartmuseums.org/' + API + '?apikey=3a942490-d002-11e9-9498-734205a7ab16');
    console.log(url);
    Object.keys(paraList).forEach(key => url.searchParams.append(key, paraList[key]));
    const response2 = await fetch(url);
    const json = await response2.json();
    //json.append({username:sess.passport.user.username, fetchRequests: sess.fetchRequests});
    res.json(json);
});
app.listen(3000, () =>{});