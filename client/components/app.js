/**
 * Main Module definition
 * Configure app, main controller, providers, ...etc
 */
(function() {

    "use strict";

    angular.module("contactManager", [
            "contactManager.dashboard",
            "contactManager.account",
            "contactManager.common"])

        .config(["$uiViewScrollProvider", Config ])
        .controller("AppController", [ "LoadingFactory", "$auth", AppController ]);

    /**
     * Config app
     * @param $uiViewScrollProvider
     * @constructor
     */
    function Config($uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
    }

    /**
     * Main base controller
     * @param LoadingFactory
     * @param $scope
     * @constructor
     */
    function AppController(LoadingFactory, $auth) {
        this.loading = LoadingFactory;
        this.isAuthenticated = $auth.isAuthenticated;
    }

})();