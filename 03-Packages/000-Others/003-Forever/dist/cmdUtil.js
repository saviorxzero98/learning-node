"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const foreverBin = path.join(process.cwd(), 'node_modules/forever/bin/forever');
const mainScript = 'dist/index.js';
if (process.argv[2]) {
    let action = process.argv[2].toLowerCase();
    switch (action) {
        case 'start':
        case 'stop':
        case 'restart':
            execForever(mainScript, action);
            break;
        case 'list':
            execForever('', action);
            break;
        case 'help':
        case '--help':
        case '-h':
            let helpInfo = '';
            helpInfo += ' start \t\t Start Service \n';
            helpInfo += ' stop \t\t Stop Service \n';
            helpInfo += ' restart \t Restart Service \n';
            helpInfo += ' logs \t\t Logs Service \n';
            helpInfo += ' list \t\t List Service \n';
            helpInfo += ' help \t\t Help \n';
            console.log(helpInfo);
            break;
        default:
            console.error('Error command');
            break;
    }
}
else {
    console.error('Error command');
}
function execForever(script, action) {
    let shellCommand = `node "${foreverBin}" ${action} ${script}`;
    console.log(`Shell Command : ${shellCommand}`);
    child_process_1.exec(shellCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
    });
}
exports.execForever = execForever;
//# sourceMappingURL=cmdUtil.js.map