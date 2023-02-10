import * as gremlin from 'gremlin';
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.traversal;


let hostUrl = 'localhost';
let port = 8182;
let gremlinConnection = `ws://${hostUrl}:${port}/gremlin`;