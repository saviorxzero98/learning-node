import * as domain from 'domain';

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
});

