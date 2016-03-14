var app = app || {};

app.blogOwnerView = (function() {
    function showLoginPage(selector) {
        $.get('templates/login.html', function(template) {
            $(selector).html(template);
        });
    }

    return {
        load: function() {
            return {
                showLoginPage: showLoginPage
            }
        }
    }

}());
