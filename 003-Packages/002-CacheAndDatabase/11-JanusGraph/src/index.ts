import * as gremlin from 'gremlin';
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.traversal;


let hostUrl = '192.168.56.102';
let port = 8182;
let gremlinConnection = `ws://${hostUrl}:${port}/gremlin`;

try {
    const g = traversal().withRemote(new DriverRemoteConnection(gremlinConnection));
}
catch (e) {

}