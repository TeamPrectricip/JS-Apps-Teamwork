var app = app || {};

app.homeView = (function () {
    function showHomePage(selector, data) {
        $.get('templates/home.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('.featured-post').on('click', function () {
                var id = $(this).attr("data-id");
                var url = '#/post/details/' + id;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: url})
                });
            });

            $('#login-btn').on('click', function () {
                Sammy(function () {
                });
            });

            $('#searchButton').on('click', function(){
                var textBoxData = $('#searchTextBox').val();
                var url = '#/post/byTag/' + textBoxData;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: url})
                });
            })

            /*Change ID and inner text of Login button when user is logged*/
            if (sessionStorage.userId) {
                $('#login-btn')
                    .attr('id', 'logout-btn')
                    .attr('href', '#/logout')
                    .text('Logout');
            }
        });
    };




    return {
        load: function () {
            return {
                showHomePage: showHomePage
            }
        }
    }
}());
