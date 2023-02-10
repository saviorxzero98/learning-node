import * as jieba from 'nodejieba-cht';

const text = '由於颱風假影響，2018年中ISBG組織異動改於下周一(7/16)進行，7/16(一)13:00關閉下列系統，預計於7/16(一)20:00重新開放，若作業提早完成，將另行通知';

let cutResult = jieba.cut(text);
let tagResult = jieba.tag(text);

console.log(cutResult);
console.log(tagResult);
