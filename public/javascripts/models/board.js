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
  },
  
  fight_units: function(from, to) {
    var from_type = UnitSpecs[from.get('type')]['classification'];
    var to_type = UnitSpecs[to.get('type')]['classification'];
    
    var from_attack = UnitSpecs[from.get('type')]['attack_strength'][to_type];
    var from_defense = UnitSpecs[from.get('type')]['defensive_strength'];
    var to_attack = UnitSpecs[to.get('type')]['attack_strength'][from_type];
    var to_defense = UnitSpecs[to.get('type')]['defensive_strength'];

    var to_damage = this.calculate_damage(from_attack, to_defense, from.get('hitpoints'));
    to.take_damage(to_damage);
    var from_damage = this.calculate_damage(to_attack, from_defense, to.get('hitpoints'));
    from.take_damage(from_damage);
  },
  
  calculate_damage: function(attack, defense, attack_hp) {
    var power = 0.05 * (attack - defense) + 0.5;
    if (power < 0) { power = 0; }
    if (power > 1) { power = 1; }
    var hits = 0;
    for (var i=0; i<attack_hp; i++) {
      var randoms = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
      for (var j=0; j<6; j++) {
        if (power > randoms[j]) { hits += 1; }
      }
    }
    hits = Math.round(hits / 6);
    return hits;
  }
  
});