/**
 * Account module definition
 */
(function(){

    "use strict";

    angular.module('contactManager.account', ['contactManager.common', 'toastr', 'ngMessages']);

})();
/**
 * Define module contactManager.common
 */
(function() {
    angular.module("contactManager.common", ["ui.router", "satellizer"])
        .config([
            "$stateProvider",
            "$urlRouterProvider",
            '$authProvider',
            Router ]);

    /**
     * The router
     * @param $stateProvider
     * @param $urlRouterProvider
     * @constructor
     */
    function Router($stateProvider, $urlRouterProvider, $authProvider){

        /**
         * Home
         */
        $stateProvider.state('home', {
            url: "/",
            templateUrl: '/components/home/home.html'
        });

        /**
         * Dashboard
         */
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            controller: "DashboardController",
            controllerAs: "dashboard",
            resolve: {
                loginRequired: loginRequired
            },
            templateUrl: '/components/dashboard/dashboard.html'
        });

        /**
         * Add new contact
         */
        $stateProvider.state('newContact', {
            url: "/dashboard/contact/new",
            controller: "EditContactController",
            controllerAs: "editContact",
            resolve: {
                loginRequired: loginRequired
            },
            templateUrl: '/components/dashboard/edit/editContact.html'
        });

        /**
         * Edit contact
         */
        $stateProvider.state('editContact', {
            url: "/dashboard/contact/:id",
            controller: "EditContactController",
            controllerAs: "editContact",
            resolve: {
                loginRequired: loginRequired
            },
            templateUrl: '/components/dashboard/edit/editContact.html'
        });

        /**
         * About
         */
        $stateProvider.state('about', {
            url: "/about",
            templateUrl: '/components/about/about.html'
        });

        /**
         * Login
         */
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            controllerAs: 'login',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            },
            templateUrl: '/components/account/login/login.html'
        });

        /**
         * Signup
         */
        $stateProvider.state('signup', {
            url: '/signup',
            controller: 'SignupController',
            controllerAs: 'signup',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            },
            templateUrl: '/components/account/signup/signup.html'
        });

        /**
         * Logout
         */
        $stateProvider.state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutController'
        });

        /**
         * Profile
         */
        $stateProvider.state('profile', {
            url: '/profile',
            controller: 'ProfileController',
            controllerAs: 'profile',
            resolve: {
                loginRequired: loginRequired
            },
            templateUrl: '/components/account/profile/profile.html'
        });

        /**
         * When not route found go to 404 route
         */
        $stateProvider.state('404', {
            url: "/404",
            templateUrl: '/components/errors/404.html'
        });

        $urlRouterProvider.when("", "/");
        $urlRouterProvider.otherwise('/404');

        $authProvider.google({
            clientId: '449344279332-bcfhd8oar650umuve9sk73hios44dh63.apps.googleusercontent.com'
        });

        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }
    }
})();


/**
 * Dashboard module definition
 */
(function(){

    "use strict";

    angular.module('contactManager.dashboard', [
            "contactManager.common",
            "ui.bootstrap.datetimepicker",
            "ngDialog"]);

})();
/**
 * Close Bootstrap Navbar
 * Useful for page transitions
 */
