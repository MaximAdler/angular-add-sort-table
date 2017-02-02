var test = angular.module('test');

test.controller('mainController', function($scope, $http, $log, dataService, $rootScope) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchPerson = '';


    dataService.getData().then(function(data) {
      $scope.people = data;
      $log.info('Data is uploaded')
    });

    $scope.$watch('people', function(newValue, oldValue) {
        if (newValue != oldValue) dataService.setData(newValue)
        // $log.info($scope.people)
    })
})
