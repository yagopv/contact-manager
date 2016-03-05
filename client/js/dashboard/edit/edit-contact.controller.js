/**
 * This controller allow the contact edit/add management
 */
(function() {

    "use strict";

    angular.module("app")
        .controller("EditContactController", [
            "ContactFactory",
            "$stateParams",
            "$state",
            "$scope",
            "$filter",
            "ngDialog",
            "LoadingFactory", EditContactController ]);

    function EditContactController(ContactFactory, $stateParams, $state, $scope, $filter, ngDialog, LoadingFactory) {
        var self = this;

        this.contactFormSubmitted = false;
        this.contact = { phones: [], emails: [], addresses: []};
        this.editMode = false;
        this.validationSummary = null;

        /**
         * Save changes
         */
        this.saveChanges = function() {
            this.contactFormSubmitted = true;

            if (this.contactForm.name.$valid) {

            }

            LoadingFactory.show();

            if (self.editMode) {
                ContactFactory.update(this.contact._id, this.contact)
                    .then(function(contact) {
                        self.contact = contact;
                        self.validationSummary = null;
                    })
                    .catch(function(error) {
                        if (error.status === 400 && error.data.errors) {
                            self.validationSummary = error.data;
                        }                    })
                    .finally(function() {
                        LoadingFactory.hide();
                    });
            } else {
                ContactFactory.add(this.contact)
                    .then(function(contact) {
                        $state.go("editContact", { id: contact._id });
                        self.validationSummary = null;
                    })
                    .catch(function(error) {
                        if (error.status === 400 && error.data.errors) {
                            self.validationSummary = error.data;
                        }
                    })
                    .finally(function() {
                        LoadingFactory.hide();
                    });
            }
        };

        /**
         * Show delete dialog for prevent unwanted removals
         */
        this.removeContactDialog = function() {
                var dialog = ngDialog.open({
                    template: "/js/dashboard/edit/sureToDelete.html",
                    className: 'ngdialog-theme-plain',
                    controller: function() {
                        this.removeContact = function() {
                             ContactFactory.remove(self.contact._id)
                                .then(function() {
                                    $state.go("dashboard");
                                    dialog.close();
                                })
                                .catch(function(data) {
                                    self.validationSummary = error.data;
                                });                           
                        }
                        this.close = dialog.close;
                    },
                    controllerAs: "dialog"
                });
        };

        /**
         * Initialize component
         */
        this.init = function() {
            if ($stateParams.id) {
                this.editMode = true;
                if (!$stateParams.contact) {
                    ContactFactory.getById($stateParams.id)
                        .then(function(contact) {
                            self.contact = contact;
                        })
                        .catch(function(error) {
                            self.validationSummary = error.data;
                        });
                } else {
                    this.contact = $stateParams.contact;
                }
            } else {
                this.editMode = false;
            }

            $scope.$watch(function() {
                return self.contact.birthday;
            }, function(unformattedDate){
                self.contact.birthday = $filter('date')(unformattedDate, "yyyy-MM-dd");
            });
        };

        this.init();
    }

})();