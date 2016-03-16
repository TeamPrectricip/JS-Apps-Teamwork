var app = app || {};

app.sidebarView = (function () {

    function showSidebar(selector) {
        $.get('templates/sidebar.html', function (templ) {
            var outputHtml = Mustache.render(templ, data);
            $(selector).html(outputHtml);
        });
    };

    return {
        load: function () {
            return {
                showSidebar: showSidebar
            }
        }
    }
}());