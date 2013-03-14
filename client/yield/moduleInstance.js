////////////////////
/**/(function(){/**/
////////////////////

Impact.ModuleInstance = function (moduleName, options) {
  options = options || {};
  options.moduleName = moduleName || options.moduleName;

  this._impact = options;

  // if we want to skip registration process and set moduleName
  // properly we can pass module name using options hash
};

$functions(Impact.ModuleInstance, {

  register: function () {
    if (this._impact.moduleName) {
      Impact.ModuleManager.registerInstance (this._impact.moduleName, this);
    } else {
      console.log('WARNING! Cannot register MoudleInstance with undefined moduleName');
    }
  },

  render: function () {
    if (this._impact.isLoader || this.errors) {
      var template = Template['loader'];
      if (!template)
        return 'ERROR: Template `loader` does not exist!';
      return template(this);
    }
    return 'ERROR: the module `' + this._impact.moduleName + '` has not defined render function';
  },

});

////////////////////
/*********/})();/**/
////////////////////