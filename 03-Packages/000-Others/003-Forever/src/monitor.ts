import * as foreverMonitor from 'forever-monitor';

var child = new foreverMonitor.Monitor('dist/index.js', {
    max: 3,
    silent: false,
    args: []
});

child.on('start', function () {
    console.log('starting script index.js');
});

child.on('exit', function () {
    console.log('index.js has exited after 3 restarts');
});

child.start();