(function() {

    "use strict";

    angular.module("contactManager.common")
        .directive("cmCloseNavbar", CloseNavbar);

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
(function() {

    "use strict";

    angular.module("contactManager.common")
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
(function() {

    "use strict";

    angular.module("contactManager.common")
        .directive("passwordMatch", [PasswordMatchDirective]);

    function PasswordMatchDirective() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=passwordMatch'
            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue === scope.otherModelValue;
                };
                scope.$watch('otherModelValue', function() {
                    ngModel.$validate();
                });
            }
        };
    }

})();
(function() {

    "use strict";

    angular.module("contactManager.common")
        .directive("passwordStrength", [PasswordStrengthDirective]);

    function PasswordStrengthDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var indicator = element.children();
                var dots = Array.prototype.slice.call(indicator.children());
                var weakest = dots.slice(-1)[0];
                var weak = dots.slice(-2);
                var strong = dots.slice(-3);
                var strongest = dots.slice(-4);

                element.after(indicator);

                element.bind('keyup', function() {
                    var matches = {
                            positive: {},
                            negative: {}
                        },
                        counts = {
                            positive: {},
                            negative: {}
                        },
                        tmp,
                        strength = 0,
                        letters = 'abcdefghijklmnopqrstuvwxyz',
                        numbers = '01234567890',
                        symbols = '\\!@#$%&/()=?¿',
                        strValue;

                    angular.forEach(dots, function(el) {
                        el.style.backgroundColor = '#ebeef1';
                    });

                    if (ngModel.$viewValue) {
                        // Increase strength level
                        matches.positive.lower = ngModel.$viewValue.match(/[a-z]/g);
                        matches.positive.upper = ngModel.$viewValue.match(/[A-Z]/g);
                        matches.positive.numbers = ngModel.$viewValue.match(/\d/g);
                        matches.positive.symbols = ngModel.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g);
                        matches.positive.middleNumber = ngModel.$viewValue.slice(1, -1).match(/\d/g);
                        matches.positive.middleSymbol = ngModel.$viewValue.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

                        counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
                        counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
                        counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
                        counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

                        counts.positive.numChars = ngModel.$viewValue.length;
                        tmp += (counts.positive.numChars >= 8) ? 1 : 0;

                        counts.positive.requirements = (tmp >= 3) ? tmp : 0;
                        counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
                        counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

                        // Decrease strength level
                        matches.negative.consecLower = ngModel.$viewValue.match(/(?=([a-z]{2}))/g);
                        matches.negative.consecUpper = ngModel.$viewValue.match(/(?=([A-Z]{2}))/g);
                        matches.negative.consecNumbers = ngModel.$viewValue.match(/(?=(\d{2}))/g);
                        matches.negative.onlyNumbers = ngModel.$viewValue.match(/^[0-9]*$/g);
                        matches.negative.onlyLetters = ngModel.$viewValue.match(/^([a-z]|[A-Z])*$/g);

                        counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
                        counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
                        counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

                        // Calculations
                        strength += counts.positive.numChars * 4;
                        if (counts.positive.upper) {
                            strength += (counts.positive.numChars - counts.positive.upper) * 2;
                        }
                        if (counts.positive.lower) {
                            strength += (counts.positive.numChars - counts.positive.lower) * 2;
                        }
                        if (counts.positive.upper || counts.positive.lower) {
                            strength += counts.positive.numbers * 4;
                        }
                        strength += counts.positive.symbols * 6;
                        strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
                        strength += counts.positive.requirements * 2;

                        strength -= counts.negative.consecLower * 2;
                        strength -= counts.negative.consecUpper * 2;
                        strength -= counts.negative.consecNumbers * 2;

                        if (matches.negative.onlyNumbers) {
                            strength -= counts.positive.numChars;
                        }
                        if (matches.negative.onlyLetters) {
                            strength -= counts.positive.numChars;
                        }

                        strength = Math.max(0, Math.min(100, Math.round(strength)));

                        if (strength > 85) {
                            angular.forEach(strongest, function(el) {
                                el.style.backgroundColor = '#008cdd';
                            });
                        } else if (strength > 65) {
                            angular.forEach(strong, function(el) {
                                el.style.backgroundColor = '#6ead09';
                            });
                        } else if (strength > 30) {
                            angular.forEach(weak, function(el) {
                                el.style.backgroundColor = '#e09115';
                            });
                        } else {
                            weakest.style.backgroundColor = '#e01414';
                        }
                    }
                });
            },
            template: '<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
        };
    }

})();
/**
 * Directive for scale up the app panels on hover
 */
(function() {
    "use strict";

    angular.module("contactManager.common")
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
/**
 * Show a errors summary when the error comes from server
 */
(function() {
    "use strict";

    angular.module("contactManager.common")
        .directive("cmValidationSummary", ValidationSummaryDirective);


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
            templateUrl: "/components/common/directives/validationSummary.html"
        }
    }

})();
/**
 * This directive will encapsulate the address management
 */
