'use strict'
require('./EasyJS.js');                                             // Include Module
var MessageListener = require('./../hubot-message-listener.js');    // Include Module

exports.JenkinsJobMap = (function () {

    function JenkinsJobMap(robot) {
        this._robot = robot;
    };

    /**
     * Push jenkins info job
     * @param {String} jobKey
     * @param {Object} job
     */
    JenkinsJobMap.prototype.pushJob = function(jobKey, job) {
        // Get jobs
        var jobList = this.getJobs(jobKey);

        // Add job
        jobList.add(job);

        // Save job to robot brain
        this._robot.brain.set(jobKey, jobList);
    };

    /**
     * Pop jenkins info job
     * @param {String} jobKey
     * @return {Object}
     */
    JenkinsJobMap.prototype.popJob = function(jobKey) {
        // Get jobs
        var jobList = this.getJobs(jobKey);

        if(!jobList.isEmpty()) {
            // Get first job and remove it
            var job = jobList[0];
            jobList.remove(0, 1);
            return job;
        }
        return {};
    }

    /**
     * Peek jenkins info job
     * @param {String} jobKey
     * @return {Object}
     */
    JenkinsJobMap.prototype.peekJob = function(jobKey) {
        // Get jobs
        var jobList = this.getJobs(jobKey);

        if(!jobList.isEmpty()) {
             // Get first job
            var job = jobList[0];
            return job;
        }
        return {};
    }

    /**
     * Get jenkins jobs
     * @param {String} jobKey
     * @return {Array}
     */
    JenkinsJobMap.prototype.getJobs = function(jobKey) {
        // Load job from robot brain
        var jobs = this._robot.brain.get(jobKey);
        return (Array.isArray(jobs))? jobs : Array.empty();
    }

    /**
     * Get jenkins jobs count
     * @param {String} jobKey
     * @return {int}
     */
    JenkinsJobMap.prototype.jobCount = function(jobKey) {
        return this.getJobs(jobKey).length;
    }

    /**
     * Is jenkins jobs empty
     * @param {String} jobKey
     * @return {boolean}
     */
    JenkinsJobMap.prototype.isJobEmpty = function(jobKey) {
        return (this.jobCount(jobKey) == 0);
    }

    /**
     * Get Project Name
     * @param {String} message
     * @param {String} command
     * @param {String} robotName
     */
    JenkinsJobMap.getProjectNameByHubot = function(message, command, robotName) {
        var check = message.indexOf(command);

        if(check !== -1) {
            var projectName = message.replace("@", "").replace(command, "").replace(robotName, "").trim().toString();
            return projectName;
        }

        console.error("Error command");
        return "";
    }

    return JenkinsJobMap;
})();