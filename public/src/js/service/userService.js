(function(){
    'use strict';

    angular.module('tomorrow-app')
        .factory('userService', service);

    function service($http, $localStorage, $rootScope){
        var service = {};

        service.login = Login;
        service.logout = Logout;
        
        return service;

        function Login(username, password, callback) {
            
            var loginInformation =
            {
                "username" : username,
                "password" : password
            };
            
            console.log(loginInformation);
            
            $http.post('/user/login', loginInformation)
                .then(function(response){
                    // login successful if there's a token in the response
                    if(response.data.token){

                        var currentUser = {
                            "username": loginInformation.username,
                            "token": response.data.token
                        };

                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = currentUser;
                        console.log($localStorage.currentUser);
                        // add jwt token to the auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        
                        $rootScope.currentUserSignedIn = true;
                        
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
        }
        
        function Logout(){
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $rootScope.currentUserSignedIn = false;
            console.log("User logged out in service too");
            console.log($rootScope.currentUserSignedIn);
        }
    }
})();