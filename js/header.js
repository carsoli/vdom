(function header(global){
    let {document, vdom} = global;
    let hyperscript = vdom.hyperscript;

    global.Header = {
        render(){
            return vdom.hyperscript('h1', {class: "header__title txt--white"}, 'To-Do App')
            // return `<h1 class="header__title txt--white"> To-Do App </h1>`
        }
    }
})(window)

