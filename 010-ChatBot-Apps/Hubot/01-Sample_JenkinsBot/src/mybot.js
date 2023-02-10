'use strict'
require('./lib/EasyJS.js');
var EzJava = require('./lib/EasyJS.js');
var MessageListener = require('./hubot-message-listener.js');

module.exports = function(robot){

    robot.respond(/hello|Hello|Hi|hi|你好/, function(response){
		var parser = new MessageListener.MessageResponse(response);
        var user = parser.getUserInfo();
        var consoleMessage = parser.getRobotName();
        var replyMessage = parser.getMessage().RealText + " " + user.Name + ".";
        console.log(consoleMessage + " " + replyMessage);
        response.reply(replyMessage);
    });

	robot.respond(/showenv (.*)/, function(response) {
		var content = response.match[1];
		console.log(content + ":" + process.env[content] );
		response.send(content + ":" + process.env[content] );
	});
		
	robot.respond(/repeat (.*)/, function(response) {
		var content = response.match[1];
		response.send(content);
	});

	robot.router.post("/gsstdd1/message", function(request, response) {
		var message = (request.body.payload && request.body.payload.message_text)? request.body.payload.message_text : "";
		var content = "Received Http Post Request\n";
		content += "HTTP Verb: POST\n";
		content += "Host:" + request.headers.host + "\n";
		content += "Url:" + request.url + "\n";

		console.log(content);
		console.log(request.body);

		if(request.query.room) {
			robot.messageRoom(request.query.room, message);
		}
		if(request.query.user) {
			var user = robot.adapter.client.rtm.dataStore.getDMByName(request.query.user);
			robot.messageRoom(user.id, message);
		}
		response.end(content);
	});

	robot.catchAll(function(response) {
		console.log(response.message.text);
	});
}