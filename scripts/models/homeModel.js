var app = app || {};

app.homeModel = (function() {
    var homeModel = {
        init: function(requester) {
            this._requester = requester;
            this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/posts';
            return this;
        },

        getAllPosts: function() {
            return this._requester.get(this.serviceUrl, false);
        }
    }

    return homeModel;
}());
