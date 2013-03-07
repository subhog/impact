var Impact = {};


// Most of these won't be used!

// Actual instances, created by Impact
Impact.Modules = {};
// Impact.Cards = {};
// Impact.Widgets = {};
// Impact.Themes = {};

//! MOVED INSIDE MODULE MANAGER

// Created by add-on developer
// Impact.moduleConstructors = {};
// Impact.widgetConstructors = {};
// Impact.themeConstructors = {};
// Impact.cardConstructors = {};

//! CHANGED TO DATABASE QUERY

// Created by site admin
// Impact.moduleClasses = {};
// Impact.themeInfo = {};
// Impact.widgetInfo = {};
// Impact.cardInfo = {};






Meteor.startup(function(){
  console.log("================================================================================");

  var loadedData = function(data) {
    _.delay(function(){
      Impact.settings = data;
    }, 2000);
  };

  ImpactData.find({}).observe({
    added: function(newData) {
      loadedData(newData);
    },
    changed: function(newData, oldData) {
      loadedData(newData);
    },
  });

});