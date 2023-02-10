'use strict'
require('./lib/EasyJS.js');                                     // Include Module
var EzJava = require('./lib/EasyJS.js');                        // Include Module
var MessageListener = require('./hubot-message-listener.js');   // Include Module
var Conversation = require('hubot-conversation');               // Include Module
var JenkinsJobQueue = require('./lib/JenkinsJobQueue.js');      // Include Module
var ResultFormatter = require('./lib/JenkinsResultFormat.js');  // Include Module

module.exports = function(robot){
    // New hubot conversation
    var SwitchBoard = new Conversation(robot);
    
    // Jenkins open dialog
    robot.respond(/(jenkins|Jenkins)$/, function(response) {
        // Reply
        response.reply("您好，下列是關於Jenkins的相關服務，請問您想執行哪一個服務：\n build <專案名稱> - 建置一個專案\n list - 顯示所有專案");
        
        // Start conversation
        JenkinsRequestDialog(response);
    });

    // Jenkins conversation
    var JenkinsRequestDialog = function (response) {
        // First Dialog
        var firstDialog = SwitchBoard.startDialog(response);

        // Choice 1 : "jenkins build"
        firstDialog.addChoice(/build (.*)/, function (responseBuild) {
            var parser = new MessageListener.MessageResponse(responseBuild);
            var message = parser.getMessage().Text;
            
            // Get project name
            var projectName = JenkinsJobQueue.JenkinsJobMap.getProjectNameByHubot(message, "build", parser.getRobotName());
            
            // Check project name
            if(projectName.isEmpty()) {
                responseBuild.reply("請輸入正確的專案名稱");
                
                // Continue conversation
                JenkinsRequestDialog(response);
                return;
            }

            // Create jenkins job object
            var userInfo = parser.getUserInfo();
            var job = {
                ProjectName: projectName,
                UserId: userInfo.Id,
                TeamId: userInfo.TeamId,
                Name: userInfo.Name,
                RealName: userInfo.RealName,
                Message: message,
                Room: userInfo.Room,
                StartDate: Date.now().toString("YYYY-MM-DD HH:mm:ss")
            }

            // Push jenkins job object
            var jobQueue = new JenkinsJobQueue.JenkinsJobMap(responseBuild.robot);
            jobQueue.pushJob(projectName, job);

            // Jenkins build
            robot.jenkins.build(responseBuild, false);

            // Continue conversation
            JenkinsRequestDialog(response);
        });

        // Choice 2 : "jenkins list"
        firstDialog.addChoice(/list/, function (responseList) {
            // Jenkins list
            robot.jenkins.list(responseList);

            // Continue conversation
            JenkinsRequestDialog(response);
        });
    }

    // Jenkins notify callback
    robot.router.post("/hubot/jenkins/notify", function(request, response) {
        // Define jenkins phase
        var JenkinsPharseEnum = { Started : "STARTED", Completed: "COMPLETED", Finalized : "FINALIZED" };

        // Parser Jenkins Build Result
        var formatter = new ResultFormatter.JenkinsResultFormat(request.body);
        var projectName = formatter.projectName;
        var phase = formatter.phase;

        // Get room id
        var roomId = getRoomId(robot, request, projectName);

        switch(phase) {
            case JenkinsPharseEnum.Finalized:
                // Pop jenkins job
                var jobQueue = new JenkinsJobQueue.JenkinsJobMap(robot);
                if(!jobQueue.isJobEmpty(projectName)) {
                    jobQueue.popJob(projectName);
                }

                // Console log
                var message = String.format("-------------------------\nProject : {0}\nBuild Number : {1}\nPhase : {2}\nStatus : {3}\n-------------------------", 
                    formatter.projectName, 
                    formatter.buildName, 
                    formatter.phase, 
                    formatter.status);
                console.log(message);
            case JenkinsPharseEnum.Started:

                // Send message to IM
                for(var i=0; i<roomId.length; i++) {
                    robot.messageRoom(roomId[i], formatter.toSlackFormat());
                }
                
                // End
                response.end("Success");
                break;
            default:
                // End
                response.end(String.empty());
                return;
        }

        /**
         * Get Room Id
         * @param {object} robot
         * @param {object} request
         * @param {String} ProjectName
         * @returns {Array}
         */
        function getRoomId(robot, request, projectName) {
            var roomId = Array.empty();
            
            var jobQueue = new JenkinsJobQueue.JenkinsJobMap(robot);
            if(jobQueue.isJobEmpty(projectName)) {
                // Get room id from url query
                if(request.query.room) {
                    // room
                    roomId.addRange((request.query.room).split(','));
                }
                if(request.query.user) {
                    // user
                    var users = request.query.user.split(',');
                    for(var i=0; i<users.length; i++) {
                        var user = users[i];
                        var userRoom = robot.adapter.client.rtm.dataStore.getDMByName(user);
                        roomId.add(userRoom.id);
                    }
                }
            }
            else {
                // Get room id from robot brain
                var jobInfo = jobQueue.peekJob(projectName);
                roomId.add(jobInfo.Room);
            }
            return roomId;
        }

    });
}