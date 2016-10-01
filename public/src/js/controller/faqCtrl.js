(function(){
    angular.module('gnom-app')
        .controller('faqCtrl', faqController);
    
    function faqController() {
        var vm = this;
        vm.pageClass = 'page-faq';
    }
})();
