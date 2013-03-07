Meteor.Router.add({
  // '/-documents':    'iDocuments',
  // '/-media':        'iMedia',
  // '/-shortcuts':    'iShortcuts',  
  // '/-modules':      'iModules',
  // '/-themes':       'iThemes',
  // '/-roles':        'iRoles',
  // '/-users':        'iUsers',
  // '/-':             'iDashboard',
  // '/':              'iHome',
  '/':              'home',
  '/-/*':           function() {console.log("ERROR 404"); return 'error404';},
  '/-*':            function(match) {
                      if(!Meteor.user()) return 'login';
                      Impact.Dashboard.enteredPath(this, match);
                      return 'dashboard';
                    },
  '/*':             function(match) {
                      // Impact.Yield.requestedModuleName = match.split('/')[0];
                      console.log('Route matched');
                      Impact.Yield.updateState(this, match);
                      console.log('Route will render');
                      // console.log("REQUESTED MODULE "+Impact.Yield.requestedModuleName);
                      // Impact.Yield.enteredPath(this, match);
                      return 'yield';
                    },
});

