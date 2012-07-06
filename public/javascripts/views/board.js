var BoardView = Backbone.View.extend({
  
  initialize: function() {
    this.render_tiles();
    this.render_units();
  },
  
  render_tiles: function() {
    var width = this.model.tile_state[0].length * 64 + 32;
    $('#board').css('width', width);

    var $tiles = $('#tiles');
    for ( var i=0; i < this.model.tile_state.length; i++ ) {
      var row = this.model.tile_state[i];
      var row_html = '<div class="row">';
      var tiles = [];
      for ( var j=0; j < row.length; j++ ) {
        var tile = row[j];
        var type = '';
        switch (tile) {
          case 'c':
            type += 'castle';
            break;
          case 'g':
            type += 'grass';
            break;
          case 'f':
            type += 'forest';
            break;
          case 'd':
            type += 'desert';
            break;
          case 'w':
            type += 'water';
            break;
          case 'm':
            type += 'mountain';
            break;
        }
        row_html += '<div class="terrain ' + type + '"></div>';
        var model = new Terrain({ type: type, x: j, y: i });
        tiles.push(model);
      }
      row_html += '</div>';
      $tiles.append(row_html);
      this.model.tiles.push(tiles);
    }
  },
  
  render_units: function() {
    var $units = $('#units');
    for ( var i=0; i < this.model.unit_state.length; i++ ) {
      var row = this.model.unit_state[i];
      var units = [];
      for ( var j=0; j < row.length; j++ ) {
        var tile = row[j];
        var type = 'blank';
        switch (tile) {
          case 'f':
            type = 'footman';
            break;
          case 'a':
            type = 'archer';
            break;
        }
        var hitpoints = type == 'blank' ? 0 : 10;
        var model = new Unit({ type: type, x: j, y: i, hitpoints: hitpoints, board: this.model });
        units.push(model);
        var view = new UnitView({ model: model });
        $units.append(view.render().el);
      }
      this.model.units.push(units);
    }
  }
  
});