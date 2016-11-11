(function(){
    aboutController.$inject = ['aboutService'];
    angular.module('gnom-app')
        .controller('aboutCtrl', aboutController);
    
    function aboutController() {
        var vm = this;
    }
})();