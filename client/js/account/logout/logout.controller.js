/**
 * Logout Controller
 */
(function() {

    'use strict';

    angular.module('app')
        .controller('LogoutController', ['$auth', '$state', 'LoadingFactory', LogoutController]);

    /**
     * @constructor
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
    }

})();