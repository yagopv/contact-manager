/**
 * Directive for scale up the app panels on hover
 */
(function() {
    "use strict";

    angular.module("app.common")
        .directive("cmScalePanel", ScalePanelDirective);

    /**
     * Scale panel directive
     * @returns {{restrict: string, link: link}}
     * @constructor
     */
    function ScalePanelDirective() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on("mouseenter", function() {
                    element.addClass("scale");
                });
                element.on("mouseleave", function() {
                    element.removeClass("scale");
                });
            }
        }
    }

})();