/**
 * Show a errors summary when the error comes from server
 */
(function() {
    "use strict";

    angular.module("app")
        .directive("validationSummary", ValidationSummaryDirective);


    /**
     * Validation summary deirective
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {summary: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    function ValidationSummaryDirective() {
        return {
            restrict: "EA",
            replace: true,
            scope: { },
            bindToController: {
                summary: "="
            },
            controllerAs: "ctrl",
            controller: ["$scope", function($scope) {
                var self = this;

                self.errorCount = 0;

                $scope.$watch(function() {
                   return self.summary;
                }, function() {
                    if (self.summary && self.summary.errors) {
                        self.errorCount  = Object.keys(self.summary.errors).length;
                    } else {
                        self.errorCount = 0;
                    }
                });
            }],
            templateUrl: "/js/common/directives/validationSummary.html"
        }
    }

})();