(function() {

    "use strict";

    angular.module("app.common")
        .directive("cmLoader", ["LoadingFactory", "$window", LoaderDirective]);

    function LoaderDirective(LoadingFactory, $window) {
        return {
            restrict: "EAC",
            scope: { },
            bindToController: {
                show: "="
            },
            controllerAs: "ctrl",
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    return ctrl.show;
                }, function(newVal) {
                    if (newVal == true) {
                        var newHeight = $window.innerHeight / 2;
                        element.find("i").css("top", newHeight);
                    }
                })
            },
            controller: function() { },
            templateUrl: "/components/common/directives/loader.html"
        }
    }

})();