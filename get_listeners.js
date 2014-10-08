/*
    Name: Get all the listeners that are currently known
    Placeholder: footerplaceholder

    This mashup is intended to aid development by showing known listeners.
 */

tau.mashups
  .addDependency('BusListeners')
  .addMashup(function(BusListeners) {
    function add_called(bus, evt){
        function called(){
            console.log('called ['+bus+'].['+evt+']');
        }
        BusListeners.Add(bus, evt, called)
    }
    document.get_listeners = function (){
        var keys = [];
        document.all_listeners = {};
        for (var i = 0, i_max = document.created.length; i < i_max; i++){
            var bus = document.created[i].bus;
            var bus_name = bus.name;
            keys.push(bus_name);
            document.all_listeners[bus_name] = [];
            var listeners = bus.getListeners();
            for (var j = 0, j_max = listeners.length; j < j_max; j++){
                var evt = listeners[j].name;
                document.all_listeners[bus_name].push(evt);
                add_called(bus_name, evt);
            }
        }
    };
    //BusListeners.Add('board_plus', 'boardLayout.ready', document.get_listeners)
    document.print_listeners = function(){
        document.get_listeners();
        console.log(JSON.stringify(document.all_listeners, null, 4))
    };
});