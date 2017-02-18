(function(){
  angular.module('steamWorks')
  .controller('btCtrl', ['$scope', '$state', 'deviceSvc', btCtrl]);

  function btCtrl($scope, $state, deviceSvc){

    $scope.devices = []; // the devices listed in the page

    $scope.scan = function(){

      deviceSvc.reset();
      ble.startScan(
        [],
        function(device){
          if(device.name){
            deviceSvc.addDevice({ 'id': device.id, 'name': device.name });
          }
        },
        function(err){
          alert('Scanning failed. Please try again.');
        }
      );

      setTimeout(
          ble.stopScan,
          1500,
          function(){
            $scope.$apply(function(){
              $scope.devices = deviceSvc.getDevices();
            });
          },
          function(){
            // Stopping scan failed
          }
      );
    }

    $scope.connect = function(device_id){
      ble.connect(
        device_id,
        function(res){
          console.log(res);
          $state.go('app.device', { 'id': device_id });
        },
        function(err){
          alert('Something went wrong while trying to connect. Please try again');
        }
      );
    }

  }

})();