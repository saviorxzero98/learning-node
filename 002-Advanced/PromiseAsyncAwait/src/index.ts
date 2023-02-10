
async function sleep(time: number): Promise<void> {
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

main();