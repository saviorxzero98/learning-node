
// 註冊 Uncaught Exception
process.on('uncaughtException', (e) => {
	console.warn('Uncaught Exception:');
    console.error('There was an uncaught error', e);
    //process.exit(1);
});
process.on('uncaughtException', (e) => {
	console.warn('Uncaught Exception2:');
    //process.exit(1);
});

//======================================================
// Demo Sync
let errorFunction = () => {
	throw new Error("error function");
}
errorFunction();


//======================================================
// Demo Async
let errorFunctionAsync = async (): Promise<string> => {
	throw new Error("error function");
};
let demoAsync = async (): Promise<string> => {
	return await errorFunctionAsync();
};

demoAsync().catch(e => {
	console.warn('Catch Exception');
    console.error('There was an exception', e);
});