(function() {

    "use strict";

    angular.module("contactManager.dashboard")
        .directive("cmAddresses", AddressesDirective);

    /**
     * Address directive
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {addresses: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    function AddressesDirective() {

        return {
            restrict: "EA",
            replace: true,
            scope: { },
            bindToController: {
                addresses: "="
            },
            controllerAs: "ctrl",
            controller: function() {
                this.addressFormVisibility = false;
                this.addressForm = null;
                this.address = { street: []};
                this.editMode = false;

                /**
                 * Add address to collection
                 * @param address
                 */
                this.addOrUpdateAddress = function(address) {
                    this.addressForm.submitted = true;

                    if (!this.addressForm) {
                        return;
                    }

                    if (this.addressForm.$invalid) {
                        return;
                    }

                    if (!this.editMode) {
                        this.addresses.unshift(address);
                    } else {
                        this.editMode = false;
                    }

                    this.changeAddressFormVisibility(false);
                    this.addressForm.$setPristine();
                    this.addressForm.submitted = false;
                    this.address = { street: []};
                };

                /**
                 * Edit address. Show form
                 * @param address
                 */
                this.editAddress = function(address) {
                    this.changeAddressFormVisibility(true);
                    this.address = address;
                    this.editMode = true;
                };

                /**
                 * Remove address from collection
                 * @param $index
                 */
                this.removeAddress = function($index, $event) {
                    $event.stopPropagation();

                    this.addresses.splice($index, 1);
                    this.changeAddressFormVisibility(false);
                };

                /**
                 * Change form visibility
                 * @param isVisible
                 */
                this.changeAddressFormVisibility = function(isVisible) {
                    this.addressFormVisibility = isVisible;
                };

                /**
                 * Cancel address edition. Hide form address
                 */
                this.cancelEdit = function() {
                    this.address = { street: []};
                    this.changeAddressFormVisibility(false);
                };
            },
            templateUrl: "/components/dashboard/edit/addresses.html"
        }

    }

})();
/**
 * Manage mails
 */
(function() {
    "use strict";

    angular.module("contactManager.dashboard")
        .directive("cmMails", MailsDirective);

    /**
     * Mails directive
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {emails: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    function MailsDirective() {
        return {
            restrict: "EA",
            replace: true,
            scope: { },
            bindToController: {
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
        }
    }

})();
/**
 * Manage phones
 */
(function() {
    "use strict";

    angular.module("contactManager.dashboard")
        .directive("cmPhones", PhonesDirective);

    /**
     * Phones directive
     * @returns {{restrict: string, replace: boolean, scope: {}, bindToController: {phones: string}, controllerAs: string, controller: controller, templateUrl: string}}
     * @constructor
     */
    function PhonesDirective() {
        return {
            restrict: "EA",
            replace: true,
            scope: { },
            bindToController: {
                phones: "="
            },
            controllerAs: "ctrl",
            controller: function() {
                this.phoneFormVisibility = false;
                this.phoneForm = null;

                /**
                 * Add phone to collection
                 * @param phone
                 */
                this.addPhone = function(phone) {
                    this.phoneForm.submitted = true;

                    if (!this.phoneForm) {
                        return;
                    }

                    if (this.phoneForm.$invalid) {
                        return;
                    }

                    this.phones.unshift(phone);
                    this.editPhone = {};
                    this.changePhonesFormVisibility(false);
                    this.phoneForm.$setPristine();
                    this.phoneForm.submitted = false;
                };

                /**
                 * Remove phone from collection
                 * @param $index
                 */
                this.removePhone = function($index) {
                    this.phones.splice($index, 1);
                    this.changePhonesFormVisibility(false);
                };

                /**
                 * Change phones form visibility
                 * @param isVisible
                 */
                this.changePhonesFormVisibility = function(isVisible) {
                    this.phoneFormVisibility = isVisible;
                };
            },
            templateUrl: "/components/dashboard/edit/phones.html"
        }
    }

})();
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
/**
 * Service for communicating with the contact endpoints
 */
(function() {

    angular.module("contactManager.common")
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
        }
    };
})();


/**
 * Little utility for showing a Loader
 */
