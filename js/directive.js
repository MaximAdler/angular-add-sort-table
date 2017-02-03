var test = angular.module('test')

test.directive('ngPress', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngPress, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });
