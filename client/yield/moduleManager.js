////////////////////
/**/(function(){/**/
////////////////////


  Impact._ModuleManagerConstructor = function () {
    // manager cache
    this.instances = new Impact.QueryDict();
    this.factories = new Impact.QueryDict();
    // describe relation between classes and instances
    this.config = new Impact.QueryDict();
    // for reactivity implemantation
    this._prefixes = {};
    this._counters = {};
  };

  $functions(Impact._ModuleManagerConstructor, {

    _observe: function () {
      //TODO: also observe other things
      //      like changes / deletion etc.
      var self = this;

      ImpactSettings.find({}).observe({
        added: function(settings) {
          // Object.merge(self.config, settings.modules);
          // console.log(self.config);
          Object.keys(settings.modules).each(function(name){
            self.config.set(name, settings.modules[name]);
          });
        },
      })

    },

    getModuleFactory: function (moduleClass) {
      if (!moduleClass) return;
      //----------------------------------------------------
      var factory = this.factories.get(moduleClass);
      //TODO: put some locker to prevent multiple ajax calls
      if (factory === undefined) {
        // load module soruce code
        var self = this;
        //XXX: note that the URL is hardcoded here
        Meteor.setTimeout(function () {
          $.ajax({
            url: '/-/m/' + moduleClass + '.js',
            type: 'GET',
            dataType: 'script',
          }).done(function (msg) {
            //self.factories.changed(moduleClass);
          }).fail(function (jqXHR, textStatus) {
            //TODO: provide more information about the error
            //XXX:  not that constructor is reactive
            //      (i.e. it registers the module factory in the manager)
            //XXX: remove all hacking from here
            (new Impact.ModuleFactory (moduleClass, {
              errors: {
                message : 'an error occured while loading module ' + moduleClass,
                reason  : textStatus,
              }
            })).register();
          });
        }, 1000);
      }
      return factory;
    },

    getInstanceConfig: function (name) {
      var config = this.config.get(name); // this is reactive
      return config || {};
    },

    getLoader: function (name, options) {
      options = options || {};
      options.moduleName = name;
      options.isLoader = true;
      // we use undefined to prevent module registration
      return new Impact.ModuleInstance(undefined, options);
    },

    getPrefix: function (moduleName) {
      return this._prefixes[moduleName];
    },

    getLoaderInstance: function (options) {
      options = options || {};
      // prepare error list
      if (Object.isString(options.errors))
        options.errors = [{
          message : 'an error occured while loading module `' + options.moduleName + '`',
          reason  : options.errors,
        }];
      if (Object.isObject(options.errors))
        options.errors = [options.errors, ];
      // return module instance
      return {
        isLoader : true,
        errors   : options.errors,
        message  : options.message,
        render   : function () {
          var template = Template['loader'];
          if (!template)
            return 'ERROR: Template `loader` does not exist!';
          return template(this);
        },
      }
    },

    getInstance: function (name) {
      this.instances.depend(name);
      var config = this.getInstanceConfig(name);
      var factory = this.getModuleFactory(config.moduleClass);
      
      var settings = ImpactSettings.findOne({});
      if (!settings)
        return this.getLoaderInstance({
          moduleName : name,
          message    : 'loading settings',
        }); // loading settings

      if (factory) {
        var instance = this.instances._properties[name];
        if (instance && instance._impact.factory === factory)
          return instance;
        // defer the instance creation process
        var self = this;
        Meteor.defer(function () {
          // instance created by a factory will by automatically
          // registerd in the manager
          factory.createInstance(name);
        }); // timeout = 0
      }
      // we can only use getLoder, because loader module does not
      // register in module manager; otherwise we would end up
      // with an infinite loop of context invalidation
      return this.getLoader(name);
    },

  });

  Impact.ModuleManager = new Impact._ModuleManagerConstructor ();

  Meteor.startup(function () {
    Impact.ModuleManager._observe();
  });

})();

