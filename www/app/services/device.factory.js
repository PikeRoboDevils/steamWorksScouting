(function(){
  angular.module('steamWorks')
  .factory('deviceSvc', deviceSvc);

  deviceSvc.$inject = [];

  function deviceSvc(){
    var devices = [];

    return {
      addDevice: function(device){
        devices.push(device);
      },

      getDevices: function(){
        return devices;
      },

      getDevice: function(name){
        return _.find(devices, function(d) {
          return d.name === name;
        });


        // var device_found = devices.filter(function(device){
        //   return device.name === name;
        // });
        // return device_found[0];
      },

      reset: function(){
        devices = [];
      }

    };
  }

})();