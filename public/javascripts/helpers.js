function union_arrays (x, y) {
  var array = [];
  for (var i=0; i<x.length; i++) {
    array.push(x[i]);
  }
  for (var i=0; i<y.length; i++) {
    array.push(y[i]);
  }
  return array;
}