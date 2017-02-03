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
