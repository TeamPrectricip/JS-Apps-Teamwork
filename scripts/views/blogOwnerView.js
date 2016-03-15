var app = app || {};

app.blogOwnerView = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (template) {
            $(selector).html(template);

            $('#login').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });
            });
        });
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
            }
        }
    }
}());
