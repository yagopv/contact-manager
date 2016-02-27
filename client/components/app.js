/**
 * Main Module definition
 * Configure app, main controller, providers, ...etc
 */
(function() {

    'use strict';

    angular.module('app', [
            'ui.bootstrap.datetimepicker',
            'ngDialog',
            'ui.router',
            'satellizer',
            'toastr', 
            'ngMessages'])

        .config(['$uiViewScrollProvider', '$httpProvider', Config ])
        .controller('AppController', [ 'LoadingFactory', '$auth', AppController ]);

    /**
     * Config app
     * @param $uiViewScrollProvider
     * @constructor
     */
    function Config($uiViewScrollProvider, $httpProvider) {
        $uiViewScrollProvider.useAnchorScroll();

        //FIX for IE caching problem
        //http://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
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