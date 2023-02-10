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
const domain = require("domain");
// 建立 domain
let d = domain.create();
// 註冊 Uncaught Exception
d.on('error', (e) => {
    console.warn('Uncaught Exception:');
    console.error('There was an uncaught error', e);
});
// 所有的處理都需要在 domain 裡
d.run(() => {
    // Demo Sync
    let errorFunction = () => {
        throw new Error("error function");
    };
    errorFunction();
    //======================================================
    // Demo Async
    let errorFunctionAsync = () => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error("error function");
    });
    let demoAsync = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield errorFunctionAsync();
    });
    demoAsync().catch(e => {
        console.warn('Catch Exception');
        console.error('There was an exception', e);
    });
});
//# sourceMappingURL=index.js.map