/**
 * Define module contactManager.common
 */
(function() {
    angular.module("contactManager.common", ["ui.router", "satellizer"])
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
         * Login
         */
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            controllerAs: 'login',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            },
            templateUrl: '/components/account/login/login.html'
        });

        /**
         * Signup
         */
        $stateProvider.state('signup', {
            url: '/signup',
            controller: 'SignupController',
            controllerAs: 'signup',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            },
            templateUrl: '/components/account/signup/signup.html'
        });

        /**
         * Logout
         */
        $stateProvider.state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutController'
        });

        /**
         * Profile
         */
        $stateProvider.state('profile', {
            url: '/profile',
            controller: 'ProfileController',
            controllerAs: 'profile',
            resolve: {
                loginRequired: loginRequired
            },
            templateUrl: '/components/account/profile/profile.html'
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

        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }
    }
})();

