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
        },

        updateVisitCounter: function(id, post){
            var requestUrl = this.serviceUrl + "/" + id;
            return this._requester.put(requestUrl, post, false);
        },

        createPost: function(post){
            return this._requester.post(this.serviceUrl, post, false);
        }
    }

    return postModel;
}());
