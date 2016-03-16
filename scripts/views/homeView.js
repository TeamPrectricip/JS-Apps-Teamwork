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

                var button = $('<button/>', {
                    text: "Create Post",
                    id: 'createPost',
                    class: 'btn btn-default'
                });

                var div = $('<div>',{
                    class: 'input-group-btn'
                });
                div.append(button);

                $('.createPostDiv').append(div);

                $('#createPost').on('click', function () {
                    $.sammy(function(){
                        this.trigger('redirectUrl', {url: "#/post/create"});
                    });
                });

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
