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
                    $.sammy(function () {
                        this.trigger('redirectUrl', {url: '#/home'});
                    })
                }).done();
        },

        logout: function () {
            sessionStorage.clear()
        },

        showLoginPage: function (selector) {
            this._view.showLoginPage(selector);
        },

        showLogoutPage: function () {
            this._view.showLogoutPage();
        }
    }

    return blogOwnerController;
}());
