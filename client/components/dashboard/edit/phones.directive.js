/**
 * Manage phones
 */
(function() {
    "use strict";

    angular.module("contactManager.dashboard")
        .directive("cmPhones", PhonesDirective);

    /**
     * Phones directive
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {phones: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    function PhonesDirective() {
        return {
            restrict: "EA",
            replace: true,
            scope: { },
            bindToController: {
                phones: "="
            },
            controllerAs: "ctrl",
            controller: function() {
                this.phoneFormVisibility = false;
                this.phoneForm = null;

                /**
                 * Add phone to collection
                 * @param phone
                 */
                this.addPhone = function(phone) {
                    this.phoneForm.submitted = true;

                    if (!this.phoneForm) {
                        return;
                    }

                    if (this.phoneForm.$invalid) {
                        return;
                    }

                    this.phones.unshift(phone);
                    this.editPhone = {};
                    this.changePhonesFormVisibility(false);
                    this.phoneForm.$setPristine();
                    this.phoneForm.submitted = false;
                };

                /**
                 * Remove phone from collection
                 * @param $index
                 */
                this.removePhone = function($index) {
                    this.phones.splice($index, 1);
                    this.changePhonesFormVisibility(false);
                };

                /**
                 * Change phones form visibility
                 * @param isVisible
                 */
                this.changePhonesFormVisibility = function(isVisible) {
                    this.phoneFormVisibility = isVisible;
                };
            },
            templateUrl: "/components/dashboard/edit/phones.html"
        }
    }

})();