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

const DBName = "hashtags";

/** SQL Database connection */
const db = new sqlite3.Database(`./${DBName}.db`, err => {
  if (err) return console.error(err.message);
  console.log(`Connected to the "${DBName}" SQlite database.`);
});


app.get("/coords", (req, res) => {
  res.send([{
    title: 'title1',
    lat: 123,
    lng: 123,
  },
  {
    title: 'title1',
    lat: 123,
    lng: 123,
  }])
})

app.post("/generated", (req, res) => {
  const mainCategories = req.body.mainCategories;
  const subCategories = req.body.subCategories;
  const captionStyle = req.body.document;

  const sqlSelect = `SELECT ${subCategories} FROM ${mainCategories} ORDER BY RANDOM() LIMIT 30`;
  /** Select all values from database using SQL statement initialized above */

  db.all(sqlSelect, (err, generatedText) => {
    let list = [];
    /** Append each value to array */
    generatedText.forEach(row => {
      list.push(row[`${subCategories}`]);
    });
    /** Convert array to string */
    let hashtags = String(list);
    /** Replace comma ',' with new line '\n' */
    hashtags = hashtags.replace(/,/g, "\n");
    /** Declare data to be used/rendered */
    const data = {
      hashtags: hashtags,
      captionStyle: captionStyle
    };
    res.render("generated", { locals: data });
  });
});
