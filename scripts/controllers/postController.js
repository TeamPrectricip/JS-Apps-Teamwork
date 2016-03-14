var app = app || {};

app.postController = function () {
    function PostController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PostController.prototype.getPostById = function (selector, id) {
        var _this = this;

        this._model.getPostById(id)
            .then(function (posts) {
                var data = {
                    posts: []
                };

                posts.forEach(function(post) {
                    data.posts.push(new PostInputModel(
                        post._id,
                        post.title
                    ));
                });
                _this._viewBag.showPost(selector, data);
            }).done();
    };


    return {
        load: function (model, viewBag) {
            return new PostController(model, viewBag);
        }
    };
}();