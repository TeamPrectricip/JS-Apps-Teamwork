var app = app || {};

app.blogOwnerController = (function () {
    var blogOwnerController = {
        init: function (model, view) {
            this._model = model;
            this._view = view;
            return this;
        },

        login: function (credentials) {
            this._model.login(credentials)
                .then(function (success) {
                    sessionStorage['sessionAuth'] = success._kmd.authtoken;
                    sessionStorage['userId'] = success._id;
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/home'});
                    })
                }).done();
        },

        logout: function () {
            this._model.logout()
                .then(function() {
                    sessionStorage.clear();

                    Sammy(function() {
                        this.trigger('redirectUrl', {url: '#/home'});
                    });
                }).done();
        },

        showLoginPage: function (selector) {
            this._view.showLoginPage(selector);
        }
    }

    return blogOwnerController;
}());
