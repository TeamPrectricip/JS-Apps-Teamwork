var app = app || {};

(function() {
        var router = Sammy(function() {
            var selector = $('.content');
            var requester = Object.create(app.requester).init('kid_-y1QostQk-', 'owner', '1234');

            var homeView = app.homeView.load();
            var blogOwnerView = app.blogOwnerView.load();

            var homeModel = Object.create(app.homeModel).init(requester);
            var blogOwnerModel = Object.create(app.blogOwnerModel).init(requester);;

            var homeController = Object.create(app.homeController).init(homeModel, homeView);
            var blogOwnerController = Object.create(app.blogOwnerController).init(blogOwnerModel, blogOwnerView);

            this.get('#/', function() {
                homeController.loadAllPosts(selector);
            });

            this.get('#/login', function() {
                blogOwnerController.login();
            });
        });

        router.run('#/');
}());
