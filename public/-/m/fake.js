(function(){

new Impact.ModuleFactory('fake',{
templates: {

"item": [["{",[[0,"conent"]]]],
"base": ["<a href=\"/fake/1/1\">link</a>\n<p>To jest fake'owy szablon</p>\n<input type=\"button\" value=\"dodaj\">\n<ul>\n  ",["#",[[0,"each"],[0,"documents"]],["\n  <li>",["{",[[0,"content"]]],"\n    ",[">","item"],"\n  </li>\n  "]],"\n</ul>"],


},

loader: function(I) {

with(I){



////////////////////////////////////////
// fake/client/_.js
////////////////////////////////////////





Template.base.items = ['a','b','c','d'];

Template.base.documents = function () {
  return Documents.find({});
};

Template.item.events({
  'click': function (event) {
    var self = this;
    $(event.target).hide(200, function() {
      Documents.remove({_id:self._id});
    });
    console.log('removing', this.content);
  },
});

Template.base.events({
  'click li': function (event) {
    var self = this;
    $(event.target).hide(200, function() {
      Documents.remove({_id:self._id});
    });
    console.log('removing', this.content);
  },
  'click input': function (event) {
    Documents.insert({content:'jakiś niemądry tekst'});
  },
});

exports.render = function (state) {
  var path   = state.getPath();
  var params = state.getParams();
  console.log('renderd with state', path, params.fetch());
  return Template.base();
};




};

},

});

})();
