var test = angular.module('test');

test.controller('ModalDemoCtrl', ['$http','$scope','$uibModal', '$log','$document', function ($http, $scope, $uibModal, $log, $document, Data) {
  var $ctrl = this;


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

  //
  $ctrl.items = [];
  //

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './template/myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

  };

  $ctrl.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });
  };
}]);

test.controller('ModalInstanceCtrl',['$uibModalInstance','items','$scope', '$rootScope', function ($uibModalInstance, items, $scope, $rootScope) {
  var $ctrl = this;
  $ctrl.items = items;

//submit must be there
  $ctrl.ok = function () {
    //fix
    $scope.$emit('addPerson',{})
    $uibModalInstance.close('closed');
    // $rootScope.$emit('addPersonRoot',{});
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


test.component('modalComponent', {
  templateUrl: './template/myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.ok = function () {
      //main mb
      $ctrl.close({$value: 1});
          // $rootScope.$emit('addPersonRoot',{});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
