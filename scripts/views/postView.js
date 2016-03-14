var app = app || {};

app.postView = (function () {
    function showPost(selector, data) {
        $.get('templates/post.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $.sammy(function () {
                this.trigger('get-comments', {parent: $('.comments'), id: data.posts[0]._id})
            });
            $('#addComment').on('click', function(){
                textArea = $('#textArea');
                $.sammy(function () {
                    this.trigger('add-comment', {postId: data.posts[0]._id, content: textArea.val()})
                });
            });
        })
    }

    return {
        load: function () {
            return {
                showPost: showPost
            }
        }
    }
}());
