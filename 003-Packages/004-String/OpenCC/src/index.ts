import * as nodeOpencc from 'node-opencc';
import { OpenCC } from 'opencc';
import { simplecc } from "simplecc-wasm";

const testText = '这个鼠标，这个小丑丑归丑发财了去植发';

const openCC = (text: string) => {
    console.log('\nOpenCC');

    let start = new Date();

    let converter = new OpenCC('s2twp.json');
    let result = converter.convertSync(text);

    let end = new Date();

    console.log(`Before: ${text}\nAfter: ${result}\nSpand: ${end.getTime() - start.getTime()} ms\n`);
}

const nodeOpenCC = (text: string) => {
    console.log('\nNode OpenCC');

    let start = new Date();

    let result = nodeOpencc.simplifiedToTaiwanWithPhrases(text);

    let end = new Date();

    console.log(`Before: ${text}\nAfter: ${result}\nSpand: ${end.getTime() - start.getTime()} ms\n`);
}

const simpleCC = (text: string) => {
    console.log('\nSimpleCC');

    let start = new Date();

    let result = simplecc(text, "s2twp");

    let end = new Date();

    console.log(`Before: ${text}\nAfter: ${result}\nSpand: ${end.getTime() - start.getTime()} ms\n`);
}

openCC(testText);
nodeOpenCC(testText);
simpleCC(testText);