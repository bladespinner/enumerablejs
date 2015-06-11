define(["../exceptions","../typeOperations","./iIterator"],
function (Exceptions,types,IIterator) {
  function ArrayIterator(array){
    types.is(Array,array);
    var idx = 0;
    this.next = function(index){
      if(array.length >= idx) return undefined;
      var result = array[idx];
      idx++;
      return result;
    }
  }
  types.inherit(ArrayIterator,IIterator);
});