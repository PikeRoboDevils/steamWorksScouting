(function(){
  'use strict';
  angular
  .module('steamWorks')
  .controller('btCtrl',  btCtrl);


  btCtrl.$inject = ['$scope', '$state', 'deviceSvc'];

  function btCtrl($scope, $state, deviceSvc){
    var vm = this;
    vm.devices = []; // the devices listed in the page

    vm.scan = scan;
    vm.connect = connect;

    function scan (){

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
              vm.devices = deviceSvc.getDevices();
            });
          },
          function(){
            // Stopping scan failed
          }
      );
    }

    function connect (device_id){
      $state.go('app.welcome');
      
      // ble.connect(
      //   device_id,
      //   function(res){
      //     console.log(res);
      //     $state.go('app.welcome');
      //     // $state.go('app.device', { 'id': device_id });
      //   },
      //   function(err){
      //     alert('Something went wrong while trying to connect. Please try again');
      //   }
      // );
    }
  }
})();
