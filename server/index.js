const path = require('path');
require('dotenv').config({ path : path.join(__dirname, '.env' )});
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const massive = require('massive');

const controller = require('./controller');

const app = express ();

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
    return massive(proces.env.DB_CONNECTION_STRING, { scripts: path.join(__dirname, 'db')});
}

app.use(useDb);

app.use(cors());
app.use(bodyParser.json());


let PORT = 4000;
app.listen(PORT, () => {
    console.log( `Server listening on port: ${PORT}` );
})