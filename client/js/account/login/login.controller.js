(function() {
   'use strict';

    angular.module('app')
        .controller('LoginController', ['$state', '$auth', 'toastr', 'LoadingFactory', LoginController]);

    /**
     * Authenticate users using Local accounts or oAuth
     * @constructor
     * @param {$state} $state - UIRouter State Service
     * @param {$auth} $auth - Satellizer Auth Service
     * @param {toastr} toastr - Toastrs
     * @param {LoadingFactory} LoadingFactory - Helper for showing loaders
     */
    function LoginController($state, $auth, toastr, LoadingFactory) {
        /**
         * Login user in application
         */
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

        /**
         * Authenticate user using oAuth
         * @param {String} provider - oAuth provider selected
         */
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