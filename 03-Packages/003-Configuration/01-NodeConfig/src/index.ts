import Config = require('config');
import Path = require('path');

console.log(`Run Mode: ${Config.get('buildConfig')}\n\n`);

console.log(`Server Setting: `, Config.get('server'));

var filePath = Path.join(__dirname, `${Config.get('appSetting.botConfigPath')}`);
console.log(`Get Bot Config Path: ${filePath}\n\n`);



console.log(`iota Server Setting: `, Config.get('appSetting.iotaServer.channelUrl'));

