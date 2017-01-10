var test = angular.module('test');

test.controller('mainController', ['$scope', '$http', '$log','$rootScope', function($scope, $http, $log, $rootScope) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchPerson = '';

    $http.get('https://jsonplaceholder.typicode.com/users')
        .success(function(data) {
            $scope.people = data;
        })
        .error(function() {
            $log.debug('Using users.json');
            $http.get('./users.json').success(function(data){
              $scope.people = data;
            })
        });


    $rootScope.$on('addPersonRoot',function(){
      $scope.addPerson();
    })

    $scope.addPerson = function(name, username, email, street, suite, city, zipcode, lat, lng, phone, website, coName, catchPhrase, bs) {
        if (this.people.name) {
            $scope.people.push({
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
            $scope.people.name = '';
            $scope.people.username = '';
            $scope.people.email = '';
            $scope.people.address.street = '';
            $scope.people.address.suite = '';
            $scope.people.address.city = '';
            $scope.people.address.zipcode = '';
            $scope.people.address.geo.lat = '';
            $scope.people.address.geo.lng = '';
            $scope.people.phone = '';
            $scope.people.website = '';
            $scope.people.company.name = '';
            $scope.people.company.catchPhrase = '';
            $scope.people.company.bs = '';
        }
    }

    //position...
    // http://stackoverflow.com/questions/13840516/how-to-find-my-distance-to-a-known-location-in-javascript

    //fix

    $scope.getDistance = function(lat1, lng1, lat, lng) {
        lat1 = $scope.people.address.geo.lat;
        lng1 = $scope.people.address.geo.lng;
        window.navigator.geolocation.getCurrentPosition(function(pos) {
            console.log(pos);
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
        })
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat1 - lat); // deg2rad below
        var dLng = deg2rad(lng1 - lng);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lat1)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log(d)
        return d;
    }


}])
