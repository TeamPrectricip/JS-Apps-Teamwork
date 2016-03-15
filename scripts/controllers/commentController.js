var app = app || {};

app.commentController = function () {
    function CommentController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    CommentController.prototype.getCommentsByPostId = function (data) {
        var _this = this;

        this._model.getCommentsByPostId(data.id)
            .then(function (comments) {
                var result = {
                    comments: []
                };

                comments.forEach(function(comment) {
                    result.comments.push(new CommentInputModel(
                        comment._id,
                        comment.content,
                        comment.postId
                    ));
                });
                _this._viewBag.showComments(data.parent, result);
            }).done();
    };

    CommentController.prototype.addComment = function(data) {
        var _this = this;
        var commentOutputModel = {
            content: data.content,
            post: {
                _type: 'KinveyRef',
                _id: data.postId,
                _collection: 'posts'
            }
        };

        this._model.addComment(commentOutputModel)
            .then(function() {
                var model = {
                    parent : data.parent,
                    id : data.postId
                }
                _this.getCommentsByPostId(model);
            })
    };

    return {
        load: function (model, viewBag) {
            return new CommentController(model, viewBag);
        }
    };
}();