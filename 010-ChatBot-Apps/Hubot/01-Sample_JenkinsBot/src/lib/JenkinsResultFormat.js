'use strict'
require('./EasyJS.js');     // Include Module

exports.JenkinsResultFormat = (function () {

    // Define jenkins pharse
    var JenkinsPharseEnum = { 
        Started : "STARTED", 
        Completed: "COMPLETED", 
        Finalized : "FINALIZED" 
    };

    // Define jenkins status
    var JenkinsStatusEnum = {            
        Aborted: "ABORTED",
        Failure: "FAILURE",
        Fixed: "FIXED",
        StillFailing: "STILL FAILING",
        Success: "SUCCESS"
    }

    function JenkinsResultFormat(jenkinsResult) {
        this.data = jenkinsResult;

        // Get Jenkins Result Info
        this.projectName = this.data.name;
        this.buildName = this.data.build.number;
        this.phase = this.data.build.phase;
        this.status = this.data.build.status;
        this.fullUrl = this.data.build.full_url;
        this.scm = this.data.build.scm;
    }

    JenkinsResultFormat.prototype.toSlackFormat = function () {
        // Define slack color by jenkins status
        var JenkinsColorEnum = {
            Aborted: "warning",
            Failure: "danger",
            Fixed: "#d5f5dc",
            StillFailing: "danger",
            Success: "good",
            Default: "#ffe094"
        };

        // Create content
        var content = { fields: [] };
        content.fields.add({ title: "Phase", value: this.phase, short: true });

        var color = JenkinsColorEnum.Default;
        var status = "";
        switch (this.phase) {
            case JenkinsPharseEnum.Started: 
                status = this.phase;

                content.fields.add( { 
                    title: "Build Number", 
                    value: String.format("{0}", this.buildName),
                    short: true
                } );
                
                var params = this.data.build.parameters;

                if(params && params.ghprbPullId) {
                    content.fields.add({ title: "Source branch", value: params.ghprbSourceBranch,  short: true});
                    content.fields.add({ title: "Target branch", value: params.ghprbTargetBranch,  short: true});
                    content.fields.add( { 
                        title: "Pull request", 
                        value: String.format("#{0}: #{1}", 
                        params.ghprbPullId, params.ghprbPullTitle),  short: true
                    });
                    content.fields.add({ title: "URL", value: params.ghprbPullLink,  short: true});
                }
                else {
                    content.fields.add({ title: "Url", value: this.scm.url,  short: true});
                    content.fields.add({ title: "Commit SHA1", value: this.scm.commit,  short: true});
                    content.fields.add({ title: "Branch", value: this.scm.branch,  short: true});
                }
                break;
            case JenkinsPharseEnum.Completed:
                return;
            case JenkinsPharseEnum.Finalized:
                status = String.format("#{0} with #{1}", this.phase, this.status);
                content.fields.add({title: "Status", value: this.status, short: true})
                content.fields.add({title: "Build Log", value: String.format("{0}console", this.fullUrl), short: true})

                switch (this.status) {
                    case JenkinsStatusEnum.Aborted:
                        color = JenkinsColorEnum.Aborted;
                        break;
                    case JenkinsStatusEnum.Failure:
                        color = JenkinsColorEnum.Failure;
                        break;
                    case JenkinsStatusEnum.Fixed:
                        color = JenkinsColorEnum.Fixed;
                        break;
                    case JenkinsStatusEnum.StillFailing:
                        color = JenkinsColorEnum.StillFailing;
                        break;
                    case JenkinsStatusEnum.Success:
                        color = JenkinsColorEnum.Success;
                        break;
                }

                break;
        }

        // Create slack attachments format
        var result = {
            attachments: [ {
                color: color,
                pretext: String.format("Jenkins #{0} #{1} #{2}", this.projectName, status, this.fullUrl),
                fallback: String.format("Jenkins #{0} #{1} #{2}", this.projectName, status, this.fullUrl),
                fields: content.fields
            } ]
        };

        return result;
    }

    return JenkinsResultFormat;
})();