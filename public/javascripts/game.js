var board = null, board_view = null;

$(function() {
  
  board = new Board;
  board_view = new BoardView({ model: board });
  
});