"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("./loggerManager");
let defaultLogger = Logger.getLogger('default', 'marty');
let errorLogger = Logger.getLogger('error');
defaultLogger.info('Log info');
defaultLogger.warn('Warn info');
defaultLogger.debug('Debug info', { a: "xxx", b: "yyy" });
try {
    errorLogger.error('Error info', 'Node JS 測試');
}
catch (e) {
    defaultLogger.error(e);
}
//# sourceMappingURL=index.js.map