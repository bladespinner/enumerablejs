requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        enumerablejs: '../enumerablejs'
    }
});

requirejs(['enumerablejs/enumerable/enumerableExtentions'],
function (injector) {
  console.log({a:10,b:15,v:55,f:[1,3,4]}.asEnumerable().enumerate());
});