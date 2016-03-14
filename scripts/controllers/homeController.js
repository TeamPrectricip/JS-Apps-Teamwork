var app = app || {};

app.homeController = (function() {
    var homeController = {
        init: function(model, view) {
            this._model = model;
            this._view = view;
            return this;
        },

        loadAllPosts: function(selector) {
            var that = this;

            this._model.getAllPosts()
                .then(function(posts) {
                    var data = {
                        posts: []
                    };

                    posts.forEach(function(post) {
                        data.posts.push({
                            title: post.title,
                            author: post.author,
                            text: post.text,
                            id: post._id
                        });
                    });

                that._view.showHomePage(selector, data);
                }).done();
        }
    }

    return homeController;
}());
