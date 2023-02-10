"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrientDB = require("orientjs");
OrientDB.OrientDBClient.connect({
    host: 'localhost',
    port: 2424,
}).then(client => {
    client.session({ name: "graphdb", username: "gss", password: "25867890" })
        .then(session => {
        let result = session.query('g.V().hasLabel("部門").count()');
        return session.close();
    });
}).then(() => {
    console.log("Client closed");
});
/*let server = OrientDB({
    host:       'localhost',
    port:       2424,
    username:   'root',
    password:   '25867890'
 });

let db: OrientDB.ODatabase = server.use('graphdb');

db.open()
  .then(() => {
      db.select()
        .from('部門')
        .all()
        .then((result: any) => {
            console.log(result);
        });
  });*/ 
//# sourceMappingURL=oindex.js.map