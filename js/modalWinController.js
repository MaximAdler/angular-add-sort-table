var test = angular.module('test');

test.controller('ModalDemoCtrl', function ($scope, $uibModal, $log, $document, dataService) {
  var $ctrl = this;



  dataService.getData().then(function(data) {
    $ctrl.people = data;
  });

  $scope.$watch('people', function(newValue, oldValue) {
      if (newValue != oldValue) dataService.setData(newValue)
  })


  $ctrl.addPerson = function(name, username, email, street, suite, city, zipcode, lat, lng, phone, website, coName, catchPhrase, bs) {
      if (this.people.name) {
          $ctrl.people.push({
              id: $ctrl.people.length + 1,
              name: $ctrl.people.name,
              username: $ctrl.people.username,
              email: $ctrl.people.email,
              street: $ctrl.people.address.street,
              suite: $ctrl.people.address.suite,
              city: $ctrl.people.address.city,
              zipcode: $ctrl.people.address.zipcode,
              lat: $ctrl.people.address.geo.lat,
              lng: $ctrl.people.address.geo.lng,
              phone: $ctrl.people.phone,
              website: $ctrl.people.website,
              coName: $ctrl.people.company.name,
              catchPhrase: $ctrl.people.company.catchPhrase,
              bs: $ctrl.people.company.bs
          })
        }
      }
  // $ctrl.newPerson ={}

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './template/ModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        people: function () {
          return $ctrl.people;
        }
      }
    });
    modalInstance.result.then(function () {
      $ctrl.addPerson();
    }, function () {
      $log.info('Modal don\'t want to add new Person');
    });
  };

  $ctrl.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'modalComponent',
      resolve: {
        people: function () {
          return $ctrl.people;
        }
      }
    });
  };

  // $scope.$watch('people', function(newValue, oldValue) {
  //     if (newValue != oldValue) dataService.setData(newValue)
  // })
  // dataService.setData();


});

test.controller('ModalInstanceCtrl',function (dataService, $uibModalInstance, people, $scope, $rootScope) {
  var $ctrl = this;
  $ctrl.people = people;
  // $ctrl.newPerson = newPerson;

//what if another function
  // $ctrl.addPerson = function(name, username, email, street, suite, city, zipcode, lat, lng, phone, website, coName, catchPhrase, bs) {
  //     if (this.people.name) {
  //         $ctrl.people.push({
  //             id: $ctrl.people.length + 1,
  //             name: $ctrl.people.name,
  //             username: $ctrl.people.username,
  //             email: $ctrl.people.email,
  //             street: $ctrl.people.address.street,
  //             suite: $ctrl.people.address.suite,
  //             city: $ctrl.people.address.city,
  //             zipcode: $ctrl.people.address.zipcode,
  //             lat: $ctrl.people.address.geo.lat,
  //             lng: $ctrl.people.address.geo.lng,
  //             phone: $ctrl.people.phone,
  //             website: $ctrl.people.website,
  //             coName: $ctrl.people.company.name,
  //             catchPhrase: $ctrl.people.company.catchPhrase,
  //             bs: $ctrl.people.company.bs
  //         })
  //         $ctrl.people.name = '';
  //         $ctrl.people.username = '';
  //         $ctrl.people.email = '';
  //         $ctrl.people.address.street = '';
  //         $ctrl.people.address.suite = '';
  //         $ctrl.people.address.city = '';
  //         $ctrl.people.address.zipcode = '';
  //         $ctrl.people.address.geo.lat = '';
  //         $ctrl.people.address.geo.lng = '';
  //         $ctrl.people.phone = '';
  //         $ctrl.people.website = '';
  //         $ctrl.people.company.name = '';
  //         $ctrl.people.company.catchPhrase = '';
  //         $ctrl.people.company.bs = '';
  //     }
  // }


//submit must be there
  $ctrl.ok = function (name, username, email, street, suite, city, zipcode, lat, lng, phone, website, coName, catchPhrase, bs) {
    //fix
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
if (this.people.name) {
    $ctrl.people.push({
        id: $ctrl.people.length + 1,
        name: $ctrl.people.name,
        username: $ctrl.people.username,
        email: $ctrl.people.email,
        street: $ctrl.people.address.street,
        suite: $ctrl.people.address.suite,
        city: $ctrl.people.address.city,
        zipcode: $ctrl.people.address.zipcode,
        lat: $ctrl.people.address.geo.lat,
        lng: $ctrl.people.address.geo.lng,
        phone: $ctrl.people.phone,
        website: $ctrl.people.website,
        coName: $ctrl.people.company.name,
        catchPhrase: $ctrl.people.company.catchPhrase,
        bs: $ctrl.people.company.bs
    })
  }
    // $ctrl.people.name = '';
    // $ctrl.people.username = '';
    // $ctrl.people.email = '';
    // $ctrl.people.address.street = '';
    // $ctrl.people.address.suite = '';
    // $ctrl.people.address.city = '';
    // $ctrl.people.address.zipcode = '';
    // $ctrl.people.address.geo.lat = '';
    // $ctrl.people.address.geo.lng = '';
    // $ctrl.people.phone = '';
    // $ctrl.people.website = '';
    // $ctrl.people.company.name = '';
    // $ctrl.people.company.catchPhrase = '';
    // $ctrl.people.company.bs = '';
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
// $scope.$watch('people', function(newValue, oldValue) {
//     if (newValue != oldValue) dataService.setData(newValue)
// })
console.log($ctrl.people)

    $uibModalInstance.close($ctrl.people);
    // $rootScope.$emit('addPersonRoot',{});
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


test.component('modalComponent', {
  templateUrl: './template/ModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.people = $ctrl.resolve.people;
    };

    $ctrl.ok = function () {
      //main mb
      //mb addPerson()
      $ctrl.close({$value: $ctrl.people});
          // $rootScope.$emit('addPersonRoot',{});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
