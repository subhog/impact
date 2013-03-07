////////////////////
/**/(function(){/**/
////////////////////


Template.yield.renderModule = function() {
// Template.yield.helpers({
//   renderModule: function() {

    if(!Impact.Yield.state.moduleName) {
      return new Handlebars.SafeString(Template.loading());
    }

    if(Impact.Yield.currentModuleName == Impact.Yield.state.moduleName) {
      return Impact.Yield.currentModule.render(Impact.Yield.state);
    } else {
      Impact.Yield.reloadModule();

      return new Handlebars.SafeString('<a href="#">LINK</a>'+
      Modules.find({}).fetch().reduce(
        function(sum, item) {
          return sum + ' ['+item.name+': '+item.moduleClass+'] ';
        },
        ''
      )
      );
    };
    
    return 'ERROR: UNKNOWN MODULE';
//   },
// });
};


////////////////////
/*********/})();/**/
////////////////////
