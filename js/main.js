(function main(global){
    let {document, store, vdom} = global; 
    // console.log(vdom)
    Observer.subscribe('stateChange', (newState) => render(newState) )

    function render(state){
        // debugger
        vdom.renderHTML(document.querySelector(".container-base"), App.render(state));
        // document.querySelector(".container-base").innerHTML= vdom.renderString(App.render(state));
        // document.querySelector(".container-base").innerHTML = App.render(state);
    };
    
    render(store.getState());
    
})(window)
