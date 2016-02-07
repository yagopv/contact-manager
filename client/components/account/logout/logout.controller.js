(function() {

    'use strict';

    angular.module('app.account')
        .controller('LogoutController', ['$auth', 'toastr', '$state', 'LoadingFactory', LogoutController]);

    function LogoutController($auth, toastr, $state, LoadingFactory) {
        if (!$auth.isAuthenticated()) { return; }

        LoadingFactory.show();

        $auth.logout()
            .then(function() {
                LoadingFactory.hide();
                $state.go("home");
            });
    };

})();