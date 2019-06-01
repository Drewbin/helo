const path = require('path');
require('dotenv').config({ path : path.join(__dirname, '.env' )});
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const LocalStrategy = ('passport-local').Strategy;

const controller = require('./controller');

const app = express ();


//Middleware
let dbPromise;

function useDb() {
    return function useDbMiddleWare( req, res, next ) {
        if (!dbPromise) {
            dbPromise = getDb();
        }

        dbPromise.then(dbInstance => {
            req.db = dbInstance;

            next();
        }).catch( err => {
            console.error(err);
            res.status(500).send({ message: 'DB not connected!' });
            dbPromise = null;
        });
    };
}

function getDb() {
    return massive(process.env.DB_CONNECTION_STRING, { scripts: path.join(__dirname, 'db')});
}

//Misc
app.use(useDb());
app.use(cors());
app.use(bodyParser.json());


//Session setup
app.use(sessions({
    saveUninitialized: false, 
    resave: false, 
    secret: "I'll never tell!"
}));

//Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new LocalStrategy(function (username, password, done) {
    if(username.length === 0 || password.length === 0) {
        return done(null, false, { message: 'Username and password required.' });
    }

    const db = app.get('db');

    db.users.find({ username }).then(userInfo => {
        const user = userInfo[0];
        delete user.password;
        done(null, user);
    }).catch(err => {
        console.error(err.message);
    })
}));

passport.use('register', new LocalStrategy(function (username, password, done) {
    if (username.length === 0 || password.length === 0 ) {
        return done(null, false, {message: 'Username and password required.'});
    }

    const db = app.get('db');
    const hashedPassword = bcrypt.hashSync(password, 15);

    db.users.find({username}).then(userInfo => {
        if( userInfo.length > 0 ) {
            return done(null, false, {message: 'Username unavailable'});
        }
        return db.create_user([username, hashedPassword]);
    }).then((user) => {
        const newUser = user[0];
        delete newUser.password;
        done(null, newUser);
    }).catch(err => {
        console.error(err.message)
    })
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});


// Auth Endpoints
app.post('/api/auth/register', passport.authenticate('register'), (req, res) => {
    req.session.userid();
    return res.send({ message: 'Registration complete!', user: req.user });
});

app.post('/api/auth/login', passport.authenticate('login'), (req, res) => {
    req.session.userid();
    return res.send({ message: 'Authentication successful!', user: req.user });
});

app.,post('/api/auth/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
});


//Api Endpoints
app.get('/api/posts/:id', controller.getOne);
app.get('/api/posts', controller.getAll);
app.post('/api/posts', controller.create);
app.put('/api/posts/:id', controller.edit);
app.delete('/api/posts/:id', controller.delete);
app.get('/api/auth/me', controller.login);




let PORT = 4000;
app.listen(PORT, () => {
    console.log( `Server listening on port: ${PORT}` );
})