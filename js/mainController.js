var test = angular.module('test');

test.controller('mainController', function($scope, $http, $log, dataService, $modal, $filter) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchPerson = '';

    $scope.people = [];

    dataService.getData().then(function(data) {
        $scope.people = data;
        $log.info('Data is uploaded')

        $scope.people.map(function(v) {
            //PHONE
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

            //GEO
            var lat1 = v.address.geo.lat,
                lng1 = v.address.geo.lng,
                lat,
                lng;

            $http.get("http://ipinfo.io")
                .then(function(response) {
                    var location = response.data.loc.split(',')
                    lat = location[0];
                    lng = location[1];
                    var degToRad = function(deg) {
                        return deg * Math.PI / 180;
                    };
                    var R = 6371; // Radius of the earth in km
                    var dLat = degToRad(lat1 - lat);
                    var dLng = degToRad(lng1 - lng);
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(degToRad(lat)) * Math.cos(degToRad(lat1)) *
                        Math.sin(dLng / 2) * Math.sin(dLng / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c; // Distance in km
                    v.address.geo = Math.floor(d);
                    return v
                })
        })
    });

    $scope.editingData = {};

    for (var i = 0; i < $scope.people.length; i++) {
        $scope.editingData[$scope.people[i].id] = false;
    }




    $scope.modify = function(people) {
        $scope.editingData[people.id] = true;
    };
    $scope.remove = function(i, item) {
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

    $scope.addPerson = function() {
        $scope.people.push({
            //??
            id: $scope.people.length + 1,
            name: $scope.people.name,
            username: $scope.people.username,
            email: $scope.people.email,
            street: $scope.people.address.street,
            suite: $scope.people.address.suite,
            city: $scope.people.address.city,
            zipcode: $scope.people.address.zipcode,
            lat: $scope.people.address.geo.lat,
            lng: $scope.people.address.geo.lng,
            phone: $scope.people.phone,
            website: $scope.people.website,
            coName: $scope.people.company.name,
            catchPhrase: $scope.people.company.catchPhrase,
            bs: $scope.people.company.bs
        })

    }



    $scope.openPopupScreen = function() {

        var modalInstance = $modal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            windowClass: 'app-modal-window',
            templateUrl: '../template/modalContent.html',
            controller: ModalInstanceCtrl
        });
        modalInstance.result.then(function(newPerson) {
            $scope.people.push(newPerson);
        });

    };


    var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.person = {};
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.failed = '';

        $scope.add = function(form) {
            if (form.$valid) {
                $modalInstance.close($scope.person);
            }
            $scope.failed = 'All fields must be filled.';
            // alert('WORK!!!!')
        }
    };

$scope.$watch('people', function(newValue, oldValue) {
    if (newValue != oldValue) {
        dataService.setData(newValue);
    }
})

})
