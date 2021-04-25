const {
    Pool, Client
} = require('pg');
const config = require('../config/config')
var path = require("path");
var app = require('express');
var fs = require('fs');
const e = require('express');
const view_po = path.resolve('asset/config/view_po.json');
var maxVolumeArray = [];
var latestVolumeArray = [];
const readFile = (
    callback,
    returnJson = false,
    filePath = view_po,
    encoding = "utf8"
) => {
    fs.readFile(filePath, encoding, (err, datas) => { //to read the probe_param.json file
        if (err) {
            throw err;
        }

        try {
            callback(returnJson ? JSON.parse(datas) : datas)
        } catch (e) {
            console.log(e)
            console.log('Error While Reading probe_param.json File');
        }
    });
};
class DB {
    constructor() {
        this.connectionString = config.db.connectionString;
        this.connect();
        this.alert_file_data;
    }
    connect() {
        try {
            this.pool = new Pool({
                connectionString: this.connectionString
            });
            console.log("db connected");
        } catch (e) {
            console.log(e)
        }
    }

    insert_array_functions(ack_json, sql, res, rtn) {
        try {
            var status;
            var sql_query = "SELECT * FROM " + sql + " ('[" + JSON.stringify(ack_json) + "]')"
            this.pool.connect((err, client, done) => {
                if (err) throw err;
                client.query(sql_query, (err, result) => {
                    done()
                    if (err) {
                        console.log(err)
                        status = "Error"
                    }
                    // res.send(result.rows);
                    status = "OK";

                    rtn(res, status);
                })
            })
            
        } catch (ex) {
            console.log(ex);
        }
    }


    insert_functions(ack_json, sql, res, rtn) {
        try {
            var status;
            var sql_query = "SELECT * FROM " + sql + " ('[" + JSON.stringify(ack_json) + "]')"
            this.pool.connect((err, client, done) => {
                // if (err) throw err;
                client.query(sql_query, (err, result) => {
                    done()
                    if (err) {
                        status = "Error"
                    }
                    else{
                        // res.send(result.rows);
                        status = "OK";
                    }
                    rtn(res, status);
                })
            })
            
        } catch (ex) {
            console.log(ex);
        }
    }

    getAll_datas(ack_json, sql, res, rtn) {
        try {
            var status;
            if (ack_json == "") {
                var sql_query = "select * from " + sql + "();"
            } else {
                var sql_query = "SELECT * FROM " + sql + " ('" + JSON.stringify(ack_json) + "'::jsonb);"
            }

            this.pool.connect((err, client, done) => {
                if (err) throw err;
                client.query(sql_query, (err, result) => {
                    done()
                    if (err) {
                        console.log(err)
                        status = "Error"
                    }
                    res.send(result.rows);
                    
                    status = "OK";

                    rtn(res, status);
                })
            })
        } catch (ex) {
            console.log(ex);
        }
    }
  
    
}



module.exports = DB;