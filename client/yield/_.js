(function () {

  // reactive dictionary data source

  var QueryDict = function () {
    this._properties = {};
    this._dependency = {};
  };

  Impact.QueryDict = QueryDict;

  $functions(QueryDict, {

    get: function (key) {
      this.depend(key);
      return this._properties[key];
    },

    set: function (key, value) {
      if (value === this._properties[key])
        return;
      this._properties[key] = value;
      this.changed(key);
    },

    unset: function (key) {
      if (!Object.has(this._properties, key))
        return;
      delete this._properties[key];
      this.changed(key);
    },

    fetch: function (key, value) {
      var self = this, data = {};
      Object.each(this._properties, function (key) {
        data[key] = self.get(key);
      });
      return data;
    },

    copy: function (object) {
      var self = this;
      Object.each(object, function (key, value) {
        self.set(key, value);
      });
      Object.each(this._properties, function (key) {
        if (!Object.has(object, key))
          self.unset(key);
      });
    },

    depend: function (key) {
      if (Deps.active) {
        if (this._dependency[key] === undefined)
          this._dependency[key] = new Deps.Dependency;
        Deps.depend(this._dependency[key]);
      }
    },

    changed: function (key) {
      if (this._dependency[key])
        this._dependency[key].changed();
    },

  });

})();
