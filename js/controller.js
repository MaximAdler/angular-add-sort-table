var test = angular.module('test');

test.controller('mainController', function($scope, $http, $log, dataService, $rootScope) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchPerson = '';

    dataService.getData().then(function(data) {
        $scope.people = data;
        $log.info('Data is uploaded')

        $scope.editingData = {};

        for (var i = 0; i < $scope.people.length; i++) {
            $scope.editingData[$scope.people[i].id] = false;
        }

        $scope.people.map(function(v) {
            var num = v.phone;
            num.split('').map(function(v) {
                return +v
            })
            var pureNum = num.split('').map(function(v) {
                return +v
            }).filter(function(v) {
                return !isNaN(v)
            })
            var r = [];
            for (var i = 0; i < 11; i++) {
                r.push(pureNum[i])
            }
            v.phone = '(' + r[0] + r[1] + r[2] + ')' + r[3] + r[4] + r[5] + '-' + r[6] + r[7] + r[8] + r[9];
        })

        $scope.modify = function(people) {
            $scope.editingData[people.id] = true;
        };
        $scope.remove = function(i) {
            $scope.people.splice(i - 1, 1);
            var idArr = [];
            var numArr = [];
            for (var j = 0; j < $scope.people.length; j++) {
                numArr.push(j + 1);
                idArr.push($scope.people[j].id)
            }
            for (var k = 0; k < numArr.length; k++) {
                $scope.people[k].id = numArr[k]
            }
        }

        $scope.update = function(people) {
            $scope.editingData[people.id] = false;
        };

    });

    $scope.$watch('people', function(newValue, oldValue) {
        if (newValue != oldValue) dataService.setData(newValue)
    })

})
