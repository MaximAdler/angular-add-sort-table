var test = angular.module('test');

test.controller('mainController', ['$scope', '$http', function($scope, $http) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchPerson = '';

    $http.get('https://jsonplaceholder.typicode.com/users').success(function(data) {
        $scope.people = data;
    });

   $scope.showAdd = false;


//MODAL DIALOG

 //    $scope.status = '  ';
 //    $scope.customFullscreen = false;
 //
 //
 //    var alert;
 // $scope.showAlert = showAlert;
 // $scope.showDialog = showDialog;
 // $scope.items = [1, 2, 3];
 //
 // // Internal method
 // function showAlert() {
 //   alert = $mdDialog.alert({
 //     title: 'Attention',
 //     textContent: 'This is an example of how easy dialogs can be!',
 //     ok: 'Close'
 //   });
 //
 //   $mdDialog
 //     .show( alert )
 //     .finally(function() {
 //       alert = undefined;
 //     });
 // }
 //
 // function showDialog($event) {
 //    var parentEl = angular.element(document.body);
 //    $mdDialog.show({
 //      parent: parentEl,
 //      targetEvent: $event,
 //      template:
 //        '<md-dialog aria-label="List dialog">' +
 //        '  <md-dialog-content>'+
 //        '    <md-list>'+
 //        '      <md-list-item ng-repeat="item in items">'+
 //        '       <p>Number {{item}}</p>' +
 //        '      '+
 //        '    </md-list-item></md-list>'+
 //        '  </md-dialog-content>' +
 //        '  <md-dialog-actions>' +
 //        '    <md-button ng-click="closeDialog()" class="md-primary">' +
 //        '      Close Dialog' +
 //        '    </md-button>' +
 //        '  </md-dialog-actions>' +
 //        '</md-dialog>',
 //      locals: {
 //        items: $scope.items
 //      },
 //      controller: DialogController
 //   });
 //   function DialogController($scope, $mdDialog, items) {
 //     $scope.items = items;
 //     $scope.closeDialog = function() {
 //       $mdDialog.hide();
 //     }
 //   }
 // }
 //    $scope.showAlert = function(ev) {
 //        // Appending dialog to document.body to cover sidenav in docs app
 //        // Modal dialogs should fully cover application
 //        // to prevent interaction outside of dialog
 //        $mdDialog.show(
 //            $mdDialog.alert()
 //            .parent(angular.element(document.querySelector('#popupContainer')))
 //            .clickOutsideToClose(true)
 //            .title('This is an alert title')
 //            .textContent('You can specify some description text in here.')
 //            .ariaLabel('Alert Dialog Demo')
 //            .ok('Got it!')
 //            .targetEvent(ev)
 //        );
 //    };
 //
 //    function DialogController($scope, $mdDialog) {
 //        $scope.hide = function() {
 //            $mdDialog.hide();
 //        };
 //
 //        $scope.cancel = function() {
 //            $mdDialog.cancel();
 //        };
 //
 //        $scope.answer = function(answer) {
 //            $mdDialog.hide(answer);
 //        };
 //    }

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
