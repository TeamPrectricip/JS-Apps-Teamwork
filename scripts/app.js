var app = app || {};

(function() {
        var router = Sammy(function() {
            var selector = $('.content');
            var requester = Object.create(app.requester).init('kid_-y1QostQk-', 'owner', '1234');

            var homeView = app.homeView.load();

            var homeModel = Object.create(app.homeModel).init(requester);

            var homeController = Object.create(app.homeController).init(homeModel, homeView);

            this.get('#/', function() {
                homeController.loadAllPosts(selector);
            });

            this.get('#/login', function() {
            });
        });

        router.run('#/');
}());
