(function(){
    'use strict';

    userService.$inject = ['$http', '$localStorage', '$rootScope'];
    angular.module('tomorrow-app')
        .service('userService', userService);

    function userService($http, $localStorage, $rootScope){
        var userService = {};

        userService.login = Login;
        userService.logout = Logout;
        
        return userService;

        function Login(username, password, callback) {
            
            var loginInformation =
            {
                "username" : username,
                "password" : password
            };
            
            console.log(loginInformation);
            
            $http.post('api/auth/login', loginInformation)
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