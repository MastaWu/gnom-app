(function(){
    'use strict';
    
    angular.module('tomorrow-app',[
        'ngRoute',
        'ngMaterial',
        'ngMessages',
        'ngStorage',
        'ngAnimate'
    ])
        .config(config)
        .run(run);

    function config($routeProvider, $httpProvider, $locationProvider){

        $routeProvider.when('/', {
            templateUrl: '/assets/views/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        }).when('/about', {
            templateUrl: '/assets/views/about.html',
            controller: 'aboutCtrl',
            controllerAs: 'about'
        }).when('/faq', {
            templateUrl: '/assets/views/faq.html',
            controller: 'faqCtrl',
            controllerAs: 'faq'
        }).when('/login', {
            templateUrl: '/assets/views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'login'
        }).otherwise('/');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        // Use HTML5 History API
        $locationProvider.html5Mode(true);
    };

    function run($rootScope, $http, $location, $localStorage){
        // keep user logged in after page refresh
        if($localStorage.currentUser){
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            $rootScope.currentUserSignedIn = true;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var publicPages = ['/', '/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if(restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    };
})();