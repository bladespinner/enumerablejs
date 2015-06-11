define(["./enumerable","../iterator/lambdaIterator","../typeOperations"],
function(Enumerable, LambdaIterator, types){
  function ObjectEnumerableWrapper(obj){
    var innerObj = obj;
    this.getIterator = function(){
      var keys = Object.getOwnPropertyNames(obj);
      var keyLength = keys.length;
      return new LambdaIterator(function(index){
        if(index >= keyLength){
          return undefined;
        }
        var key = keys[index];
        return {key:key,value:innerObj[key]};
      });
    };
  }
  types.inherit(ObjectEnumerableWrapper, Enumerable);
  
  return ObjectEnumerableWrapper;
});
