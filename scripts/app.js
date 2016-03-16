var app = app || {};

(function() {
    var router = Sammy(function() {
        var wrapper = $('#wrapper');
        var selector = $('.content');
        var requester = Object.create(app.requester).init('kid_-y1QostQk-', 'owner', '1234');

        var homeView = app.homeView.load();
        var blogOwnerView = app.blogOwnerView.load();
        var postView = app.postView.load();
        var commentView = app.commentView.load();
        //var sidebarView = app.sidebarView.load();

        var homeModel = Object.create(app.homeModel).init(requester);
        var blogOwnerModel = Object.create(app.blogOwnerModel).init(requester);
        var postModel = Object.create(app.postModel).init(requester);
        var commentModel = Object.create(app.commentModel).init(requester);
        //var sidebarModel = Object.create(app.sidebarModel).init(requester);

        var homeController = Object.create(app.homeController).init(homeModel, homeView);
        var blogOwnerController = Object.create(app.blogOwnerController).init(blogOwnerModel, blogOwnerView);
        var postController = app.postController.load(postModel, postView);
        var commentController = app.commentController.load(commentModel, commentView);

        this.before('#/post/create', function() {
            if (!sessionStorage.userId) {
                this.redirect('#/login');
                return false;
            } else {
            }
        });


        this.get('#/home', function() {
            homeController.loadAllPosts(selector);
            

        });

        this.get('#/login', function() {
            blogOwnerController.showLoginPage(selector);
        });

        this.get('#/logout', function() {
            blogOwnerController.logout();
        });

        this.get('#/post/details/:id', function(){
            postController.getPostById(selector ,this.params['id']);
        });

        this.get('#/post/create', function () {
           postController.createPostView(selector);
        });

        this.get('#/about', function() {
               app.showAboutPage(selector);
        });

        this.get('#/post/byTag/:tag', function(){
            postController.getPostByTagName(selector ,this.params['tag']);
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

        this.bind('visitCounter', function (e, data) {
            postController.visitCounter(data);
        });

        this.bind('createPost', function (e, data) {
           postController.createNewPost(selector, data);
        });
    });

    router.run('#/home');
}());
