/*
    Name: Add Feature Tab on Stories
    Placeholder: footerPlaceholder

    This module adds a tab to all stories, showing the parent feature
    description.
*/

tau.mashups
  .addDependency('libs/jquery/jquery')
  .addDependency('REST')
  .addDependency('tp/userStory/view')
  .addMashup(function($, rest, view) {

                                
    function renderContent($contentElement, context) {
        rest.get(context.entity).get_raw(
            function (story){
                var feature_str = 'No parent feature';
                if (typeof story.feature != 'undefined'){
                    story.feature.get_raw(function(feature){
                        $contentElement.append(feature.description);
                    })
                } else {
                    $contentElement.append('No parent feature');
                }
            }
        );

    }

    function renderHeader($headerElement, context){}
                                
    view.addTab('Feature', renderContent, renderHeader)
        .addBlock('Feature Block', renderContent, renderHeader);
  });