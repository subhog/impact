(function(){

new Impact.ModuleFactory('blog',{
templates: {

"edit": ["<div>Editing article!</div>"],

"list": ["ARTICLE LIST WILL BE HERE\n  ",["#",[[0,"each"],[0,"articles"]],["\n    ",[">","listEntry"],"\n  "]]],
"listEntry": ["<div>\n    <a href=\"/",["{",[[0,"M"]]],"/",["{",[[0,"hyphenize"],[0,"title"]]],"/",["{",[[0,"_id"]]],"\">document: <span>",["{",[[0,"title"]]],"</span></a>\n  </div>"],

"show": [["#",[[0,"with"],[0,"article"]],["\n    <div><a href=\"/",["{",[[0,"M"]]],"\" class=\"someHome\">HOME</a></div>\n    <div class=\"well span6\">\n      <h1>",["{",[[0,"title"]]],"</h1>\n      <p>",["{",[[0,"body"]]],"</p>\n    </div>\n  "]]],


},

loader: function(I) {

with(I){



////////////////////////////////////////
// blog/shared/model.js
////////////////////////////////////////




/*
  impact: {
    createdAt:
    updatedAt:
    createdBy:
    updatedBy:
    tags:
  }
  title:
  summary:
  notes:
  body:
  published: T/F
  publishedAt:
*/
var Articles = Collection('articles');


/*
  authorName:
  authorEmail:
  userId:

  createdAt:
  publishedAt:
  editedAt:
  
  published:
  forModeration:
  content:
*/
var Comments = Collection('comments');





////////////////////////////////////////
// blog/client/_.js
////////////////////////////////////////



// exports
// Name
// S
// Template
// Collection
// Privileges

exports.routes = function(state) {
  return state.matchRoute({
    '/':                  'list',
    '/:title/:id':        function(title, id) {
                            S('articleId', id);
                            return 'show';
                          },
    '/:title/:id/edit':   function(title, id) {
                            S('articleId', id);
                            return 'edit';
                          }
  });
}

// exports.render = function(state) {

//   //#  /                      -> list
//   //#  /articleTitle/id       -> show
//   //#  /articleTitle/id/edit  -> edit

//   var template = state.matchRoute({
//     '/':                  'list',
//     '/:title/:id':        function(title, id) {
//                             S('articleId', id);
//                             return 'show';
//                           },
//     '/:title/:id/edit':   function(title, id) {
//                             S('articleId', id);
//                             return 'edit';
//                           }
//   });
  
//   if(!template) return "ERROR";
//   return Template[template]();
// };







////////////////////////////////////////
// blog/client/list.js
////////////////////////////////////////




Template.list.articles = function() {
  return Articles.find({});
}






////////////////////////////////////////
// blog/client/show.js
////////////////////////////////////////



Template.show.article = function() {
  // console.log("SHOW ARTICLE", S('articleId'));
  // var article = Articles.findOne({_id: S('articleId')});
  // console.log("THIS ARTICLE: ", article);
  // return article;
  return Articles.findOne({_id: S('articleId')});
};




};

},

});

})();
