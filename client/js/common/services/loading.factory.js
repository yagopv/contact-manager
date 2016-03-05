/**
 * Little utility for showing a Loader
 */
(function() {
    'use strict';

    angular.module("app")
        .factory("LoadingFactory", function() {
            return {
                status: false,
                show: function() {
                    this.status = true;
                },
                hide: function() {
                    this.status = false;
                }
            };
        });
})();
