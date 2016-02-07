/**
 * This directive will encapsulate the address management
 */
(function() {

    "use strict";

    angular.module("app.dashboard")
        .directive("contactAddresses", AddressesDirective);

    /**
     * Address directive
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {addresses: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    function AddressesDirective() {

        return {
            restrict: "EA",
            replace: true,
            scope: { },
            bindToController: {
                addresses: "="
            },
            controllerAs: "ctrl",
            controller: function() {
                this.addressFormVisibility = false;
                this.addressForm = null;
                this.address = { street: []};
                this.editMode = false;

                /**
                 * Add address to collection
                 * @param address
                 */
                this.addOrUpdateAddress = function(address) {
                    this.addressForm.submitted = true;

                    if (!this.addressForm) {
                        return;
                    }

                    if (this.addressForm.$invalid) {
                        return;
                    }

                    if (!this.editMode) {
                        this.addresses.unshift(address);
                    } else {
                        this.editMode = false;
                    }

                    this.changeAddressFormVisibility(false);
                    this.addressForm.$setPristine();
                    this.addressForm.submitted = false;
                    this.address = { street: []};
                };

                /**
                 * Edit address. Show form
                 * @param address
                 */
                this.editAddress = function(address) {
                    this.changeAddressFormVisibility(true);
                    this.address = address;
                    this.editMode = true;
                };

                /**
                 * Remove address from collection
                 * @param $index
                 */
                this.removeAddress = function($index, $event) {
                    $event.stopPropagation();

                    this.addresses.splice($index, 1);
                    this.changeAddressFormVisibility(false);
                };

                /**
                 * Change form visibility
                 * @param isVisible
                 */
                this.changeAddressFormVisibility = function(isVisible) {
                    this.addressFormVisibility = isVisible;
                };

                /**
                 * Cancel address edition. Hide form address
                 */
                this.cancelEdit = function() {
                    this.address = { street: []};
                    this.changeAddressFormVisibility(false);
                };
            },
            templateUrl: "/components/dashboard/edit/addresses.html"
        }

    }

})();