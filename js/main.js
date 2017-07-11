(function main(global){
    let {document, store, vdom} = global; 
    Observer.subscribe('stateChange', (newState) => render(newState) )
    renderHTML = vdom.renderHTML;
    hyperscript = vdom.hyperscript;
    
    function render(state){
        renderHTML( document.getElementById("app"), App.render(state));
        // document.querySelector(".container-base").innerHTML= vdom.renderString(App.render(state));
        // document.querySelector(".container-base").innerHTML = App.render(state);
    };
    
    render(store.getState());
    
})(window)
