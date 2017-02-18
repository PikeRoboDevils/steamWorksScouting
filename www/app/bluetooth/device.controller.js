(function(){
  angular.module('steamWorks')
  .controller('deviceCtrl', ['$scope', '$state', '$stateParams', 'deviceSvc', deviceCtrl]);

  function deviceCtrl($scope, $state, $stateParams, deviceSvc){

    var me = this;

    var service_id = '12ab';
    var characteristic_id = '34cd';

    me.attendee = {
      firstname: '',
      lastname: ''
    }

    $scope.init = function(){
      $scope.device = deviceSvc.getDevice($stateParams.id);
    }

    $scope.attend = function(){
      ble.write(
        $stateParams.id,
        service_id,
        characteristic_id,
        btoa(JSON.stringify(me.attendee)),
        function(response){
          if(response == 'OK'){
            alert("Your attendance is recorded!");
            ble.disconnect($stateParams.id);
            $state.go('app.end');
          }
        },
        function(err){
          alert("Error occured while trying to record your attendance. Please try again.");
        }
      );
    }

    $scope.backToHome = function(){
      $state.go('app.end');
      ble.disconnect($stateParams.id);
    }

  }

})();