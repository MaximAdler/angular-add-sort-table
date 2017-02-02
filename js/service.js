var test = angular.module('test');

test.service('dataService', function($http, $log) {
    this.promise = null;

    function makeRequest() {
        return $http({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/users',
                cache: true
            })
            .error(function() {
                $log.debug('Data is from users.json')
                $http({
                    method: 'GET',
                    url: '../assets/data/users.json',
                    cache: true
                }).then(function(resp) {
                    return resp.data
                })
            })
            .then(function(resp) {
                resp.data.forEach(function(v) {
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
                return resp.data;
            })

    }
    this.getData = function(update) {
        if (update || !this.promise) {
            this.promise = makeRequest();
        }

        return this.promise;
    }

    this.setData = function(person) {
        this.promise = person;
        if (!this.promise) this.promise = this.getData();
        return this.promise
    }

})
