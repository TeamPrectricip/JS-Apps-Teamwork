var app = app || {};

app.postController = (function () {
    var postController = {
        init: function (model, viewBag) {
            this._model = model;
            this._viewBag = viewBag;
            return this;
        },

        getPostById: function (selector, id) {
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
        },

        getPostByTagName: function(selector, tag){
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

        },

        visitCounter: function(post){
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
        },

        createPostView: function(selector){
            this._viewBag.createNewPost(selector);
        },

        createNewPost: function(selector, data){
            var tags = data.tags.split(",");
            var _this = this;
            var postOutputModel = {
                text: data.text,
                counter: 0,
                title: data.title,
                tags: tags,
                author: {
                    _type: 'KinveyRef',
                    _id: data.userId,
                    _collection: 'user'
                }
            };

            this._model.createPost(postOutputModel).then(function (posts) {
                var data = {
                    posts: []
                };

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home'});
                });

                // posts.forEach(function(post) {
                //     data.posts.push(new PostInputModel(
                //         post._id,
                //         post.title,
                //         post.text,
                //         post.tags,
                //         post.author,
                //         post.counter
                //     ));
                // });
                _this._viewBag.showPost(selector, data);
            }).done();

        },

        filter: function(posts, tag){
            var _this = this;
            posts.forEach(function(post){
                if($.inArray(tag, post.tags) > -1){
                    _this.filterPost.posts.push(post);
                }
            });
        }
    }

    return postController;
}());
