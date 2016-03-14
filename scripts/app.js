var app = app || {};

(function() {
    app.router = Sammy(function() {
        var selector = $('.content');
        var requester = Object.create(app.requester).init('kid_-y1QostQk-', 'owner', '1234');

        var homeView = app.homeView.load();
        var postView = app.postView.load();

        var homeModel = Object.create(app.homeModel).init(requester);
        var postModel = Object.create(app.postModel).init(requester);

        var homeController = Object.create(app.homeController).init(homeModel, homeView);
        var postController = app.postController.load(postModel,postView);

        this.get('#/', function() {
            homeController.loadAllPosts(selector);
        });

        this.get('#/post/:id', function(){

            postController.getPostById(selector,this.params['id']);
        });

        this.get('#/login', function() {
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

    });

    app.router.run('#/');
}());
