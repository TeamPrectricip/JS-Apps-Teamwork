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
                $('#login-btn').hide();
                $('#logout-btn').show();

                var button = $('<button/>', {
                    text: "Create Post",
                    id: 'createPost',
                    class: 'btn btn-default'
                });

                var div = $('<div>',{
                    class: 'input-group-btn col-xs-12 col-sm-4'
                });
                div.append(button);

                $('.createPostDiv').append(div);

                $('#createPost').on('click', function () {
                    $.sammy(function(){
                        this.trigger('redirectUrl', {url: "#/post/create"});
                    });
                });

            } else {
                $('#login-btn').show();
                $('#logout-btn').hide();
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
