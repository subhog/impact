////////////////////
/**/(function(){/**/
////////////////////




var Yield = function(){
  this.state = {};
};

$functions(Yield, {
  updateState: function(context, fullPath) {
    var path = fullPath.split('/');
    var name = path[0];
    path.splice(0, 1);

    this.state.moduleName = name;
    this.state.path = path;
    this.state.params = $.deparam(context.querystring || '');
    console.log('Updated state');
  },

  reloadModule: function() {
    var moduleName = this.state.moduleName;
    var moduleClass = Impact.settings.modules[moduleName];

    //this.currentModule = 
    Impact.ModuleManager.loadModule(moduleName, moduleClass);
    //this.currentModuleName = moduleName;
  },

  loadedModule: function(moduleName, module) {
    if(this.state.moduleName === moduleName) {
      this.currentModule = module;
      this.currentModuleName = moduleName;
      console.log("YIELD MODULE ["+moduleName+"] PREPARED");
    }
  },

  // attachModule: function(moduleName, moduleClass) {
  //   this.currentModule = Impact.ModuleManager.loadModule(name, moduleClass);
  //   this.currentModuleName = name;
  // },

  // enteredPath: function(context, fullPath) {

  //   var path = fullPath.split('/');
  //   var name = path[0];
  //   path.splice(0, 1);

  //   this.requestedModuleName = name;
  //   if(this.currentModuleName == this.requestedModuleName) return;

  //   delete this.currentModule;
  //   this.currentModule = null;

  //   var moduleClass = Impact.moduleClasses[name];
  //   console.log("Trying to load ["+moduleClass+']');

  //   if(!moduleClass) return;

  //   if(Impact.moduleConstructors[moduleClass]) {
  //     this.attachModule(name, moduleClass);
  //   } else {
  //     require(['/-/m/' + moduleClass + '.js'], function () {
  //       this.attachModule(name, moduleClass);
  //     });
  //   }

  // },
});




Impact.Yield = new Yield();


////////////////////
/*********/})();/**/
////////////////////
