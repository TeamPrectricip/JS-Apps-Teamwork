var CommentInputModel = (function() {
    function CommentInputModel(id, content, postId) {
        this._id = id;
        this.content = content;
        this.postId = postId;
    }

    return CommentInputModel;
}());