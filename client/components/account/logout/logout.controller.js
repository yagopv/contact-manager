(function() {

    'use strict';

    angular.module('contactManager.account')
        .controller('LogoutController', ['$auth', 'toastr', '$state', LogoutController]);

    function LogoutController($auth, toastr, $state) {
        if (!$auth.isAuthenticated()) { return; }
        $auth.logout()
            .then(function() {
                toastr.info('You have been logged out');
                $state.go("home");
            });
    };

})();