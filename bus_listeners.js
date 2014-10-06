/*
    Name: BusListeners
    Placeholder: footerPlaceholder

    This module is intended to make it easier to add and remove listeners in
    other mashups.
*/

tau.mashups
  .addDependency('tau/core/bus.reg')
  .addModule('BusListeners', function(reg){

    function Listener(bus, event, func){
      this.bus = bus;
      this.event = event;
      this.func = func;
    }

    function BusListeners(){
      var listeners = [];

      this.Add = function Add(bus, event, func){
        listeners.push(new Listener(bus, event, func));
      };

      reg.on('create', function(e, data) {
        for (var i = 0; i < listeners.len; i++){
          var listener = listeners[i];
          var bus = data.bus;
          if (bus.name === listener.bus) {
            bus.on(listener.event, listener.func);
          }
        }
      });

      reg.on('destroy', function(e, data) {
        for (var i = 0; i < listeners.len; i++){
          var listener = listeners[i];
          var bus = data.bus;
          if (bus.name === listener.bus) {
            bus.removeListener(listener.event, listener.func);
          }
        }
      });
    }

    return new BusListeners();
  });