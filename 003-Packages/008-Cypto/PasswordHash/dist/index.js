"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
let runHashSample = (password, saltRounds) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Plain text: ${password}`);
    let salt = yield bcrypt.genSaltSync(saltRounds);
    let hash = yield bcrypt.hashSync(password, salt);
    console.log(`Hash text: ${hash}`);
});
let runVerfiySample = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    let isPass = yield bcrypt.compareSync(password, hash);
    console.log(`Is pass: ${isPass}`);
});
const passwordPlainText = '123456789';
runHashSample(passwordPlainText, 11)
    .then(() => {
    runVerfiySample(`123456789`, `$2b$11$vwnX7VXsvCQKiRfvj2NzDOdFEuRUNt3CVmMqF1Enm1zHCPIyvjHIC`);
});
//# sourceMappingURL=index.js.map