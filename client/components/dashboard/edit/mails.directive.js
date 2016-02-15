/**
 * Manage mails
 */
(function() {
    "use strict";

    /**
     * Mails component
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {emails: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    angular.module("app.dashboard")
        .component("contactMails", {
            restrict: "EA",
            replace: true,
            bindings: {
                emails: "="
            },
            controllerAs: "ctrl",
            controller: function() {
                this.mailsFormVisibility = false;
                this.mailForm = null;

                /**
                 * Add mail to collection
                 * @param mail
                 */
                this.addMail = function(mail) {
                    this.mailForm.submitted = true;

                    if (!this.mailForm) {
                        return;
                    }

                    if (this.mailForm.$invalid) {
                        this.mailForm.submitted = true;
                        return;
                    }

                    this.emails.unshift(mail);
                    this.editMail = {};
                    this.changeMailsFormVisibility(false);
                    this.mailForm.submitted = false;
                    this.mailForm.$setPristine();
                };

                /**
                 * Remove mail from collection
                 * @param $index
                 */
                this.removeMail = function($index) {
                    this.emails.splice($index, 1);
                    this.changeMailsFormVisibility(false);
                };

                /**
                 * Change visibility of the mails form
                 * @param isVisible
                 */
                this.changeMailsFormVisibility = function(isVisible) {
                    this.mailsFormVisibility = isVisible;
                };
            },
            templateUrl: "/components/dashboard/edit/mails.html"
        });

})();