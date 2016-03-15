var app = app || {};

app.postModel = (function() {
    var postModel = {
        init: function(requester) {
            this._requester = requester;
            this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/posts';
            return this;
        },

        getPostById: function(id) {
            var requestUrl = this.serviceUrl + '?query={"_id":"' + id + '"}';
            return this._requester.get(requestUrl, false);
        },

        getAllPosts: function() {
            return this._requester.get(this.serviceUrl, false);
        }
    }

    return postModel;
}());
