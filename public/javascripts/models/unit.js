var Unit = Backbone.Model.extend({
  
  x: 0,
  y: 0,
  type: 'blank',
  hitpoints: 10,
  
  initialize: function() {
    
  },
  
  move: function() {
    console.log('Can move ' + UnitSpecs[this.get('type')]['mobility']);
  }
  
});