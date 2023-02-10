import * as Chokidar from 'chokidar';
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
const watch = Chokidar.watch(fullPath);
watch.on('change', (filename, stats) => {
	console.log(`File Watcher : ${filename} \n`);
});