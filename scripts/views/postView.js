var app = app || {};

app.postView = (function () {
    function showPost(selector, data) {
        $.get('templates/post.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $.sammy(function () {
                this.trigger('get-comments', {parent: $('.comments'), id: data.posts[0]._id});
                this.trigger('visitCounter', {post: data.posts[0]});
            });

            var counter = data.posts[0].counter;
            $('#visit-count').text('Visit for ' + counter + '  time');

            $('#addComment').on('click', function () {
                var firstName = $('#firstname').val(),
                    lastName = $('#lastname').val(),
                    feedback = $('#feedback').val();

                if(firstName === '' || lastName === '' || feedback === '') {
                    $('.form-group').addClass('has-error');
                } else {
                    $('.form-group').removeClass('has-error');
                    $.sammy(function () {
                        this.trigger('add-comment', {postId: data.posts[0]._id, content: feedback, parent: $('.comments')})
                    });

                    $('#firstname').val('');
                    $('#lastname').val('');
                    $('#feedback').val('');
                }
            });
        });
    };

    function showFilteredPosts(selector, data) {
        $.get('templates/filteredPosts.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('.featured-post').on('click', function () {
                var id = $(this).attr("data-id");
                var url = '#/post/details/' + id;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: url})
                });
            });

            $('#searchButton').on('click', function(){

                var textBoxData = $('#searchTextBox').val();
                var url = '#/post/byTag/' + textBoxData;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: url})
                });
            });
        });
    };

    function createNewPost(selector){
        $.get('templates/addPost.html', function (templ) {
            var rendered = Mustache.render(templ);
            $(selector).html(rendered);

            $('#addComment').on('click', function () {
                var title = $('#title').val();
                var text = $('#text').val();
                var tags = $('#tags').val();
                if(tags == '' || text == '' || title == ''){
                    $('.form-group').addClass('has-error');
                } else {
                    var userId = sessionStorage.userId;
                    $('.form-group').removeClass('has-error');
                    $.sammy(function () {
                        this.trigger('createPost', {title: title, text: text, tags: tags, userId: userId})
                    });
                }
            })
        });
    };


    return {
        load: function () {
            return {
                showPost: showPost,
                showFilteredPosts: showFilteredPosts,
                createNewPost: createNewPost
            }
        }
    }
}());
