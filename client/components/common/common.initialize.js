/**
 * Define module contactManager.common
 */
(function() {
    angular.module("contactManager.common", ["ui.router"])
        .config([
            "$stateProvider",
            "$urlRouterProvider",
            Router ]);

    /**
     * The router
     * @param $stateProvider
     * @param $urlRouterProvider
     * @constructor
     */
    function Router($stateProvider, $urlRouterProvider){

        /**
         * Home
         */
        $stateProvider.state('home', {
            url: "/",
            templateUrl: '/components/home/home.html'
        });

        /**
         * Dashboard
         */
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            controller: "DashboardController",
            controllerAs: "dashboard",
            templateUrl: '/components/dashboard/dashboard.html'
        });

        /**
         * Add new contact
         */
        $stateProvider.state('newContact', {
            url: "/dashboard/contact/new",
            controller: "EditContactController",
            controllerAs: "editContact",
            templateUrl: '/components/dashboard/edit/editContact.html'
        });

        /**
         * Edit contact
         */
        $stateProvider.state('editContact', {
            url: "/dashboard/contact/:id",
            controller: "EditContactController",
            controllerAs: "editContact",
            templateUrl: '/components/dashboard/edit/editContact.html'
        });

        /**
         * About
         */
        $stateProvider.state('about', {
            url: "/about",
            templateUrl: '/components/about/about.html'
        });

        /**
         * When not route found go to 404 route
         */
        $stateProvider.state('404', {
            url: "/404",
            templateUrl: '/components/errors/404.html'
        });

        $urlRouterProvider.when("", "/");
        $urlRouterProvider.otherwise('/404');
    }
})();

