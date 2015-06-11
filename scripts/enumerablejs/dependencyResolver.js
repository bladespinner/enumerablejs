define([],function(){
  var DependencyResolver = function(moduleName){
    var dependencyCache = {};

    this.getModuleName = function(){
      return moduleName;
    };
    
    this.register = function(type, resolver, handles){
      var typeHandles = handles || [{name:''}];
      dependencyCache[type.name] = dependencyCache[type.name] || {};
      var currentLayer = dependencyCache[type.name];
      currentLayer.__isDependencyLayer = true;
      for(var i = 0; i < typeHandles.length; i++){
        var currentHandle = typeHandles[i];
        if(i < typeHandles.length - 1) {
          currentLayer[currentHandle.name] = currentLayer[currentHandle.name] || {};
          currentLayer = currentLayer[currentHandle.name];
          currentLayer.__isDependencyLayer = true;
        }
        else {
          currentLayer[currentHandle.name] = resolver;
        }
      }
    }
    
    var getTypeForLayer = function(layer, handles,idx)
    {
      idx = idx || 0;
      var curType = handles[idx];
      if(!layer[curType.name].__isDependencyLayer && handles.length == idx + 1) return layer[curType.name];
      while(curType){
        if(layer[curType.name])
        {
          var candidate = getTypeForLayer(layer[curType.name],handles,idx+1);
          if(candidate){
            return candidate;
          }
        }

        curType = curType.prototype;
      }
      return undefined;
    }
    
    this.resolve = function(type, typeHandles){
      var typeHandles = typeHandles || [{name:''}];
      var rootTypeLayer = dependencyCache[type.name];
      var resolver = getTypeForLayer(rootTypeLayer, typeHandles);
      if(!resolver){
        throw "Cannot resolve type " + type.constructor();
      }
      else{
        var parameterList = [];
        if(resolver.parameters){
          var paramCount = resolver.parameters.length;
          for(var i = 0; i < paramCount; i++){
            if(!resolver.parameters[i]){
               parameterList.push(undefined);
            }
            else{
               parameterList.push(this.resolve(resolver.parameters[i]));
            }
          }
        }
        return { new : function(){
          var argPtr = 0;
          var argCount = arguments.length;
          for(var i = 0;i < parameterList.length;i++){
            if(argCount <= argPtr) break;
            if(!parameterList[i]){
              parameterList[i] = arguments[argPtr];
              argPtr++;
            }
          }
          var obj = Object.create(resolver.type.prototype,parameterList);
          resolver.type.apply(obj,parameterList);
          return obj;
        }};
      }
    }
  }
  return DependencyResolver;
});