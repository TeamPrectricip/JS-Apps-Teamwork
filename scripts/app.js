var app = app || {};

(function() {
    app.router = Sammy(function() {
        var selector = $('.content');
        var requester = Object.create(app.requester).init('kid_-y1QostQk-', 'owner', '1234');

<<<<<<< HEAD
            var homeView = app.homeView.load();
            var blogOwnerView = app.blogOwnerView.load();

            var homeModel = Object.create(app.homeModel).init(requester);
            var blogOwnerModel = Object.create(app.blogOwnerModel).init(requester);;

            var homeController = Object.create(app.homeController).init(homeModel, homeView);
            var blogOwnerController = Object.create(app.blogOwnerController).init(blogOwnerModel, blogOwnerView);
=======
        var homeView = app.homeView.load();
        var postView = app.postView.load();

        var homeModel = Object.create(app.homeModel).init(requester);
        var postModel = Object.create(app.postModel).init(requester);

        var homeController = Object.create(app.homeController).init(homeModel, homeView);
        var postController = app.postController.load(postModel,postView);
>>>>>>> 06802cd89a6cd77dcd5d880da4bbcf5d909059e5

        this.get('#/', function() {
            homeController.loadAllPosts(selector);
        });

        this.get('#/post/:id', function(){

            postController.getPostById(selector,this.params['id']);
        });

<<<<<<< HEAD
            this.get('#/login', function() {
                blogOwnerController.login();
            });
=======
        this.get('#/login', function() {
>>>>>>> 06802cd89a6cd77dcd5d880da4bbcf5d909059e5
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

    });

    app.router.run('#/');
}());
