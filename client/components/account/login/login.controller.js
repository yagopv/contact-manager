(function() {
   'use strict';

    angular.module('app.account')
        .controller('LoginController', ['$state', '$auth', 'toastr', 'LoadingFactory', LoginController]);

    function LoginController($state, $auth, toastr, LoadingFactory) {
        this.login = function() {
            LoadingFactory.show();
            $auth.login(this.user)
                .then(function() {
                    $state.go('dashboard');
                })
                .catch(function(error) {
                    toastr.error(error.data.message, error.status);
                })
                .finally(function() {
                    LoadingFactory.hide();
                });
        };

        this.authenticate = function(provider) {
            LoadingFactory.show();
            $auth.authenticate(provider)
                .then(function() {
                    $state.go('dashboard');
                })
                .catch(function(error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        toastr.error(error.error);
                    } else if (error.data) {
                        // HTTP response error from server
                        toastr.error(error.data.message, error.status);
                    } else {
                        toastr.error(error);
                    }
                })
                .finally(function() {
                    LoadingFactory.hide();
                });
        };
    }

})();