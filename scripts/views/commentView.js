var app = app || {};

app.commentView = (function () {
    function showComments(parent, data) {
        $.get('templates/comment.html', function (templ) {
            var outputHtml = Mustache.render(templ, data);
            parent.html(outputHtml);
        })
    }

    return {
        load: function () {
            return {
                showComments: showComments
            }
        }
    }
}());
