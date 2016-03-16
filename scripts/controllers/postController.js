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
                        post.title,
                        post.text,
                        post.tags,
                        post.author,
                        post.counter
                    ));
                });
                _this._viewBag.showPost(selector, data);
            }).done();
    };

    PostController.prototype.getPostByTagName = function (selector, tag){
        var _this = this;
        this._model.getAllPosts()
            .then(function (posts) {
                var data = {
                    posts: []
                };
                posts.forEach(function(post) {
                    data.posts.push(new PostInputModel(
                        post._id,
                        post.title,
                        post.text,
                        post.tags,
                        post.author,
                        post.counter
                    ));
                });
                _this.filterPost = {
                    posts: []
                };
                _this.filter(posts,tag);

                _this._viewBag.showFilteredPosts(selector, _this.filterPost);

            }).done();

    };

    PostController.prototype.visitCounter = function(post){
        var _this = this;
        var postModel = post.post;
        var model = {
          title: postModel.title,
            text: postModel.text,
            tags: postModel.tags,
            author: postModel.author,
            counter: postModel.counter+1
        };
        this._model.updateVisitCounter(postModel._id, model).done();
    };

    PostController.prototype.createPostView = function(selector){
        this._viewBag.createNewPost(selector);
    };

    PostController.prototype.createNewPost = function(selector, post){

    };


    PostController.prototype.filter = function(posts, tag){
        var _this = this;
        posts.forEach(function(post){
            if($.inArray(tag, post.tags) > -1){
                _this.filterPost.posts.push(post);
            }
        });
    };




    return {
        load: function (model, viewBag) {
            return new PostController(model, viewBag);
        }
    };
}();