/**
 * Dashboard view controller
 */
(function(){

    "use strict";

    angular.module('contactManager.dashboard')
        .controller('DashboardController', ["ContactFactory", "$state", "LoadingFactory" ,DashboardController]);

    /**
     * Dashboard controller
     * @param ContactFactory
     * @param $state
     * @param LoadingFactory
     * @constructor
     */
    function DashboardController(ContactFactory, $state, LoadingFactory) {
        var self = this;

        LoadingFactory.show();

        ContactFactory.get()
            .then(function(contacts) {
                self.contacts = contacts;
            })
            .catch(function(error) {

            })
            .finally(function() {
                LoadingFactory.hide();
            });

        this.editContact = function(contact) {
            $state.go("editContact",  { id: contact._id });
        }
    }

})();