/**
 * Service for dealing with account communication
 */
(function() {

    angular.module("contactManager.common")
        .factory("AccountFactory", ["$http", AccountFactory]);

    function AccountFactory($http)  {
        return {
            /**
             * Get User profile
             * @returns {*}
             */
            getProfile: function() {
                return $http.get('/api/me');
            },
            /**
             * Update User profile
             * @param profileData
             * @returns {*}
             */
            updateProfile: function(profileData) {
                return $http.put('/api/me', profileData);
            }
        };
    }
})();