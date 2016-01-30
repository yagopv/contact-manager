(function() {
   'use strict';

    angular.module('contactManager.account')
        .controller('SignupController', ['$location', '$auth', 'toastr', SignupController]);

    function SignupController($location, $auth, toastr) {
        var self = this;
        this.signup = function() {
            $auth.signup(self.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $location.path('/');
                    toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    toastr.error(response.data.message);
                });
        };
    }
})();