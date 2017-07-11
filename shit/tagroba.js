// let redom = require('redom') ;
// let el = redom.el;
// let mount = redom.mount;
// import { el, mount } from 'redom';

// hyperscript('input', {'checked': true}, []);
// mount(document.body, hello);

function hyperscript(type, props, ...children){ 
    //in case one of the elements in the children objects is passed as an array
    children = (children || []).reduce((acc,child)=> { return acc.concat(child) }, [])

    return { type, props: props || {}, children}
}


// let a = (<input checked></input>)

