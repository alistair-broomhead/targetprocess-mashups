/*
    Name: Legacy WYSIWYG Editor
    Placeholder: footerplaceholder
      
    Because you can't not hijack right click
 */
    
tau.mashups
  .addDependency('libs/jquery/jquery')
  .addMashup(function($, config) {
    require(['/ckeditor/ckeditor.js'], function() {
      CKEDITOR.removePlugins = 'contextmenu';
    })
  });