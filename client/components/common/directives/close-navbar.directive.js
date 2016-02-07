/**
 * Close Bootstrap Navbar
 * Useful for page transitions
 */
(function() {

    "use strict";

    angular.module("app.common")
        .directive("closeNavbar", CloseNavbar);

    /**
     * Close navbar directive
     * @returns {{link: link}}
     * @constructor
     */
    function CloseNavbar() {
        return {
            link: function(scope, element, attrs) {
                element.on("click", function() {
                    $('#navbar').removeClass("in");
                });
            }
        }
    }

})();