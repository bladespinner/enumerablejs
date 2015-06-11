define(["./enumerable","../iterator/lambdaIterator","../typeOperations"],
function(Enumerable, LambdaIterator, types){
  function ArrayEnumerableWrapper(arr){
    var innerArray = arr;
    this.getIterator = function(){
      return new LambdaIterator(function(index){
        return innerArray[index];
      });
    };
  }
  types.inherit(ArrayEnumerableWrapper, Enumerable);
  
  return ArrayEnumerableWrapper;
});
