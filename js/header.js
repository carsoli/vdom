(function header(global){
    let {document} = global;
    
    global.Header = {
        render(){ //es6  == renderHeader: function(state){}
            return `<h1 class="header__title txt--white"> To-Do App </h1>`
        }
    }
})(window)

