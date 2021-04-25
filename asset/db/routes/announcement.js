var express = require('express');
var router = express.Router();
var db = require('../db');
const pg = require('pg');
const config = require('../../config/config');

let connectionString = config.db.connectionString;
const client = new pg.Client(connectionString);
client.connect();

router.post("/add", (req, res) => {
    try {
      var sql = "SELECT * FROM  announcement_insert('[" + JSON.stringify(req.body) + "]')"
        client.query(sql)
            .then(() => res.status(200).json({
                message: "User Created Successfully",
                status: 200
            }))
            // .catch(err => res.status(500).json({
            //     message: err,
            //     status: 500
            // }))
    } catch (e) {
      console.log(dateFormat + " " + "DB NOT CONNECTED");
      console.log(e);
    }
  });

  router.post('/getAll', (req, res) => {
    try {
        var sql = "SELECT * FROM announcement_getAll  ('" + JSON.stringify(req.body) + "'::jsonb);"
        client.query(sql)
            .then(users => res.status(200).send(users.rows))
            .catch(err => res.status(400).send(err))
    } catch (e) {
        console.log(e)
    }
});





module.exports = router;