var app = app || {};

app.blogOwnerModel = (function() {
    var blogOwnerModel = {
        init: function(requester) {
            this._requester = requester;
            this._serviceUrl = requester.baseUrl + 'user/' + requester.appId;
            return this;

        },

        login: function(credentials) {
            var loginUrl = this._serviceUrl + '/login';
            return this._requester.post(loginUrl, credentials);
        }
    };

    return blogOwnerModel;
}());
