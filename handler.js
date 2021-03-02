"use strict";
const db = require("./module/db");
const template = require("./module/template");

module.exports.main = async (event, context) => {
  //console.log(event);
  if (event.path === "/index" && event.httpMethod === "GET") {
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

          const response = {
            statusCode: 200,
            body: JSON.stringify(list),
          };
          return response;
        }
      );
    }
  }

  if (
    event.pathParameters &&
    event.pathParameters.id &&
    event.httpMethod === "POST"
  ) {
    let id = event.pathParameters.id;
    let list = "";
    db.query(
      `SELECT * FROM student WHERE class_id = ?`,
      [id],
      (err, students) => {
        if (err) throw err;
        for (let i = 0; i < students.length; i++) {
          list =
            list +
            `학생 id : ${students[i].id}, 학생 이름 : ${students[i].name}, 나이 : ${students[i].age}\n`;
        }
        console.log(list);
      }
    );
  }
};
