const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'nodej'
  });

  //connect to database

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connection done");
  });

  //create DB

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE nodej";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Database Created");
    });
  });


  //create table

app.get("/createposttable", (req, res) => {
    let sql =
      "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Posts table crated");
    });
  });
  
  app.get("/addpost1", (req, res) => {
    let post = { title: "Post one", body: "This is body 1" };
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Post 1 added");
    });
  });

  app.get("/addpost2", (req, res) => {
    let post = { title: "Post two", body: "This is body 2" };
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Post 2 added");
    });
  });

  app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("posts fetched");
    });
  });

  app.get("/getpost/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("single post fetched");
    });
  });
  
  app.get("/updatepost/:id", (req, res) => {
    let newTitle = "updated title";
    let sql = `UPDATE posts SET title= '${newTitle}' WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("post updated");
    });
  });

  app.get("/deletepost/:id", (req, res) => {
    let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Post deleted");
    });
  });

app.listen("3000", ()=>{
    console.log("Server good");
});