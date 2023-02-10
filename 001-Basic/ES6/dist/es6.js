"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 1. Default Parameters
 * 預設參數
 **/
let demoDefaultParameters = function () {
    console.debug('1.Default Parameters');
    const defaultParametersFunc = function (text = 'hello world') {
        console.info(text);
    };
    defaultParametersFunc();
};
/**
 * 2. Template Literals
 * 字串範本
 **/
let demoTemplateLiterals = function () {
    console.debug('\n2. Template Literals');
    let helloText = 'hello';
    let worldText = 'world';
    let es5TemplateLiterals = 'es5: ' + helloText + ' ' + worldText;
    let es6TemplateLiterals = `es6: ${helloText} ${worldText}`;
    console.info(es5TemplateLiterals);
    console.info(es6TemplateLiterals);
};
/**
 * 3. Multi-line Strings
 * 多行字串
 **/
let demoMultiLineStrings = function () {
    console.debug('\n3. Multi-line Strings');
    let helloText = 'hello';
    let worldText = 'world';
    let es5MultiLineStrings = 'es5: ' + helloText + ' \n' + worldText;
    let es6MultiLineStrings = `es6: ${helloText} 
${worldText}`;
    console.info(es5MultiLineStrings);
    console.info(es6MultiLineStrings);
};
/**
 * 4. Destructuring Assignment
 * 陣列、物件的指派
 **/
let demoDestructuringAssignment = function () {
    console.debug('\n4. Destructuring Assignment');
    const printVariable = (variableName, variable) => {
        console.log(`${variableName} = ${variable}`);
    };
    // 陣列指派
    let [a, b, c] = [1, 2, 3];
    printVariable('a', a);
    printVariable('b', b);
    printVariable('c', c);
    // 物件指派
    let o = { p: 'hello', q: 'world' };
    let { p, q } = o;
    printVariable('p', p);
    printVariable('q', q);
    // 交換指派
    [b, c, a] = [a, b, c];
    [q, p] = [p, q];
    printVariable('a', a);
    printVariable('b', b);
    printVariable('c', c);
    printVariable('p', p);
    printVariable('q', q);
};
/**
 * 5. Spread Operator
 * 陣列、物件的指派
 **/
let demoSpreadOperator = function () {
    console.debug('\n5. Spread Operator');
    const printVariable = (variableName, variable) => {
        console.log(`${variableName} = ${variable}`);
    };
    // 陣列分割
    let [a, b, ...c] = ['1', '2', '3', '4', '5'];
    printVariable('a', a);
    printVariable('b', b);
    printVariable('c', c);
    // 陣列合併
    let abc = [a, b, ...c];
    printVariable('abc', abc);
};
/**
 * 6. Object Literals
 * 縮減物件的縮寫，
 **/
let demoObjectLiterals = function () {
    console.debug('\n6. Object Literals');
    let width = 30;
    let length = 40;
    let height = 50;
    // ES 5 (Before)
    let es5ItemSize = {
        width: width,
        length: length,
        height: height,
        volume: function () { return width * length * height; }
    };
    // ES 6 (After)
    let es6ItemSize = {
        width,
        length,
        height,
        volume() { return width * length * height; }
    };
    console.info(`es5:
    width = ${es5ItemSize.width}; 
    length = ${es5ItemSize.length}; 
    height = ${es5ItemSize.height}; 
    volume = ${es5ItemSize.volume()}
    `);
    console.info(`es6:
    width = ${es6ItemSize.width}; 
    length = ${es6ItemSize.length}; 
    height = ${es6ItemSize.height}; 
    volume = ${es6ItemSize.volume()}
    `);
};
/**
 * 7. Arrow Functions
 **/
let demoArrowFunctions = function () {
    console.debug('\n7. Arrow Functions');
    let width = 30;
    let length = 40;
    let height = 50;
    // ES 5 (Before)
    let es5Func = function (hello, world) {
        console.log(`es5: ${hello} ${world}`);
    };
    es5Func('hello', 'world');
    // ES 6 (After)
    let es6Func = (hello, world) => {
        console.log(`es6: ${hello} ${world}`);
    };
    es6Func('hello', 'world');
};
/**
 * 8. Promise
 **/
/**
 * 9. Let & Const
 **/
let demoLetAndConst = function () {
    if (true) {
        var varVariable = 'var';
        let letVariable = 'let';
        const constVariable = 'const';
    }
    console.log(varVariable);
    //console.log(letVariable);
    //console.log(constVariable);
};
/**
 * 10. Class
 **/
/**
 * 11. Moudle
 **/
// Demo
exports.demoES6 = () => {
    // 1. Default Parameters
    demoDefaultParameters();
    // 2. Template Literals
    demoTemplateLiterals();
    // 3. Multi-line Strings
    demoMultiLineStrings();
    // 4. Destructuring Assignment
    demoDestructuringAssignment();
    // 5. Spread Operator
    demoSpreadOperator();
    // 6. Object Literals
    demoObjectLiterals();
    // 7. Arrow Functions
    demoArrowFunctions();
    // 8. Promise
    // 9. Let & Const
    // 10. Class
    // 11. Moudle
};
//# sourceMappingURL=es6.js.map