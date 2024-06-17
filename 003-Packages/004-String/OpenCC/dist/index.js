"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeOpencc = require("node-opencc");
const opencc_1 = require("opencc");
const simplecc_wasm_1 = require("simplecc-wasm");
const testText = '这个鼠标，这个小丑丑归丑发财了去植发';
const openCC = (text) => {
    console.log('\nOpenCC');
    let start = new Date();
    let converter = new opencc_1.OpenCC('s2twp.json');
    let result = converter.convertSync(text);
    let end = new Date();
    console.log(`Before: ${text}\nAfter: ${result}\nSpand: ${end.getTime() - start.getTime()} ms\n`);
};
const nodeOpenCC = (text) => {
    console.log('\nNode OpenCC');
    let start = new Date();
    let result = nodeOpencc.simplifiedToTaiwanWithPhrases(text);
    let end = new Date();
    console.log(`Before: ${text}\nAfter: ${result}\nSpand: ${end.getTime() - start.getTime()} ms\n`);
};
const simpleCC = (text) => {
    console.log('\nSimpleCC');
    let start = new Date();
    let result = simplecc_wasm_1.simplecc(text, "s2twp");
    let end = new Date();
    console.log(`Before: ${text}\nAfter: ${result}\nSpand: ${end.getTime() - start.getTime()} ms\n`);
};
openCC(testText);
nodeOpenCC(testText);
simpleCC(testText);
//# sourceMappingURL=index.js.map