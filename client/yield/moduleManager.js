////////////////////
/**/(function(){/**/
////////////////////

var ModuleManager = function() {
  this.factories = {};
};


$functions(ModuleManager, {
  
  registerModuleConstructor: function(moduleClass, moduleConstructor){
    moduleConstructor.moduleClass = moduleClass;
    this.factories[moduleClass] = moduleConstructor;
  },

  loadModule: function(moduleName, moduleClass) {
    var self = this;
    if(this.factories[moduleClass]) {
      this._initializeModuleInstance(moduleName, moduleClass);
    } else {
      require(['/-/m/' + moduleClass + '.js'], function() {
        console.log("MODULE FACTORY LOADED");
        self._initializeModuleInstance(moduleName, moduleClass);
      });
    }
  },


  _installTemplate: function (name, template, prefix) {
    prefix = prefix || '';
    //-------- recursion ------------
    var traverse = function (array) {
      if (array[0] === ">") {
        array[1] = prefix + array[1];
      } else {
        array.each(function (node) {
          if (node instanceof Array)
            traverse(node);
        });
      }
    };
    // console.log("TEMPLATE PREIX = ", prefix);
    // add prefix to all partial calls
    traverse(template);
    // install this template in Meteor
    Meteor._def_template(prefix + name, Handlebars.json_ast_to_func(template));
  },

  _initializeModuleInstance: function(moduleName, moduleClass) {
    console.log("CREATING MODULE...");
    var module = this._createModuleInstance(moduleName, moduleClass);
    console.log("CREATED MODULE");
    Impact.Yield.loadedModule(moduleName, module);
  },

  _createModuleInstance: function(moduleName, moduleClass) {
    var instance = {};
    var templates = {};
    var prefix = 'im-' + name + '-';
    var self = this;
    var factory = this.factories[moduleClass];
    // console.log("CREATING FROM FACTORY", factory);
      // instal templates first using Meteor routines
      // //TODO: also allow custom templates defininition (without Handlebars)

    Object.each(factory.templates, function (templateName, templateCode) {
      self._installTemplate(templateName, templateCode, prefix);
      // proxy the real meteor template
      templates[templateName] = Template[prefix + templateName];
    });

    //(exports, Name, S, Template, Documents, Versions, Notes)
    factory.loader(instance, moduleName, {}, templates,   Documents, Versions, Notes);
    return instance;
  },

});


Impact.ModuleManager = new ModuleManager();

////////////////////
/*********/})();/**/
////////////////////
