define(["./exceptions"],
function(Exceptions){
  return function(){
    throw Error(Exceptions.NotImplementedException);
  }
});