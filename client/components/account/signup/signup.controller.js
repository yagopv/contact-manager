(function() {
   'use strict';

    angular.module('app.account')
        .controller('SignupController', ['$location', '$auth', 'toastr', 'LoadingFactory', SignupController]);

    function SignupController($location, $auth, toastr, LoadingFactory) {
        var self = this;
        this.signup = function() {
            LoadingFactory.show();
            $auth.signup(self.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $location.path('/');
                    toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    toastr.error(response.data.message);
                })
                .finally(function() {
                    LoadingFactory.hide();
                });
        };
    }
})();