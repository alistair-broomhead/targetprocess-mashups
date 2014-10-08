/*
    Name: REST
    Placeholder: footerPlaceholder

    This module is intended to provide an easy way to get entity details in
    other mashups.
*/

tau.mashups
  .addDependency('jQuery')
  .addDependency('tau/configurator')
  .addModule('REST', function($, configurator){

    var basic_rest = {
        _base_url: configurator.getApplicationPath() + '/api/v1',

        GET: function GET(url, callback){
            var call = {
                url: this._base_url + url,
                context: this
            };

            return $.ajax(call).then(callback);
        }
    };

    function Story(story_id){
        this.id = story_id;
        this.raw = Story.prototype.raw;
        this.feature = Story.prototype.feature;
    }
    Story.prototype._basic_rest = basic_rest;
    Story.prototype.raw = undefined;
    Story.prototype.feature = undefined;
    Story.prototype.get_raw = function get_raw(callback){
        var self = this;
        this._basic_rest.GET(
            '/UserStories?format=json&where=(Id eq '+self.id+')',
            function (data){
                self.raw = data.Items[0];
                var feature = self.raw.Feature;
                if (feature){
                    self.feature = new Feature(feature.Id);
                }
                console.log(self);
                if (typeof callback != 'undefined'){
                    callback(self)
                }
            }
        );
    };

    function Feature(feature_id){
        this.id = feature_id;
        this.raw = Feature.prototype.raw;
    }
    Feature.prototype._basic_rest = basic_rest;
    Feature.prototype.raw = undefined;
    Feature.prototype.get_raw = function get_raw(callback){
        var self = this;
        this._basic_rest.GET(
            '/Features?format=json&where=(Id eq '+self.id+')',
            function (data){
                self.raw = data.Items[0];
                self.name = self.raw.Name;
                self.description = self.raw.Description;
                console.log(self);
                if (callback){
                    callback(self)
                }
            }
        );
    };

    return {
        _basic: basic_rest,

        get: function get(entity){
            if (entity.type == "userStory"){
                return new Story(entity.id);
            }
        }
    };
  });