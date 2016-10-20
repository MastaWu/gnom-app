angular.module('gnom-app')
    .directive('activeLink', ['$location', function ($location) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, elem) {
                //after the route has changed
                scope.$on("$stateChangeSuccess", function () {
                    var hrefs = [$location.path()];
                    angular.forEach(elem.find('a'), function (a) {
                        a = angular.element(a);
                        if (((-1 !== hrefs[0].indexOf(a.attr('href').substring(5))) && (a.attr('href').length > 4)) || hrefs[0] === a.attr('href')) {
                            a.parent().addClass('active');
                        } else {
                            a.parent().removeClass('active');
                        }
                    });
                });
            }
        };
    }]);
