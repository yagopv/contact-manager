/**
 * @namespace Account.Controllers
 */
(function() {

    'use strict';

    angular.module('app')
        .controller('LogoutController', ['$auth', 'toastr', '$state', 'LoadingFactory', LogoutController]);

    /**
     * @ngdoc controller
     * @name app.controller:LogoutController
     *
     * @description Logout users
     * @param {$auth} $auth - Satellizer Auth Service
     * @param {$state} $state - UIRouter State Service
     * @param {LoadingFactory} LoadingFactory - Helper for showing loaders
     */
    function LogoutController($auth, $state, LoadingFactory) {
        if (!$auth.isAuthenticated()) { return; }

        LoadingFactory.show();

        $auth.logout()
            .then(function() {
                LoadingFactory.hide();
                $state.go('home');
            });
    };

})();