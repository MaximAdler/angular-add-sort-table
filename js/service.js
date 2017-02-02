var test = angular.module('test');

test.service('dataService', function($http, $log) {
    this.promise = null;

    function makeRequest() {
        return $http.get('https://jsonplaceholder.typicode.com/users')
            .error(function() {
                $log.debug('Data is from users.json')
                $http.get('../users.json').then(function(resp) {
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
        if (!this.promise) this.promise = getData();
        return this.promise
    }

})
