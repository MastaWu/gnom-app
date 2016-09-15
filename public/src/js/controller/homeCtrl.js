(function(){
     angular.module('tomorrow-app')
         .controller('homeCtrl', homeController);
        
        function homeController(homeService) {
            var vm = this;
            vm.pageClass = "page-home";
        };
})();