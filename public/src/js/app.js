(function(){
    'use strict';
    
    config.$inject = ['$routeProvider', '$httpProvider', '$locationProvider', '$authProvider'];
    run.$inject = ['$rootScope', '$window', '$auth'];
    angular.module('tomorrow-app',[
        'ngRoute',
        'ngMessages',
        'ngStorage',
        'ngAnimate',
        'satellizer'
    ])
        .config(config)
        .run(run);

    function config($routeProvider, $httpProvider, $locationProvider, $authProvider){

        $routeProvider
            .when('/', {
                templateUrl: '/views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .when('/about', {
                templateUrl: '/views/about.html',
                controller: 'aboutCtrl',
                controllerAs: 'about'
            })
            .when('/faq', {
                templateUrl: '/views/faq.html',
                controller: 'faqCtrl',
                controllerAs: 'faq'
            })
            .when('/login', {
                templateUrl: '/views/login.html',
                controller: 'loginCtrl'
            })
            .when('/signup', {
                templateUrl: '/views/signup.html',
                controller: 'signupCtrl'
            })
            .otherwise('/');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        // Use HTML5 History API
        $locationProvider.html5Mode(true);

        $authProvider.loginUrl = '/api/auth/login';
        $authProvider.signupUrl = '/api/auth/signup';
        $authProvider.oauth2({
            name: 'instagram',
            url: 'http://localhost:8080/api/auth/instagram',
            redirectUri: 'http://localhost:8080',
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
})();