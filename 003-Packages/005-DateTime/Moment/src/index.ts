import Moment = require('moment');

//Document: http://momentjs.com/

let now = Moment();
let tomorrow = Moment().add(1, 'days').hour(0).minute(0).second(0).millisecond(0);
let day = Moment('1978-8-1', 'YYYY-MM-DD');

console.log('Now:', now.format('YYYY-MM-DD HH:mm:ss'));
console.log('Tomorrow:', tomorrow.format('YYYY-MM-DD HH:mm:ss'));
console.log('Day:', day.format('YYYY-MM-DD HH:mm:ss'));
