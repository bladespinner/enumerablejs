define(["../notImplementedFunction","./iEnumerable","../typeOperations","../iterator/lambdaIterator"],
function(UnimplementedFunction,IEnumerable,types,LambdaIterator){
  function Enumerable(iteratorGenerator){
    this.getIterator = iteratorGenerator || UnimplementedFunction;
  }
  
  types.inherit(Enumerable, IEnumerable);
  
  Enumerable.prototype.enumerate = function(){
    var result = [];
    var iterator = this.getIterator();
    var index = 0;
    do {
      var current = iterator.next(index);
      index++;
      if(current){
        result.push(current);
      }
    }
    while(current);
    return result;
  }

  Enumerable.prototype.count = function(){
    return this.enumerate.length;
  }

  Enumerable.prototype.where = function(condition){
    var self = this;
    return new Enumerable(function(){
      var iterator = self.getIterator();
      var idxOffset = 0;
      
      return new LambdaIterator(function(index){
        var value = undefined;
        do {
          value = iterator.next(index + idxOffset);
          if(value === undefined) return undefined;
          idxOffset++;
        } while(!condition(value));
        idxOffset--;
        return value;
      });
    });
  }

  Enumerable.prototype.take = function(count){
    var self = this;
    return new Enumerable(function(){
      var limit = count;
      var iterator = self.getIterator();
      
      return new LambdaIterator(function(index){
        var value = iterator.next(index);
        if(value === undefined) return undefined;
        if(limit > 0){
          limit--;
          return value;
        }
        return undefined;
      });
    });
  }

  Enumerable.prototype.skip = function(count){
    var self = this;
    return new Enumerable(function(){
      var skipped = false;
      var iterator = self.getIterator();
      
      return new LambdaIterator(function(index){
        if(!skipped){
          for(var i=0;i<count;i++){
            iterator.next(i);
          }
          skipped = true;
        }
        return iterator.next(index + count);
      });
    });
  }

  Enumerable.prototype.select = function(selector){
    var self = this;
    return new Enumerable(function(){
      var iterator = self.getIterator();
      
      return new LambdaIterator(function(index){
        var value = iterator.next(index);
        if(value === undefined) return undefined;
        return selector(value);
      });
    });
  }

  Enumerable.prototype.orderBy = function(selector,comparer){
    comparer = comparer || function(a,b){
      return selector(a) - selector(b);
    };
    var self = this;
    return new Enumerable(function(){
      var elements = self.enumerate();
      elements.sort(comparer);
      elements = elements.asEnumerable();
      return elements.getIterator();
    });
  }

  Enumerable.prototype.aggregate = function(aggregator){
    var index = 0;
    var result = undefined;
    var current = undefined;
    do{
      aggregator
    }
    while(current === undefined)
    
    iterator.next(index);
  }
  
  return Enumerable;
});
