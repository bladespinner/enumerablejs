define(["./exceptions"],
function (Exceptions) {
  
  var inherit = function(currentClass, parentClassOrObject){ 
    if (parentClassOrObject.constructor == Function) { 
      //Normal Inheritance 
      currentClass.prototype = new parentClassOrObject;
      currentClass.prototype.constructor = currentClass;
      currentClass.prototype.parent = parentClassOrObject.prototype;
    } 
    else { 
      //Pure Virtual Inheritance 
      currentClass.prototype = parentClassOrObject;
      currentClass.prototype.constructor = currentClass;
      currentClass.prototype.parent = parentClassOrObject;
    } 
    return currentClass;
  } 

  var is = function(currentClass, parentClassOrObject){
    var proto = undefined;
    if (parentClassOrObject.constructor == Function) { 
      proto = parentClassOrObject.prototype
    }
    else {
      proto = parentClassOrObject;
    }
    
    while(proto){
      if(currentClass.prototype == proto){
        return;
      }
      proto = proto.prototype;
    }
    throw Exceptions.TypeMismatchException
  }

  return {
    inherit : inherit,
    is : is
  }
});