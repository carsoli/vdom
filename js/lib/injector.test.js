(function(global) {
    const injector = global.injector;
    let constructor1 = function(){
        return `<h1> hey1 </h1>`
    } 

    let constructor2 = function(m1){
        return `${m1} <p> hey2 </p>`
    } 

    let module1 = injector.define('m1', [constructor1]);
    console.log(assert({name: 'm1', dependencies: [], constructor: constructor1,  isInitializing: false, isInitialized: false }, module1));   

    let module2 = injector.define('m2', ['m1', constructor2])
    console.log(assert({name: 'm2', dependencies: ['m1'], constructor: constructor2, isInitializing: false, isInitialized: false }, module2));

    let init2 = injector.init('m2')
    console.log(assert(constructor2(constructor1()) , init2))

    console.log(injector.modules['m1']);

})(window)

