var app = app || {};

app.homeView = (function() {
    function showHomePage(selector, data) {
        $.get('templates/home.html', function(template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);

        });
    }

    return {
        load: function() {
            return {
                showHomePage: showHomePage
            }
        }
    }
}());
