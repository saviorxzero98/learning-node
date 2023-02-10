var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
setTimeout(() => {
    console.log(1);
    Promise.resolve()
        .then(() => {
        console.log(2);
    });
}, 100);
setTimeout(() => {
    console.log(3);
    Promise.resolve()
        .then(() => {
        console.log(4);
    });
}, 100);
function printAsync(num) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(num);
    });
}
setTimeout(() => __awaiter(this, void 0, void 0, function* () {
    console.log(5);
    yield printAsync(6);
}), 100);
setTimeout(() => __awaiter(this, void 0, void 0, function* () {
    console.log(7);
    yield printAsync(8);
}), 100);
/*async function sleep(time: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

async function error(num: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        reject(`Error ${num}`);
    });
}


async function main() {
    console.log("Hello");
    await sleep(1000);
    console.log("World!");
    try {
        await error(404);
    }
    catch (e) {
        console.log(e);
    }
    console.log("!");
}

main();*/ 
//# sourceMappingURL=index.js.map