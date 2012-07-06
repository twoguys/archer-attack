var Board = Backbone.Model.extend({
  
  // these will be loaded from the server later
  
  tile_state: [
    ['g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
    ['g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
    ['g','g','g','g','g','w','g','g','g','g','g','g','g','g'],
    ['g','g','g','g','g','w','w','g','g','g','g','g','g','g'],
    ['g','g','g','g','g','w','g','g','g','g','g','g','g','g'],
    ['g','g','g','g','g','g','g','g','w','g','g','g','g','g'],
    ['g','g','g','g','g','g','g','w','w','g','g','g','g','g'],
    ['g','g','g','g','g','g','g','g','w','g','g','g','g','g'],
    ['g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
    ['g','g','g','g','g','g','g','g','g','g','g','g','g','g']
  ],
  
  tiles: [],
  
  unit_state: [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ','f','a',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ','a','f',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']
  ],
  
  units: [],
  
  acting_unit: null,
  
  movables: [],
  
  attackables: [],
  
  set_movables: function(movables) {
    this.clear_movables();
    
    this.movables = movables;
    _.each(this.movables, function(movable) {
      movable.set('state', 'movable');
    });
  },
  
  clear_movables: function() {
    _.each(this.movables, function(movable) {
      movable.set('state', 'idle');
    });
  },
  
  set_attackables: function(attackables) {
    this.clear_attackables();
    
    this.attackables = attackables;
    _.each(this.attackables, function(attackable) {
      attackable.set('state', 'attackable');
    });
    
    this.moving = true;
  },
  
  clear_attackables: function() {
    _.each(this.attackables, function(attackable) {
      attackable.set('state', 'idle');
    });
  },
  
  acting_complete: function() {
    this.clear_movables();
    this.clear_attackables();
    this.acting_unit = null;
  },
  
  swap_units: function(from, to) {
    var from_type = from.get('type');
    var from_hitpoints = from.get('hitpoints');
    
    from.set({ 'type': to.get('type'), 'hitpoints': to.get('hitpoints') });
    to.set({ 'type': from_type, 'hitpoints': from_hitpoints });
  }
  
});