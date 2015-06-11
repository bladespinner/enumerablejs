define(function(require){
  var DependencyResolver = require("enumerablejs/dependencyResolver");
  var IEnumerable = require("enumerablejs/enumerable/iEnumerable");
  var injector = new DependencyResolver();
  
  var registerBaseEnumWrapper = function(type, typeResolver){
    injector.register(
      Enumerable,
      {
        type:typeResolver, 
        parameters:[undefined]
      },
      [type]
    );
  }
  
  registerBaseEnumWrapper(Array, 
    require("enumerablejs/enumerable/arrayEnumerableWrapper"));
  
  registerBaseEnumWrapper(Object, 
    require("enumerablejs/enumerable/objectEnumerableWrapper"));
  
  return injector;
});