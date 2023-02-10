"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrientDB = require("orientjs");
/*
OrientDB.OrientDBClient.connect({
  host: 'localhost',
  port: 2424,
}).then(client => {
  client.session({ name: "graphdb", username: "kg", password: "25867890" })
    .then((session) => {
      let result = session.query('SELECT * FROM V');
      return session.close();
  });
}).then(()=> {
  console.log("Client closed");
});
*/
let server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '25867890'
});
let db = server.use('graphdb');
db.open()
    .then(() => {
    db.select()
        .from('部門')
        .all()
        .then((result) => {
        console.log(result);
    });
});
//# sourceMappingURL=index.js.map