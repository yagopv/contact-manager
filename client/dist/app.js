!function(){"use strict";angular.module("contactManager.account",["contactManager.common","toastr","ngMessages"])}(),function(){function t(t,e,o){function n(t,e){var o=t.defer();return e.isAuthenticated()?o.reject():o.resolve(),o.promise}function i(t,e,o){var n=t.defer();return o.isAuthenticated()?n.resolve():e.path("/login"),n.promise}t.state("home",{url:"/",templateUrl:"/components/home/home.html"}),t.state("dashboard",{url:"/dashboard",controller:"DashboardController",controllerAs:"dashboard",resolve:{loginRequired:["$q","$location","$auth",i]},templateUrl:"/components/dashboard/dashboard.html"}),t.state("newContact",{url:"/dashboard/contact/new",controller:"EditContactController",controllerAs:"editContact",resolve:{loginRequired:["$q","$location","$auth",i]},templateUrl:"/components/dashboard/edit/editContact.html"}),t.state("editContact",{url:"/dashboard/contact/:id",controller:"EditContactController",controllerAs:"editContact",resolve:{loginRequired:["$q","$location","$auth",i]},templateUrl:"/components/dashboard/edit/editContact.html"}),t.state("about",{url:"/about",templateUrl:"/components/about/about.html"}),t.state("login",{url:"/login",controller:"LoginController",controllerAs:"login",resolve:{skipIfLoggedIn:["$q","$auth",n]},templateUrl:"/components/account/login/login.html"}),t.state("signup",{url:"/signup",controller:"SignupController",controllerAs:"signup",resolve:{skipIfLoggedIn:["$q","$auth",n]},templateUrl:"/components/account/signup/signup.html"}),t.state("logout",{url:"/logout",template:null,controller:"LogoutController"}),t.state("profile",{url:"/profile",controller:"ProfileController",controllerAs:"profile",resolve:{loginRequired:["$q","$location","$auth",i]},templateUrl:"/components/account/profile/profile.html"}),t.state("404",{url:"/404",templateUrl:"/components/errors/404.html"}),e.when("","/"),e.otherwise("/404"),o.google({clientId:"449344279332-bcfhd8oar650umuve9sk73hios44dh63.apps.googleusercontent.com"})}angular.module("contactManager.common",["ui.router","satellizer"]).config(["$stateProvider","$urlRouterProvider","$authProvider",t])}(),function(){"use strict";angular.module("contactManager.dashboard",["contactManager.common","ui.bootstrap.datetimepicker","ngDialog"])}(),function(){"use strict";function t(){return{link:function(t,e,o){e.on("click",function(){$("#navbar").removeClass("in")})}}}angular.module("contactManager.common").directive("cmCloseNavbar",t)}(),function(){"use strict";function t(t,e){return{restrict:"EAC",scope:{},bindToController:{show:"="},controllerAs:"ctrl",link:function(t,o,n,i){t.$watch(function(){return i.show},function(t){if(1==t){var n=e.innerHeight/2;o.find("i").css("top",n)}})},controller:function(){},templateUrl:"/components/common/directives/loader.html"}}angular.module("contactManager.common").directive("cmLoader",["LoadingFactory","$window",t])}(),function(){"use strict";function t(){return{require:"ngModel",scope:{otherModelValue:"=passwordMatch"},link:function(t,e,o,n){n.$validators.compareTo=function(e){return e===t.otherModelValue},t.$watch("otherModelValue",function(){n.$validate()})}}}angular.module("contactManager.common").directive("passwordMatch",[t])}(),function(){"use strict";function t(){return{restrict:"A",require:"ngModel",link:function(t,e,o,n){var i=e.children(),a=Array.prototype.slice.call(i.children()),r=a.slice(-1)[0],s=a.slice(-2),c=a.slice(-3),l=a.slice(-4);e.after(i),e.bind("keyup",function(){var t,e={positive:{},negative:{}},o={positive:{},negative:{}},i=0;angular.forEach(a,function(t){t.style.backgroundColor="#ebeef1"}),n.$viewValue&&(e.positive.lower=n.$viewValue.match(/[a-z]/g),e.positive.upper=n.$viewValue.match(/[A-Z]/g),e.positive.numbers=n.$viewValue.match(/\d/g),e.positive.symbols=n.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g),e.positive.middleNumber=n.$viewValue.slice(1,-1).match(/\d/g),e.positive.middleSymbol=n.$viewValue.slice(1,-1).match(/[$-/:-?{-~!^_`\[\]]/g),o.positive.lower=e.positive.lower?e.positive.lower.length:0,o.positive.upper=e.positive.upper?e.positive.upper.length:0,o.positive.numbers=e.positive.numbers?e.positive.numbers.length:0,o.positive.symbols=e.positive.symbols?e.positive.symbols.length:0,o.positive.numChars=n.$viewValue.length,t+=o.positive.numChars>=8?1:0,o.positive.requirements=t>=3?t:0,o.positive.middleNumber=e.positive.middleNumber?e.positive.middleNumber.length:0,o.positive.middleSymbol=e.positive.middleSymbol?e.positive.middleSymbol.length:0,e.negative.consecLower=n.$viewValue.match(/(?=([a-z]{2}))/g),e.negative.consecUpper=n.$viewValue.match(/(?=([A-Z]{2}))/g),e.negative.consecNumbers=n.$viewValue.match(/(?=(\d{2}))/g),e.negative.onlyNumbers=n.$viewValue.match(/^[0-9]*$/g),e.negative.onlyLetters=n.$viewValue.match(/^([a-z]|[A-Z])*$/g),o.negative.consecLower=e.negative.consecLower?e.negative.consecLower.length:0,o.negative.consecUpper=e.negative.consecUpper?e.negative.consecUpper.length:0,o.negative.consecNumbers=e.negative.consecNumbers?e.negative.consecNumbers.length:0,i+=4*o.positive.numChars,o.positive.upper&&(i+=2*(o.positive.numChars-o.positive.upper)),o.positive.lower&&(i+=2*(o.positive.numChars-o.positive.lower)),(o.positive.upper||o.positive.lower)&&(i+=4*o.positive.numbers),i+=6*o.positive.symbols,i+=2*(o.positive.middleSymbol+o.positive.middleNumber),i+=2*o.positive.requirements,i-=2*o.negative.consecLower,i-=2*o.negative.consecUpper,i-=2*o.negative.consecNumbers,e.negative.onlyNumbers&&(i-=o.positive.numChars),e.negative.onlyLetters&&(i-=o.positive.numChars),i=Math.max(0,Math.min(100,Math.round(i))),i>85?angular.forEach(l,function(t){t.style.backgroundColor="#008cdd"}):i>65?angular.forEach(c,function(t){t.style.backgroundColor="#6ead09"}):i>30?angular.forEach(s,function(t){t.style.backgroundColor="#e09115"}):r.style.backgroundColor="#e01414")})},template:'<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'}}angular.module("contactManager.common").directive("passwordStrength",[t])}(),function(){"use strict";function t(){return{restrict:"A",link:function(t,e,o){e.on("mouseenter",function(){e.addClass("scale")}),e.on("mouseleave",function(){e.removeClass("scale")})}}}angular.module("contactManager.common").directive("cmScalePanel",t)}(),function(){"use strict";function t(){return{restrict:"EA",replace:!0,scope:{},bindToController:{summary:"="},controllerAs:"ctrl",controller:["$scope",function(t){var e=this;e.errorCount=0,t.$watch(function(){return e.summary},function(){e.summary&&e.summary.errors?e.errorCount=Object.keys(e.summary.errors).length:e.errorCount=0})}],templateUrl:"/components/common/directives/validationSummary.html"}}angular.module("contactManager.common").directive("cmValidationSummary",t)}(),function(){"use strict";function t(){return{restrict:"EA",replace:!0,scope:{},bindToController:{addresses:"="},controllerAs:"ctrl",controller:function(){this.addressFormVisibility=!1,this.addressForm=null,this.address={street:[]},this.editMode=!1,this.addOrUpdateAddress=function(t){this.addressForm.submitted=!0,this.addressForm&&(this.addressForm.$invalid||(this.editMode?this.editMode=!1:this.addresses.unshift(t),this.changeAddressFormVisibility(!1),this.addressForm.$setPristine(),this.addressForm.submitted=!1,this.address={street:[]}))},this.editAddress=function(t){this.changeAddressFormVisibility(!0),this.address=t,this.editMode=!0},this.removeAddress=function(t,e){e.stopPropagation(),this.addresses.splice(t,1),this.changeAddressFormVisibility(!1)},this.changeAddressFormVisibility=function(t){this.addressFormVisibility=t},this.cancelEdit=function(){this.address={street:[]},this.changeAddressFormVisibility(!1)}},templateUrl:"/components/dashboard/edit/addresses.html"}}angular.module("contactManager.dashboard").directive("cmAddresses",t)}(),function(){"use strict";function t(){return{restrict:"EA",replace:!0,scope:{},bindToController:{emails:"="},controllerAs:"ctrl",controller:function(){this.mailsFormVisibility=!1,this.mailForm=null,this.addMail=function(t){if(this.mailForm.submitted=!0,this.mailForm){if(this.mailForm.$invalid)return void(this.mailForm.submitted=!0);this.emails.unshift(t),this.editMail={},this.changeMailsFormVisibility(!1),this.mailForm.submitted=!1,this.mailForm.$setPristine()}},this.removeMail=function(t){this.emails.splice(t,1),this.changeMailsFormVisibility(!1)},this.changeMailsFormVisibility=function(t){this.mailsFormVisibility=t}},templateUrl:"/components/dashboard/edit/mails.html"}}angular.module("contactManager.dashboard").directive("cmMails",t)}(),function(){"use strict";function t(){return{restrict:"EA",replace:!0,scope:{},bindToController:{phones:"="},controllerAs:"ctrl",controller:function(){this.phoneFormVisibility=!1,this.phoneForm=null,this.addPhone=function(t){this.phoneForm.submitted=!0,this.phoneForm&&(this.phoneForm.$invalid||(this.phones.unshift(t),this.editPhone={},this.changePhonesFormVisibility(!1),this.phoneForm.$setPristine(),this.phoneForm.submitted=!1))},this.removePhone=function(t){this.phones.splice(t,1),this.changePhonesFormVisibility(!1)},this.changePhonesFormVisibility=function(t){this.phoneFormVisibility=t}},templateUrl:"/components/dashboard/edit/phones.html"}}angular.module("contactManager.dashboard").directive("cmPhones",t)}(),function(){function t(t){return{getProfile:function(){return t.get("/api/me")},updateProfile:function(e){return t.put("/api/me",e)}}}angular.module("contactManager.common").factory("AccountFactory",["$http",t])}(),function(){function t(t,e){return{get:function(){var o=e.defer();return t.get("/api/contact").then(function(t){o.resolve(t.data)})["catch"](function(t){o.reject(t)}),o.promise},getById:function(o){var n=e.defer();return t.get("/api/contact/"+o).then(function(t){n.resolve(t.data)})["catch"](function(t){n.reject(t)}),n.promise},add:function(o){var n=e.defer();return t.post("/api/contact",{contact:o}).then(function(t){n.resolve(t.data)})["catch"](function(t){n.reject(t)}),n.promise},update:function(o,n){var i=e.defer();return t.put("/api/contact/"+o,{contact:n}).then(function(t){i.resolve(t.data)})["catch"](function(t){i.reject(t)}),i.promise},remove:function(o){var n=e.defer();return t["delete"]("/api/contact/"+o).then(function(t){n.resolve(t)})["catch"](function(t){n.reject(t)}),n.promise}}}angular.module("contactManager.common").factory("ContactFactory",["$http","$q",t])}(),function(){angular.module("contactManager.common").factory("LoadingFactory",function(){return{status:!1,show:function(){this.status=!0},hide:function(){this.status=!1}}})}(),function(){"use strict";function t(t,e,o){var n=this;o.show(),t.get().then(function(t){n.contacts=t})["catch"](function(t){})["finally"](function(){o.hide()}),this.editContact=function(t){e.go("editContact",{id:t._id})}}angular.module("contactManager.dashboard").controller("DashboardController",["ContactFactory","$state","LoadingFactory",t])}(),function(){"use strict";function t(t,e,o){this.login=function(){e.login(this.user).then(function(){o.success("You have successfully signed in!"),t.path("/")})["catch"](function(t){o.error(t.data.message,t.status)})},this.authenticate=function(n){e.authenticate(n).then(function(){o.success("You have successfully signed in with "+n+"!"),t.path("/")})["catch"](function(t){t.error?o.error(t.error):t.data?o.error(t.data.message,t.status):o.error(t)})}}angular.module("contactManager.account").controller("LoginController",["$location","$auth","toastr",t])}(),function(){"use strict";function t(t,e,o){t.isAuthenticated()&&t.logout().then(function(){e.info("You have been logged out"),o.go("home")})}angular.module("contactManager.account").controller("LogoutController",["$auth","toastr","$state",t])}(),function(){"use strict";function t(t,e,o){var n=this;this.getProfile=function(){o.getProfile().then(function(t){n.user=t.data})["catch"](function(t){e.error(t.data.message,t.status)})},this.updateProfile=function(){o.updateProfile(this.user).then(function(){e.success("Profile has been updated")})["catch"](function(t){e.error(t.data.message,t.status)})},this.link=function(o){t.link(o).then(function(){e.success("You have successfully linked a "+o+" account"),n.getProfile()})["catch"](function(t){e.error(t.data.message,t.status)})},this.unlink=function(o){t.unlink(o).then(function(){e.info("You have unlinked a "+o+" account"),n.getProfile()})["catch"](function(t){e.error(t.data?t.data.message:"Could not unlink "+o+" account",t.status)})},this.getProfile()}angular.module("contactManager.account").controller("ProfileController",["$auth","toastr","AccountFactory",t])}(),function(){"use strict";function t(t,e,o){var n=this;this.signup=function(){e.signup(n.user).then(function(n){e.setToken(n),t.path("/"),o.info("You have successfully created a new account and have been signed-in")})["catch"](function(t){o.error(t.data.message)})}}angular.module("contactManager.account").controller("SignupController",["$location","$auth","toastr",t])}(),function(){"use strict";function t(t,e,o,n,i,a,r){var s=this;this.contactFormSubmitted=!1,this.contact={phones:[],emails:[],addresses:[]},this.editMode=!1,this.validationSummary=null,this.saveChanges=function(){this.contactFormSubmitted=!0,this.contactForm.name.$valid,r.show(),s.editMode?t.update(this.contact._id,this.contact).then(function(t){s.contact=t,s.validationSummary=null})["catch"](function(t){400===t.status&&t.data.errors&&(s.validationSummary=t.data)})["finally"](function(){r.hide()}):t.add(this.contact).then(function(t){o.go("editContact",{id:t._id}),s.validationSummary=null})["catch"](function(t){400===t.status&&t.data.errors&&(s.validationSummary=t.data)})["finally"](function(){r.hide()})},this.removeContactDialog=function(){var e=a.open({template:"/components/dashboard/edit/sureToDelete.html",className:"ngdialog-theme-plain",controller:function(){this.removeContact=function(){t.remove(s.contact._id).then(function(){o.go("dashboard"),e.close()})["catch"](function(t){s.validationSummary=error.data})},this.close=e.close},controllerAs:"dialog"})},this.init=function(){e.id?(this.editMode=!0,e.contact?this.contact=e.contact:t.getById(e.id).then(function(t){s.contact=t})["catch"](function(t){s.validationSummary=t.data})):this.editMode=!1,n.$watch(function(){return s.contact.birthday},function(t){s.contact.birthday=i("date")(t,"yyyy-MM-dd")})},this.init()}angular.module("contactManager.dashboard").controller("EditContactController",["ContactFactory","$stateParams","$state","$scope","$filter","ngDialog","LoadingFactory",t])}(),function(){"use strict";function t(t){t.useAnchorScroll()}function e(t,e){this.loading=t,this.isAuthenticated=e.isAuthenticated}angular.module("contactManager",["contactManager.dashboard","contactManager.account","contactManager.common"]).config(["$uiViewScrollProvider",t]).controller("AppController",["LoadingFactory","$auth",e])}();