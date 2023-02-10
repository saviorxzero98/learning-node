"use strict";
/**
 * 1. JSON 引號
 **/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 2. JSON.stringify 優化
 **/
/**
 * 3. Array.flat、Array.flatMap
 **/
let demoArrayFlat = () => {
    var array = [1, 2, [3, 4], 5, , 7];
    console.log(array.flat());
};
// Demo
exports.demoES10 = () => {
    // 3. Array.flat、Array.flatMap
    demoArrayFlat();
};
//# sourceMappingURL=es10.js.map