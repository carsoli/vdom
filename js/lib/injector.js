(function(global) {

    return global.injector = {
        modules: {},

        define(moduleName, dependenciesArr){  //inject: function(){}
            let dependencies = [];
            let constructor = {};
            if(Array.isArray(dependenciesArr)){
                if (dependenciesArr.length>0) {
                    constructor = dependenciesArr.pop()   
                }
                dependencies = dependenciesArr
            } 
            if(!(this.modules[moduleName])){   
                this.modules[moduleName] = {/*module schema*/
                    name: moduleName, 
                    dependencies: dependencies,
                    constructor: constructor, 
                    isInitializing: false, /* to detect circular dependancy */
                    isInitialized: false  /* for the init function */
                }
            }
            return this.modules[moduleName];
            //return error if module name already exists to avoid overwriting
        },
  
        init(moduleName, opts){ /*initializes a module */
            if(!(this.modules[moduleName])){/* if it's not defined, throw an error */ 
                return new Error("module ",  moduleName, " is not defined");
            }
            let dependencies = [];

            if(!(this.modules[moduleName].isInitializing)){
                dependencies = this.modules[moduleName].dependencies.map((dependencyName) => {
                    // if (opts[dependencyName]) { return opts[dependencyName] } 
                    let dependency = this.modules[dependencyName];   
                    if(!(dependency.isInitialized)){
                        dependency.isInitializing = true;
                        this.init(dependencyName);
                        dependency.isInitializing = false; 
                        dependency.isInitialized = true; 
                    }
                })
            }
            else {
                return new Error("circular dependancy between: ", this.modules[moduleName])
            }

            return this.modules[moduleName].constructor(...dependencies);
        },

        // run(modulesArray){/*initializes an anonymous module, executes the constructor then deletes it*/
        //     let opts = {}
        //     modulesArray.map((module)=>{
        //         // module.init();
        //     })
        //     delete moduleArray; 
        // }
    }

})(window)

