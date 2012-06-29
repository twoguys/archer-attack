var Unit = Backbone.Model.extend({
  
  defaults: function() {
    return {
      x: 0,
      y: 0,
      type: 'blank',
      hitpoints: 10,
      board: null,
      state: 'idle'
    }
  },
  
  initialize: function() {
    _.bindAll(this, 'calculate_movement', 'mobility');
  },
  
  calculate_movement: function() {
    if (this.get('type') == 'blank') { return false; }

    var neighboring_terrain = this.neighboring_terrain();
    var neighboring_units = this.neighboring_units();
    var classification = UnitSpecs[this.get('type')]['classification'];
    
    console.log('calculating movement');
    for (var i=0; i<neighboring_terrain.length; i++) {
      var terrain = neighboring_terrain[i];
      var movement_cost = TerrainSpecs[terrain.get('type')]['movement_cost'][classification];
      if (this.mobility() >= movement_cost) {
        neighboring_units[i].set('state', 'movable');
      }
    }
  },
  
  move: function() {
    console.log('Can move ' + UnitSpecs[this.get('type')]['mobility']);
  },
  
  mobility: function() {
    return UnitSpecs[this.get('type')]['mobility'];
  },
  
  neighboring_terrain: function() {
    var tiles = this.get('board').model.tiles;
    return this.neighbors(tiles);
  },
  
  neighboring_units: function() {
    var units = this.get('board').model.units;
    return this.neighbors(units);
  },
  
  neighbors: function(array) {
    var deltas = [];
    if (this.get('y') % 2 == 0) { // even row
      deltas = [[-1,-1],[0,-1],[1,0],[0,1],[-1,1],[-1,0]];
    } else { // odd row
      deltas = [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,0]];
    }
    
    var neighbors = [];
    for (var i=0; i<deltas.length; i++) {
      var new_x = this.get('x') + deltas[i][0];
      var new_y = this.get('y') + deltas[i][1];
      if (array[new_x] != undefined && array[new_x][new_y] != undefined) {
        neighbors.push(array[new_x][new_y]);
      }
    }
    return neighbors;
  }
  
});