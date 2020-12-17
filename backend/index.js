'use strict'

/** Express module configurations */
const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

/** Sqlite3 module configurations */
const sqlite3 = require("sqlite3").verbose();

const DBName = "data";

/** SQL Database connection */
const db = new sqlite3.Database(`./${DBName}.db`, err => {
  if (err) return console.error(err.message);
  console.log(`Connected to the "${DBName}" SQlite database.`);
});


app.get("/api/pins", (req, res) => {
  const sqlSelect = `SELECT * FROM pins`;

  db.all(sqlSelect, (err, data) => {
    res.send(data);
  });
});