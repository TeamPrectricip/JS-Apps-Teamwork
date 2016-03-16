var app = app || {};

app.sidebarModel = (function () {
    var sidebarModel = {
        init: function (requester) {
            this._requester = requester;
            this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/posts' + '?query={}&sort={"_kmd":"ect"}';
            return this;
        },

        getAllSortedPosts: function () {
            return this._requester.get(this.serviceUrl, false);
        }
    }
    return sidebarModel;
}());
//TODO not ready!!!