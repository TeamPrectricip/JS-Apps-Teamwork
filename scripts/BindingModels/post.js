var PostInputModel = (function () {
        function PostInputModel(id, title, text, tags) {
            this._id = id;
            this.title = title;
            this.text = text;
            this.tags = tags;
        }

        return PostInputModel;
    }());