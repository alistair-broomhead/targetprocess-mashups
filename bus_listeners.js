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
      this._bus_name = bus;
      this._event_name = event;
      this._func = func;
    }

    Listener.prototype.bind = function bind(data){
        var bus = data.bus;
        if (bus.name === this._bus_name){
            bus.on(this._event_name, this._func);
        }
    };

    Listener.prototype.unbind = function unbind(data){
        var bus = data.bus;
        if (bus.name === this._bus_name){
            bus.removeListener(this._event_name, this._func);
        }
    };

    var BusListeners = {
        listeners: [],

        Add: function Add(bus, event, func){
            this.listeners.push(new Listener(bus, event, func));
        }
    };
    document.created = [];

    reg.on('create', function (e, data){
        document.created.push(data);
        for (var i = 0; i < BusListeners.listeners.length; i++){
            BusListeners.listeners[i].bind(data);
        }
    });
    reg.on('destroy', function (e, data){
        for (var i = 0; i < BusListeners.listeners.length; i++){
            BusListeners.listeners[i].unbind(data);
        }
    });
    document.BusListeners = BusListeners;
    return BusListeners;
  });