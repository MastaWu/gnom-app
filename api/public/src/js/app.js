(function(){
    'use strict';

    config.$inject = ['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$authProvider'];
    run.$inject = ['$rootScope', '$window', '$auth'];
    loginRequired.$inject = ['$q', '$location', '$auth'];
    angular.module('gnom-app',[
        'ui.router',
        'ngMessages',
        'ngStorage',
        'ngAnimate',
        'satellizer',
        'ngSanitize',
        'ui.bootstrap',
        'ngFileUpload'
    ])
        .config(config)
        .run(run);

    function config($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, $authProvider){

        $stateProvider
            .state('home', {
                url: '/app',
                templateUrl: '/views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .state('about', {
                url: '/app/about',
                templateUrl: '/views/about.html',
                controller: 'aboutCtrl',
                controllerAs: 'about'
            })
            .state('deals', {
                url: '/app/deals',
                abstract: true,
                templateUrl: '/views/deals.html',
                controller: 'getAllDealsCtrl',
                controllerAs: 'deal',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('deals.cards', {
                url: '',
                templateUrl: '/views/deals-cards.html',
                controller: 'getAllDealsCtrl',
                controllerAs: 'deal'
            })
            .state('deals.lists', {
                url: '/app/deals/lists',
                templateUrl: '/views/deals-lists.html',
                controller: 'getAllDealsCtrl',
                controllerAs: 'deal'
            })
            .state('detailedDeal', {
                url: '/app/deal/:id',
                templateUrl: '/views/deal-detailed-view.html',
                controller: 'detailedDealCtrl',
                controllerAs: 'detailedDeal'
            })
            .state('faq', {
                url: '/app/faq',
                templateUrl: '/views/faq.html',
                controller: 'faqCtrl',
                controllerAs: 'faq'
            })
            .state('login', {
                url: '/app/login',
                templateUrl: '/views/login.html',
                controller: 'loginCtrl'
            })
            .state('dashboard', {
                url: '/app/dashboard',
                templateUrl: '/views/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'dashboard'
            })
            .state('dashboard.addNewDeal', {
                url: '/addNewDeal',
                onEnter: ['$uibModal', '$state', function($uibModal, $state) {
                    $uibModal.open({
                        templateUrl: '/views/add-deal.html',
                        controller: 'addDealCtrl',
                        controllerAs: 'addDeal'
                    }).result.then(function() {
                        $state.go('dashboard');
                    }, function() {
                        // change route after clicking Cancel button or clicking background
                        $state.go('dashboard');
                    });
                }]
            })
            .state('signup', {
                url: '/app/signup',
                templateUrl: '/views/signup.html',
                controller: 'signupCtrl'
            });
            $urlRouterProvider.otherwise('/app');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        // Use HTML5 History API
        $locationProvider.html5Mode(true);

        $authProvider.loginUrl = '/api/auth/login';
        $authProvider.signupUrl = '/api/auth/signup';
        $authProvider.oauth2({
            name: 'instagram',
            url: 'http://localhost:8080/api/auth/instagram',
            redirectUri: window.location.origin,
            clientId: 'e184998431cd44aa9af937b7e37ecbb9',
            requiredUrlParams: ['scope'],
            scope: ['likes'],
            scopeDelimiter: '+',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
        });

        $urlRouterProvider.rule(function($injector, $location) {

            var path = $location.path();
            var hasTrailingSlash = path[path.length-1] === '/';

            if(hasTrailingSlash) {

                //if last charcter is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                return newPath;
            }

        });
    }

    function run($rootScope, $window, $auth){
        if($auth.isAuthenticated()) {
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        }
    }

    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('app/login');
        }

        return deferred.promise;
    }
})();