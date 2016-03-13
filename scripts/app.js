var app = app || {};

(function() {
        var router = Sammy(function() {
            var selector = $('#wrapper');
            var requster = Object.create(app.requester).init('kid_-y1QostQk-', 'a228b343de8d40349eeffab6d1f17998');
            var homeView = app.homeView.load();

            this.get('#/', function() {
            });

            this.get('#/login', function() {
                userController.showLoginPage(selector);
            });
        });

        router.run('#/');
}());
