(function() {
    checkoutService.$inject = ['$http'];
    angular.module('gnom-app')
        .factory('checkoutService', checkoutService);

    function checkoutService($http) {
        return {
            checkout: checkout
        };

        function checkout(checkoutInfo) {
            return $http.post('/api/order', checkoutInfo)
                .then(checkoutComplete)
                .catch(checkoutFailed);
        }

        function checkoutComplete(res) {
            return res.data;
        }

        function checkoutFailed(err) {
            console.log("checkoutFailed: " + err);
        }
    }
})();