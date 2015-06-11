/*//This the start of the input data
var asyncFunction = function(callback,data){ 
    setTimeout(function(){
        callback(Math.random() + "_" +data);
    },1000);
};

var callback = function(data){
    console.log(data);
}

var callData = [1,"cat","dog",45,"burger"];

var dataIterator = Iterator(callData,function(arr,prev,idx){
    return arr[idx];
});
//This is the end of the input data

//We use this to create chain calls
var combineInChainCall = function(async,callback,callData){
    var call = callback;
    
    for(var i = callData.length - 1;i >= 0;i--){
        var oldCall = call;
        call = (function(c,data){
            return function(result){
                if(result){
                    callback(result);
                }
                async(c,data);
            };
        })(oldCall,callData[i]);
    }
    
    return call;
}

//Usage
//var call = combineInChainCall(asyncFunction,callback,callData);
//call();
*/




