(function() {

    'use strict';

    angular.module('app.account')
        .controller('ProfileController', ['$auth', 'toastr', 'AccountFactory', ProfileController]);

    function ProfileController($auth, toastr, Account) {
        var self = this;

        this.getProfile = function() {
            Account.getProfile()
                .then(function(response) {
                    self.user = response.data;
                })
                .catch(function(response) {
                    toastr.error(response.data.message, response.status);
                });
        };

        this.updateProfile = function() {
            Account.updateProfile(this.user)
                .then(function() {
                    toastr.success('Profile has been updated');
                })
                .catch(function(response) {
                    toastr.error(response.data.message, response.status);
                });
        };

        this.link = function(provider) {
            $auth.link(provider)
                .then(function() {
                    toastr.success('You have successfully linked a ' + provider + ' account');
                    self.getProfile();
                })
                .catch(function(response) {
                    toastr.error(response.data.message, response.status);
                });
        };

        this.unlink = function(provider) {
            $auth.unlink(provider)
                .then(function() {
                    toastr.info('You have unlinked a ' + provider + ' account');
                    self.getProfile();
                })
                .catch(function(response) {
                    toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
                });
        };

        this.getProfile();
    }
})();