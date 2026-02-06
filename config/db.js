const sqlite3 = require("sqlite3");
const path = require("path")
const dbPath = path.join(__dirname,"database.db");

let db = new sqlite3.Database(dbPath,(err) => {
    if(err){
        console.log(`DB Connection Error:${err.message}`)
    }else{
        console.log(`DB Connected Successfully!`)
    }
});

module.exports = db;