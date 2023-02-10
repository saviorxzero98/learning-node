
exports.HttpRequest = (function () {
    function HttpRequest(request, response) {
        this.Request = request;
        this.Response = response;
    }

    HttpRequest.prototype.getHost = function() {
        if(this.Request && this.Request.headers && this.Request.headers.host) {
            return this.Request.headers.host;
        }
        return "";
    }

    HttpRequest.prototype.getHeader = function () {
        if(this.Request && this.Request.headers) {
            return this.Request.headers;
        }
        return {};
    };

    HttpRequest.prototype.getQuery = function () {
        if(this.Request && this.Request.query) {
            return this.Request.query;
        }
        return {};
    };

    HttpRequest.prototype.getBody = function () {
        if(this.Request && this.Request.body) {
            return this.Request.body;
        }
        return {};
    };

    HttpRequest.prototype.getPath = function () {
        if(this.Request && this.Request.originalUrl) {
            return this.Request.originalUrl;
        }
        return "";
    };

    return HttpRequest;
})();

exports.MessageResponse = (function () {
    function MessageResponse(response) {
        this.Response = response;
    }

    MessageResponse.prototype.getRobot = function () {
        if(this.Response && this.Response.robot) {
            return this.Response.robot;
        }

        return {};
    }

    MessageResponse.prototype.getRobotName = function() {
        if(this.Response && this.Response.robot && this.Response.robot.name) {
            return this.Response.robot.name;
        }
        return "";
    }

    MessageResponse.prototype.getMessage = function () {
        var message = {
            User: {},
            Text: "",
            Id: "",
            Done: false,
            Room: ""
        };
        
        if(this.Response && this.Response.message) {
            message = {
                User: this.Response.message.user,
                Text: this.Response.message.text,
                RealText: this.Response.message.text.replace(this.getRobotName() + " ", ""),
                Id: this.Response.message.id,
                Done: this.Response.message.done,
                Room: this.Response.message.room
            };
        }
        return message;
    };

    MessageResponse.prototype.getUserInfo = function () {
        var message = this.getMessage();
        var user = {};

        if(message.User) {
            user = {
                Id: message.User.id,
                TeamId: message.User.team_id,
                Name:  message.User.name,
                Deleted: message.User.deleted,
                Status: message.User.status,
                RealName: message.User.real_name,
                profile: message.User.profile,
                IsAdmin: message.User.is_admin,
                IsOwner: message.User.is_owner,
                IsPrimaryOwner: message.User.is_primary_owner,
                IsRestricted: message.User.is_restricted,
                IsUltraRestricted: message.User.is_ultra_restricted,
                IsBot: message.User.is_bot,
                Presence: message.User.presence,
                Room: message.User.room
            }
        }
        return user;
    };

    MessageResponse.prototype.getEnvelope = function () {
        if(this.Response && this.Response.envelope) {
            return message.envelope;
        }

        return { 
            room : '',
            user: {},
            message: {}
        };
    }

    return MessageResponse;
})();