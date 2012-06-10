$(function() {
  
  var tiles = [
    ['g','g','g','f','f','w','w','d','d','m','g','m'],
    ['g','d','g','w','f','w','m','d','d','m','g','m'],
    ['f','d','g','f','d','w','w','d','m','m','g','m'],
    ['w','f','f','g','f','d','w','m','d','m','g','m']
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
          classes += 'grass';
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