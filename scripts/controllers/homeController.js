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
                        posts: [],
                        sortedPosts: []
                    };

                    posts.forEach(function(post) {
                        if(post.text.length > 50) {
                            var showText = post.text.substr(0, 40) + '...';
                        }

                        data.posts.push({
                            title: post.title,
                            author: post.author,
                            text: showText,
                            id: post._id
                        });
                    });

                    var sorted = posts.sort(function(a, b) {
                        var firstDate = new Date(a._kmd.ect),
                            secondDate = new Date(b._kmd.ect);

                        return firstDate - secondDate;
                    });

                    sorted.forEach(function(post) {
                        data.sortedPosts.push({
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
