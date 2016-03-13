var app = app || {};

app.requester = (function(){
    "use strict"
    var requester = {
        init: function(appId, appSecret) {
            this.appId = appId;
            this.appSecret = appSecret;
            this.baseUrl = 'https://baas.kinvey.com/';
            return this;
        },

        get: function(url, useSession) {
            return this.makeRequest('GET', url, null, useSession);
        },

        post: function(url, data, useSession) {
            return this.makeRequest('POST', url, data, useSession);
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
                                token = that.appId + ':' + that.appSecret;
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