(function() {
    angular.module("contactManager.common")
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

/**
 * Dashboard view controller
 */
(function(){

    "use strict";

    angular.module('contactManager.dashboard')
        .controller('DashboardController', ["ContactFactory", "$state", "LoadingFactory" ,DashboardController]);

    /**
     * Dashboard controller
     * @param ContactFactory
     * @param $state
     * @param LoadingFactory
     * @constructor
     */
    function DashboardController(ContactFactory, $state, LoadingFactory) {
        var self = this;

        LoadingFactory.show();

        ContactFactory.get()
            .then(function(contacts) {
                self.contacts = contacts;
            })
            .catch(function(error) {

            })
            .finally(function() {
                LoadingFactory.hide();
            });

        this.editContact = function(contact) {
            $state.go("editContact",  { id: contact._id });
        }
    }

})();
(function() {
   'use strict';

    angular.module('contactManager.account')
        .controller('LoginController', ['$location', '$auth', 'toastr', LoginController]);

    function LoginController($location, $auth, toastr) {
        this.login = function() {
            $auth.login(this.user)
                .then(function() {
                    toastr.success('You have successfully signed in!');
                    $location.path('/');
                })
                .catch(function(error) {
                    toastr.error(error.data.message, error.status);
                });
        };

        this.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    toastr.success('You have successfully signed in with ' + provider + '!');
                    $location.path('/');
                })
                .catch(function(error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        toastr.error(error.error);
                    } else if (error.data) {
                        // HTTP response error from server
                        toastr.error(error.data.message, error.status);
                    } else {
                        toastr.error(error);
                    }
                });
        };
    }

})();
(function() {

    'use strict';

    angular.module('contactManager.account')
        .controller('LogoutController', ['$auth', 'toastr', '$state', LogoutController]);

    function LogoutController($auth, toastr, $state) {
        if (!$auth.isAuthenticated()) { return; }
        $auth.logout()
            .then(function() {
                toastr.info('You have been logged out');
                $state.go("home");
            });
    };

})();
(function() {

    'use strict';

    angular.module('contactManager.account')
        .controller('ProfileController', ['$auth', 'toastr', 'AccountFactory', ProfileController]);

    function ProfileController($auth, toastr, Account) {
        var self = this;

        this.getProfile = function() {
            Account.getProfile()
                .then(function(response) {
                    self.user = response.data;
                })
                .catch(function(response) {
                    toastr.error(response.data.message, response.status);
                });
        };

        this.updateProfile = function() {
            Account.updateProfile(this.user)
                .then(function() {
                    toastr.success('Profile has been updated');
                })
                .catch(function(response) {
                    toastr.error(response.data.message, response.status);
                });
        };

        this.link = function(provider) {
            $auth.link(provider)
                .then(function() {
                    toastr.success('You have successfully linked a ' + provider + ' account');
                    self.getProfile();
                })
                .catch(function(response) {
                    toastr.error(response.data.message, response.status);
                });
        };

        this.unlink = function(provider) {
            $auth.unlink(provider)
                .then(function() {
                    toastr.info('You have unlinked a ' + provider + ' account');
                    self.getProfile();
                })
                .catch(function(response) {
                    toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
                });
        };

        this.getProfile();
    }
})();
(function() {
   'use strict';

    angular.module('contactManager.account')
        .controller('SignupController', ['$location', '$auth', 'toastr', SignupController]);

    function SignupController($location, $auth, toastr) {
        var self = this;
        this.signup = function() {
            $auth.signup(self.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $location.path('/');
                    toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    toastr.error(response.data.message);
                });
        };
    }
})();
/**
 * This controller allow the contact edit/add management
 */
(function() {

    "use strict";

    angular.module("contactManager.dashboard")
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
                    template: "/components/dashboard/edit/sureToDelete.html",                    
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
/**
 * Main Module definition
 * Configure app, main controller, providers, ...etc
 */
(function() {

    "use strict";

    angular.module("contactManager", [
            "contactManager.dashboard",
            "contactManager.account",
            "contactManager.common"])

        .config(["$uiViewScrollProvider", Config ])
        .controller("AppController", [ "LoadingFactory", "$auth", AppController ]);

    /**
     * Config app
     * @param $uiViewScrollProvider
     * @constructor
     */
    function Config($uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
    }

    /**
     * Main base controller
     * @param LoadingFactory
     * @param $scope
     * @constructor
     */
    function AppController(LoadingFactory, $auth) {
        this.loading = LoadingFactory;
        this.isAuthenticated = $auth.isAuthenticated;
    }

})();