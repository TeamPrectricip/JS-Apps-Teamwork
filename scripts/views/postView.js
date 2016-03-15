var app = app || {};

app.postView = (function () {
    function showPost(selector, data) {
        $.get('templates/post.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $('.content').html(rendered);
            $.sammy(function () {
                this.trigger('get-comments', {parent: $('.comments'), id: data.posts[0]._id})
            });
            $('#addComment').on('click', function(){
                var textArea = $('#textArea').val();
                $.sammy(function () {
                    this.trigger('add-comment', {postId: data.posts[0]._id, content: textArea, parent: $('.comments')})
                    $('#textArea').val(null);
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
