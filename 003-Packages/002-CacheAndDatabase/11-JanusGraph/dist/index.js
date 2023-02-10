"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gremlin = require("gremlin");
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.traversal;
let jobAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    let hostUrl = '192.168.56.102';
    let port = 8182;
    let gremlinConnection = `ws://${hostUrl}:${port}/gremlin`;
    try {
        const g = traversal().withRemote(new DriverRemoteConnection(gremlinConnection));
        yield g.V()
            .toList()
            .then((result) => {
        });
    }
    catch (e) {
    }
});
jobAsync();
//# sourceMappingURL=index.js.map