(function() {
    angular.module('gnom-app')
        .directive('serverError', serverError);

    function serverError() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                element.on('keydown', function() {
                    ctrl.$setValidity('server', true);
                });
            }
        };
    }
})();