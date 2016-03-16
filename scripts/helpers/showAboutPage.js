var app = app || {};

app.showAboutPage = (function() {
    function showAboutPage(selector) {
        $.get('templates/about.html', function(template) {
            $(selector).html(template);
        });
    }

    return showAboutPage;
}());
