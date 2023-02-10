import { DateTime } from 'luxon';

// 使用Luxon
let now = DateTime.local();
console.log('[Luxon] Now:', now.toFormat('yyyy年MM月dd日 HH:mm:ss'));

// 使用Date (Pure JavaScript)
let d = new Date();
let datestring = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
console.log('[Date] Now:', datestring);


let parse1 = DateTime.fromFormat('20180810', 'yyyyMMdd');
let parse2 = DateTime.fromFormat('20180810', 'yyyy-MM-dd');

console.log(parse1);
console.log(parse2);

