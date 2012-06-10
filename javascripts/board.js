$(function() {
  
  var tiles = [
    ['g','g','m','m','m','m','m','m','g','g','g','g','g','g'],
    ['g','g','g','m','m','d','d','m','g','g','g','g','g','g'],
    ['g','g','g','m','d','w','s','g','g','g','g','g','g','g'],
    ['g','g','g','g','d','w','w','g','g','g','g','g','g','g'],
    ['g','g','g','f','f','w','g','g','f','f','g','g','g','g'],
    ['g','g','g','g','f','f','g','g','w','f','f','g','g','g'],
    ['g','g','g','g','g','g','g','w','w','d','g','g','g','g'],
    ['g','g','g','g','g','g','g','d','w','d','m','g','g','g'],
    ['g','g','g','g','g','g','m','d','d','m','m','g','g','g'],
    ['g','g','g','g','g','g','m','m','m','m','m','m','g','g']
  ];
  
  var $board = $('#board');
  var board_width = tiles[0].length * 32 + 16;
  $board.css('width', board_width);
  
  for ( var i=0; i < tiles.length; i++ ) {
    var row = tiles[i];
    var row_html = '<div class="row">';
    for ( var j=0; j < row.length; j++ ) {
      var tile = row[j];
      var classes = 'cell ';
      switch (tile) {
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
    console.log(row_html);
    $board.append(row_html);
  }
  
});