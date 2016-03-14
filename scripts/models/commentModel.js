var app = app || {};

app.commentModel = (function() {
    var commentModel = {
        init: function(requester) {
            this._requester = requester;
            this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/comments';
            return this;
        },

        getCommentsByPostId: function(id) {
            var requestUrl = this.serviceUrl + '?query={"post._id":"' + id + '"}';
            return this._requester.get(requestUrl, false);
        },

        addComment: function(data) {
        return this._requester.post(this.serviceUrl, data, false)
         }
    }

    return commentModel;
}());
