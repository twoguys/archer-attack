var BoardView = Backbone.View.extend({
  
  initialize: function() {
    this.render_tiles();
    this.render_units();
  },
  
  render_tiles: function() {
    var width = this.model.tiles[0].length * 64 + 32;
    $('#board').css('width', width);

    var $tiles = $('#tiles');
    for ( var i=0; i < this.model.tiles.length; i++ ) {
      var row = this.model.tiles[i];
      var row_html = '<div class="row">';
      for ( var j=0; j < row.length; j++ ) {
        var tile = row[j];
        var classes = 'terrain ';
        switch (tile) {
          case 'c':
            classes += 'castle';
            break;
          case 'g':
            classes += 'grass';
            break;
          case 'f':
            classes += 'forest';
            break;
          case 'd':
            classes += 'desert';
            break;
          case 'w':
            classes += 'water';
            break;
          case 'm':
            classes += 'mountain';
            break;
        }
        row_html += '<div class="' + classes + '"></div>';
      }
      row_html += '</div>';
      $tiles.append(row_html);
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
        var model = new Unit({ type: type, x: j, y: i });
        units.push(model);
        var view = new UnitView({ model: model });
        $units.append(view.render().el);
      }
      this.model.units.push(units);
    }
  }
  
});