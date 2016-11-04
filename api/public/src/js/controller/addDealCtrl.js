(function() {
    addDealController.$inject = ['$scope', 'Upload', '$timeout', '$uibModalInstance'];
    angular.module('gnom-app')
        .controller('addDealCtrl', addDealController);

    function addDealController($scope, Upload, $timeout, $uibModalInstance) {
        var vm = this;

        // $scope.$watch('files', function () {
        //     $scope.upload($scope.files);
        // });
        // $scope.$watch('file', function () {
        //     if ($scope.file !== null) {
        //         $scope.files = [$scope.file];
        //     }
        // });
        $scope.log = '';

        $scope.upload = function (files) {
            $scope.files = files;
            if (files && files.length) {
                console.log(files);
                Upload.upload({
                    url: '/api/deal/',
                    arrayKey: '',
                    data: {
                        files: files
                    }
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    // $scope.progress =
                    //     Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progressVisible = true;
                    $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                });
            }
        };

        vm.save = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();