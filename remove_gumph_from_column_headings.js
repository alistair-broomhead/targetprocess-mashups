/*
    Name: Remove To Do Planned and Done from column headings
    Placeholder: restui_board

    This mashup is intended to improve usability by removing the labels 'To Do',
    'Planned' and 'Done' from columns that are marked as Initial, Planned and
    Final. This is considered an improvement as the assigned state name is
    generally more descriptive than the default.
 */

tau.mashups
  .addDependency('jQuery')
  .addDependency('BusListeners')
  .addMashup(function($, BusListeners) {
    var prefixes = ['To Do (', 'Planned (', 'Done ('];

    BusListeners.Add('board_plus', 'boardLayout.ready',
        function strip_all(e, data) {
            var headings = $('.i-role-axis-item .i-role-name');
            for (var i = 0; i < headings.length; i++) {
                var heading = headings[i];
                for (var j = 0; j < prefixes.length; j++) {
                    if (heading.innerHTML.indexOf(prefixes[j]) === 0) {
                        heading.innerHTML = heading.innerHTML.slice(prefixes[j].length, -1);
                    }
                }
            }
    });
});