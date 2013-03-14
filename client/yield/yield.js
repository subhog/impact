////////////////////
/**/(function(){/**/
////////////////////

  var Yield = function () {
    this._dependency = new Deps.Dependency;
    this.moduleName  = null;
    this.path = [];
    //XXX: this will be initialized on demand
    //this.params = new QueryDict();
  };
  
  $functions(Yield, {

    getCurrentModule: function () {
      Deps.depend(this._dependency);
      return this.moduleName;
    },

    getPath: function () {
      Deps.depend(this._dependency);
      return this.path;
    },

    getParams: function () {
      if (this.params === undefined) // lazy init
        this.params = new Impact.QueryDict();
      return this.params;
    },

    setCurrentModuleAndState: function (moduleName, path, params, fullPath) {
      // if (this.currentModule === currentModule) {
        // return; // do not invalidate
      this.moduleName = moduleName;
      this.path = path;
      this.fullPath = fullPath;
      this.getParams().copy(params);
      this._dependency.changed();
    },

    setPathAndParams: function (path, params) {
      //TODO: check for changes
      this.path = path;
      this.getParams().copy(params);
      this._dependency.changed();
    },

    setParam: function (key, value) {
      this.getParams().set(key, value);
    },

    enteredPath: function(context, fullPath) {
      var path = fullPath.split('/');
      var name = path[0];
      path.splice(0, 1);
      var params = $.deparam(context.querystring || '');
      this.setCurrentModuleAndState(name, path, params, fullPath);
    },

    matchRoute: function(map) {
      var self = this;
      // console.log("MATCHING ROUTE ["+this.fullPath+"]");
      // console.log("OR BETTER: ", this.path);

      for(var key in map) {
        if(!this._routeMatches(this.path, key)) continue;

        var value = map[key];
        // console.log("MROUTER match found!", value);

        if(typeof value == "string") return value;
        if(typeof value == "function") return value.apply(this, this.path);
        continue;
      }

      return undefined;
    },

    _routeMatches: function(array, string) {
      if(string.startsWith('/')) string = string.substring(1);
      var tab = string.split('/');  
      if(tab[0] == "") {
        tab.removeAt(0);
      }

      if(array.length != tab.length) return false;
      for(var i = 0; i < tab.length; ++i) {
        if(tab[i] == '?') continue;
        if(tab[i].startsWith(':')) continue;
        if(array[i] != tab[i]) return false;
      }
      return true;
    },

    
  });

  //TODO: also make params and queryDict reactive
  Impact.Yield = new Yield();



////////////////////
/*********/})();/**/
////////////////////

