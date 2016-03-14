var app = app || {};

app.postView = (function () {
    function showPost(selector, data) {
        $.get('templates/post.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
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
