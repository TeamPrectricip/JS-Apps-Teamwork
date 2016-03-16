var PostInputModel = (function () {
        function PostInputModel(id, title, text, tags, author, counter) {
            this._id = id;
            this.title = title;
            this.text = text;
            this.tags = tags;
            this.author = author;
            this.counter = counter;
        }

        return PostInputModel;
    }());