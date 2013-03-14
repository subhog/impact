////////////////////
/**/(function(){/**/
////////////////////


  $functions(Impact._ModuleManagerConstructor, {

    //TODO: print warnings in case of possible overwriting
    //TODO: more inteligent comparision

    _createInstancePrefix: function (name) {
      // It starts with 1 now! Dislike.
      var value = (this._counters[name] || 0) + 1;
      this._counters[name] = value;

      // Changed format due to following scenario:
      // Module: news-0, collection: 0-data
      // Module: news, collection: 0-0-data
      // ...wait, it still does not work!
      // Think of something better.

      // ...but this does not make sense since value starts from 1...
      // Oh well, we need to find another solution anyway.
      return (value)
              ? 'im' + value.toString() + '-' + name + '-'
              : 'im-' + name + '-';
    },

    registerFactory: function (moduleClass, factory) {
      if (this.factories[moduleClass] === factory)
        return; // nothing changed
      this.factories.set(moduleClass, factory);
    },

    registerInstance: function (moduleName, instance) {
      if (this.instances[moduleName] === instance)
        return; // nothing changed
      //---------------------------------------------------------------
      instance._impact.prefix = this._createInstancePrefix(moduleName);
      //---------------------------------------------------------------
      this._prefixes[moduleName] = instance._impact.prefix;
      this.instances.set(moduleName, instance);
    },

    deleteModuleFactory: function (moduleClass) {
      this.factories.unset(moduleClass);
    },

  });

////////////////////
/*********/})();/**/
////////////////////
