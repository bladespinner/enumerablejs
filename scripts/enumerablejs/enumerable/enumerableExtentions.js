define(["enumerablejs/enumerable/enumerableWrapperInjector",
        "enumerablejs/enumerable/iEnumerable"], 
function(injector,IEnumerable){
  Object.prototype.asEnumerable = function(){
    return injector.resolve(IEnumerable,[this.constructor]).new(this);
  }
});