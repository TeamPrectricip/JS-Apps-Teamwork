var app = app || {};

app.requester = (function(){
    "use strict"
    var requester = {
        init: function(appId, user, pass) {
            this.appId = appId;
            this.user = user;
            this.pass = pass;
            this.baseUrl = 'https://baas.kinvey.com/';
            return this;
        },

        get: function(url, useSession) {
            return this.makeRequest('GET', url, null, useSession);
        },

        post: function(url, data, useSession) {
            return this.makeRequest('POST', url, data, useSession);
        },

        put: function(url, data, useSession){
            return this.makeRequest('PUT', url, data, useSession)
        },

        makeRequest: function(method, url, data, useSession) {
            var token,
            defer = Q.defer(),
                that = this,
                    options = {
                        method: method,
                        url: url,
                        success: function(data) {
                            defer.resolve(data);
                        },
                        error: function(error) {
                            defer.reject(error);
                        }
                    }

                    $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                            if(!useSession) {
                                token = that.user + ':' + that.pass;
                                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
                            } else {
                                token = sessionStorage['sessionAuth'];
                                xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
                            }

                            if(data) {
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                settings.data = JSON.stringify(data);
                                return true;
                            }
                        }
                    });

                    $.ajax(options);

                    return defer.promise;
        }
    }
    return requester;

}());
