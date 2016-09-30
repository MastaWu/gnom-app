(function(){
    'use strict';
    
    config.$inject = ['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$authProvider'];
    run.$inject = ['$rootScope', '$window', '$auth'];
    loginRequired.$inject = ['$q', '$location', '$auth'];
    angular.module('tomorrow-app',[
        'ui.router',
        'ngMessages',
        'ngStorage',
        'ngAnimate',
        'satellizer'
    ])
        .config(config)
        .run(run);

    function config($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, $authProvider){

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about.html',
                controller: 'aboutCtrl',
                controllerAs: 'about'
            })
            .state('deals', {
                url: '/deals',
                templateUrl: '/views/deals.html',
                controller: 'getAllDealsCtrl',
                controllerAs: 'deal',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('faq', {
                url: '/faq',
                templateUrl: '/views/faq.html',
                controller: 'faqCtrl',
                controllerAs: 'faq'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'loginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: '/views/signup.html',
                controller: 'signupCtrl'
            });
            $urlRouterProvider.otherwise('/');

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
            $location.path('/login');
        }

        return deferred.promise;
    }
})();