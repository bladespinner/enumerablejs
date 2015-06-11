define(["../typeOperations","./iIterator"],
function(types,IIterator){
  
  function LambdaIterator(next){
    this.next = next;
  }
  types.inherit(LambdaIterator, IIterator);
  
  return LambdaIterator;
});