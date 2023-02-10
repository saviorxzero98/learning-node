import FS = require('fs');
import Path = require('path');

// Show Path
console.log("Show __dirname Path: ", __dirname);			// 目前JS的目錄
console.log("Show __filename Path:", __filename);			// 目前JS的檔案
console.log("Show process.cwd() Path:", process.cwd());		// 執行Node的目錄
console.log("\n\n");

// Show Current Path
const fullPath = Path.join(__dirname, "../data");
console.log(fullPath);

// File Full Path
const dataFullPath = Path.join(fullPath, "data.json");
const data2FullPath = Path.join(fullPath, "data2.json");

// File Watcher
const watcher = FS.watch(fullPath);
watcher.on('change', (event, filename) => { 
	console.log(`File Watcher : ${event} on file : ${filename}\n`);
});


// Read File (Async)
FS.readFile(dataFullPath, (err, data) => { 
	console.log(`Read File (Async) ${dataFullPath}\n${data}\n`);

	// Write File (Async)
	FS.writeFile(data2FullPath, data, (err) => { 
		console.log(`Write File (Async) : ${data2FullPath}\n`);
	});
});

// Parse Path
const parts = Path.parse(dataFullPath);
console.log(`Show File Info : \n`, parts);
console.log(`\n`);

// Read File (Sync)
const data = FS.readFileSync(dataFullPath);
console.log(`Read File (Sync) : \n ${data}\n`);

// File Stats (Async)
FS.stat(dataFullPath, (err, stats) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log(stats);
	}
});
FS.stat(data2FullPath, (err, stats) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log(stats);
	}
});

const fileStats = FS.statSync(dataFullPath);
const file2Stats = FS.statSync(data2FullPath);
console.log(fileStats);
console.log(file2Stats);

// Get Flie List
let fileList = FS.readdirSync(fullPath);
console.log(`File List: ${fileList.toString()}`);

FS.readdir(fullPath, (err, data) => {
	console.log(`File List (Async): ${data.toString()}`);
});