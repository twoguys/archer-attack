var Unit = Backbone.Model.extend({
  
  defaults: function() {
    return {
      x: 0,
      y: 0,
      type: 'blank',
      hitpoints: 0,
      board: null,
      state: 'idle',
      has_moved: false
    }
  },
  
  initialize: function() {
    _.bindAll(this, 'act', 'show_possible_actions', 'mobility');
  },
  
  act: function() {
    var currently_acting = this.get('board').acting_unit;

    if (!currently_acting) {
      this.show_possible_actions();
    } else {
      this.act_here();
    }
  },
  
  show_possible_actions: function() {
    if (this.get('type') == 'blank') { return false; }
    if (this.get('has_acted')) { return false; }

    var neighboring_terrain = this.neighboring_terrain();
    var neighboring_units = this.neighboring_units();
    console.log('neighboring units count', neighboring_units.length);
    
    var classification = UnitSpecs[this.get('type')]['classification'];
    var movables = [];
    var attackables = [];
    for (var i=0; i<neighboring_terrain.length; i++) {
      var terrain = neighboring_terrain[i];
      var movement_cost = TerrainSpecs[terrain.get('type')]['movement_cost'][classification];
      var attackable = neighboring_units[i].get('type') != 'blank';
      if (attackable) {
        attackables.push(neighboring_units[i]);
      } else if (this.mobility() >= movement_cost) {
        console.log(neighboring_units[i].get('view').$el);
        movables.push(neighboring_units[i]);
      }
    }
    this.get('board').acting_unit = this;
    this.get('board').set_movables(movables);
    // _.each(movables, function(movable) {
    //   console.log(movable.get('view').model.get('state'), movable.get('view'), movable.get('view').$el);
    // });
    this.get('board').set_attackables(attackables);
  },
  
  act_here: function() {
    var acting_unit = this.get('board').acting_unit;
    var movables = this.get('board').movables;
    var attackables = this.get('board').attackables;
    
    var actable_tiles = union_arrays(movables, attackables);
    var clicked_on_actable_tile = false;
    if (_.include(actable_tiles, this)) {
      clicked_on_actable_tile = true;
    }
    if (!clicked_on_actable_tile) {
      this.get('board').acting_complete();
      return false;
    }
    
    if (this == acting_unit) { // clicked the same unit
      this.get('board').acting_complete();
    } else if (_.include(movables, this)) { // move here
      this.get('board').swap_units(acting_unit, this);
      this.set('has_acted', true);
      this.get('board').acting_complete();
    } else { // attack here
      this.get('board').fight_units(acting_unit, this);
      //acting_unit.set('has_acted', true);
      this.get('board').acting_complete();
    }
  },
  
  take_damage: function(damage) {
    var new_hp = this.get('hitpoints') - damage;
    if (new_hp <= 0) {
      this.set({ 'hitpoints': 0, type: 'blank' });
    } else {
      this.set('hitpoints', new_hp);
    }
  },
  
  mobility: function() {
    return UnitSpecs[this.get('type')]['mobility'];
  },
  
  neighboring_terrain: function() {
    var tiles = this.get('board').tiles;
    return this.neighbors(tiles);
  },
  
  neighboring_units: function() {
    var units = this.get('board').units;
    return this.neighbors(units);
  },
  
  neighbors: function(array) {
    var deltas = [];
    if (this.get('y') % 2 == 0) { // even row
      deltas = [[-1,0],[0,-1],[1,-1],[1,0],[1,1],[0,1]];
    } else { // odd row
      deltas = [[-1,0],[-1,-1],[0,-1],[1,0],[0,1],[-1,1]];
    }
    
    var neighbors = [];
    for (var i=0; i<deltas.length; i++) {
      var new_x = this.get('x') + deltas[i][0];
      var new_y = this.get('y') + deltas[i][1];
      //console.log(new_x, new_y);
      if (array[new_y] != undefined && array[new_y][new_x] != undefined) {
        neighbors.push(array[new_y][new_x]);
      }
    }
    return neighbors;
  },
  
  coordinates: function() {
    return this.get('x') + ', ' + this.get('y');
  }
  
});