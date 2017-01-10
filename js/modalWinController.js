var test = angular.module('test');

test.controller('ModalDemoCtrl', ['$uibModal', '$log','$document', function ($uibModal, $log, $document) {
  var $ctrl = this;
  //
  $ctrl.items = ['1','2'];
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
    $uibModalInstance.close($ctrl.selected.item);
    // $rootScope.$emit('addPersonRoot',{});
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

// Please note that the close and dismiss bindings are from $uibModalInstance.

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
      $ctrl.close({$value: $ctrl.selected.item});
          // $rootScope.$emit('addPersonRoot',{});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
