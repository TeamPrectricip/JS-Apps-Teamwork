var app = app || {};

(function() {
    var router = Sammy(function() {
        var selector = $('#wrapper');
        var requester = Object.create(app.requester).init('kid_-y1QostQk-', 'owner', '1234');

        var homeView = app.homeView.load();
        var blogOwnerView = app.blogOwnerView.load();
        var postView = app.postView.load();
        var commentView = app.commentView.load();

        var homeModel = Object.create(app.homeModel).init(requester);
        var blogOwnerModel = Object.create(app.blogOwnerModel).init(requester);
        var postModel = Object.create(app.postModel).init(requester);
        var commentModel = Object.create(app.commentModel).init(requester);

        var homeController = Object.create(app.homeController).init(homeModel, homeView);
        var blogOwnerController = Object.create(app.blogOwnerController).init(blogOwnerModel, blogOwnerView);
        var postController = app.postController.load(postModel, postView);
        var commentController = app.commentController.load(commentModel, commentView);


        this.get('#/home', function() {
            homeController.loadAllPosts(selector);
        });

        this.get('#/login', function() {
            blogOwnerController.showLoginPage('#wrapper');
        });
        this.get('#/logout', function() {
            blogOwnerController.showLogoutPage('#wrapper');
        });
        this.get('#/post/:id', function(){
            postController.getPostById(selector,this.params['id']);
        });

        this.bind('login', function(e, data) {
            blogOwnerController.login(data);
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('add-comment', function(e, data) {
            commentController.addComment(data);
        });

        this.bind('get-comments', function (e, data) {
            commentController.getCommentsByPostId(data);
        });
    });

    router.run('#/home');
}());
