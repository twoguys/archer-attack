var UnitSpecs = {
  
  'footman': {
    'classification': 'soft',
    'attack_strength': {
      'soft': 6,
      'hard': 4
    },
    'defensive_strength': 6,
    'mobility': 6,
    'attack_range': { 'min': 1, 'max': 1 },
    'can_capture': true,
    'cost': 100
  },
  
  'archer': {
    'classification': 'soft',
    'attack_strength': {
      'soft': 4,
      'hard': 3
    },
    'defensive_strength': 6,
    'mobility': 9,
    'attack_range': { 'min': 1, 'max': 3 },
    'can_capture': true,
    'cost': 150
  }
};

var TerrainSpecs = {
  
  'grass': {
    'attack_effect': {
      'soft': 0,
      'hard': 0
    },
    'defense_effect': {
      'soft': 0,
      'hard': 0
    },
    'movement_cost': {
      'soft': 3,
      'hard': 3
    },
    'generates_income': false,
    'can_be_captured': false
  },
  
  'water': {
    'attack_effect': {
      'soft': 0,
      'hard': 0
    },
    'defense_effect': {
      'soft': 0,
      'hard': 0
    },
    'movement_cost': {
      'soft': 99,
      'hard': 99
    },
    'generates_income': false,
    'can_be_captured': false
  }
  
}