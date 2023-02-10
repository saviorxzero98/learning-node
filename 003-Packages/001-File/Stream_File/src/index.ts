import FS = require('fs');
import Path = require('path');

// Show Current Path
const fullPath = Path.join(__dirname, "../data");
console.log(fullPath);

// File Full Path
const dataFullPath = Path.join(fullPath, "streamData.json");
const data2FullPath = Path.join(fullPath, "streamData2.json");

// Create Stream
var sourceFile = FS.createReadStream(dataFullPath); 
var destinationFile = FS.createWriteStream(data2FullPath); 

// Read Stream
var count = 1
sourceFile.on('data', function(chunk) {
	// Write Stream
	destinationFile.write(chunk); 
	console.log(`Do Read/Write Stream (Part ${count++})`);
}); 
sourceFile.pipe(destinationFile);
