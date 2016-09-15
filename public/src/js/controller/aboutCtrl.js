(function(){
    angular.module('tomorrow-app')
        .controller('aboutCtrl', aboutController);
    
    function aboutController(aboutService) {
        var vm = this;
        vm.pageClass = 'page-about';
        
        vm.greeting = {};
        var response = aboutService.checkRole();
        response.then(function(data){
            vm.greeting = data;
            console.log(JSON.stringify(vm.greeting));
        });
    };
})();