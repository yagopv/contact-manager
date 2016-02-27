/**
 * Little utility for showing a Loader
 */
(function() {
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
            }
        });
})();
