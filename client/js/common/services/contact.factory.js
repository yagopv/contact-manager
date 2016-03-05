/**
 * Service for communicating with the contact endpoints
 */
(function() {

    'use strict';

    angular.module("app")
        .factory("ContactFactory", ["$http", "$q", ContactFactory]);

    /**
     * Contact factory service
     * @param $http
     * @param $q
     * @returns {{get: get, getById: getById, add: add, update: update, remove: remove}}
     * @constructor
     */
    function ContactFactory($http, $q) {
        return {

            /**
             * Get contacts (GET)
             * @returns {*}
             */
            get: function() {
                var deferred = $q.defer();

                $http.get("/api/contact")
                    .then(function(contacts) {
                        deferred.resolve(contacts.data);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            /**
             * Get contacts by id (GET)
             * @param id
             * @returns {*}
             */
            getById: function(id) {
                var deferred = $q.defer();

                $http.get("/api/contact/" + id)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            /**
             * Add a new contact (POST)
             * @param contact
             * @returns {*}
             */
            add: function(contact) {
                var deferred = $q.defer();

                $http.post("/api/contact", { contact: contact })
                    .then(function(response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            /**
             * Update contact (PUT)
             * @param id
             * @param contact
             * @returns {*}
             */
            update: function(id, contact) {
                var deferred = $q.defer();

                $http.put("/api/contact/" + id, { contact: contact })
                    .then(function(response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            /**
             * Remove contact (DELETE)
             * @param id
             * @returns {*}
             */
            remove: function(id) {
                var deferred = $q.defer();

                $http.delete("/api/contact/" + id)
                    .then(function(response) {
                        deferred.resolve(response);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }
        };
    }
})();

