"use strict";
const db = require("./module/db");
const template = require("./module/template");
const qs = require("querystring");
// const express = require("express");
// const app = express();

// app.use(express.json());

module.exports.main = async (event, context, callback) => {
  // console.log(event);
  if (event.path === "/class" && event.httpMethod === "GET") {
    if (event.queryStringParameters === null) {
      let list = "";
      db.query(`SELECT * FROM class`, (err, cla) => {
        if (err) throw err;
        for (let i = 0; i < cla.length; i++) {
          list =
            list +
            `반 id : ${cla[i].id}, 반 이름 : ${cla[i].class_name}, 선생님 : ${cla[i].teacher}\n`;
        }
        console.log(list);
        const response = {
          statusCode: 200,
          body: JSON.stringify(list),
        };
        return response;
      });
    } else {
      let queryData = event.queryStringParameters;
      let list = "";
      db.query(
        `SELECT * FROM student WHERE class_id = ?`,
        [queryData.id],
        (err, students) => {
          if (err) throw err;
          for (let i = 0; i < students.length; i++) {
            list =
              list +
              `학생 id : ${students[i].id}, 학생 이름 : ${students[i].name}, 나이 : ${students[i].age}\n`;
          }
          console.log(list);

          return {
            statusCode: 200,
            body: students[0].name,
          };
        }
      );
    }
  }

  if (event.path === "/class/create" && event.httpMethod === "POST") {
    let post = JSON.parse(event.body);
    if ("class_name" in post && "teacher" in post) {
      db.query(
        `INSERT INTO class (class_name, teacher) VALUES(?, ?)`,
        [post.class_name, post.teacher],
        (err, result) => {
          if (err) throw err;
          console.log("Insertion is done");
        }
      );
    }
  }

  if (event.path === "/class/update" && event.httpMethod === "POST") {
    if (event.queryStringParameters != null) {
      let post = JSON.parse(event.body);
      if ("id" in post && "teacher" in post && "class_name" in post) {
        db.query(
          `UPDATE class SET class_name=?, teacher=? WHERE id=?`,
          [post.class_name, post.teacher, post.id],
          (err, result) => {
            if (err) throw err;
            console.log("Update is done");
          }
        );
      }
    }
  }

  if (event.path === "/class/delete" && event.httpMethod === "DELETE") {
    if (event.queryStringParameters) {
      db.query(
        `DELETE FROM student WHERE class_id = ?`,
        [event.queryStringParameters.id],
        (err, result) => {
          if (err) throw err;
          db.query(
            `DELETE FROM class WHERE id = ?`,
            [event.queryStringParameters.id],
            (err2, result) => {
              if (err2) throw err2;
              console.log("delete is complete");
            }
          );
        }
      );
    }
  }

  if (event.path === "/class/create_student" && event.httpMethod === "POST") {
    if (event.queryStringParameters) {
      let post = JSON.parse(event.body);
      if ("name" in post && "age" in post) {
        db.query(
          `INSERT INTO student (name, age, class_id) VALUES(?, ?, ?)`,
          [post.name, post.age, event.queryStringParameters.id],
          (err, result) => {
            if (err) throw err;
            console.log("student created");
          }
        );
      }
    }
  }
};
