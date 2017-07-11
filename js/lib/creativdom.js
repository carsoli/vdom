/*
type VirtualDOMObject = {
    tag/type: string,
    props: object,
    children: [VirtualDOMObject]
}*/ 

window.vdom = (function(){

    function hyperscript(type, props, ...children){
        if(props && props['class']){//bc class is a reserved keyword in js
            let {class: className} = props
            let propValue = props['class']
            props['className'] = propValue
            delete props['class']
        }
        //in case one of the elements in the children objects is passed as an array
        children = (children || []).reduce((acc,child)=> { return acc.concat(child) }, [])
        return { type, props: props || {}, children: children || []}
    }

    let vDOM; 
    let level= 0;
    let lastParent = null; //should store reference to a vdom node object
    let indentation = " " 

    //fix ==> pass the indentation in the renderString param 
    function renderString(vdom, parentNode){
        if(typeof vdom == "string"){
            return vdom//a string 
        }

        if (!lastParent){//it's null then that's the first element in the vdom (only satisfied once)
            lastParent = vdom; 
        }else if(!lastParent.children.includes(vdom)){//if the vdom is not a child of the last parent saved 
            lastParent = parentNode 
            indentation = adjustIndentation(++level); 
        } 
        //waste time later  ---- try to handle the string thingy
        return `<${vdom.type}${(vdom.props)?appendProps(vdom.props):''}${closeTag(vdom.type, 'first')}
${indentation}${((vdom.children)&&(vdom.children.length>0))?(vdom.children.map((childNode) => renderString(childNode, vdom)).join('\n')):''}
${indentation}${closeTag(vdom.type,'second')}`
    }
    
    /* helpers for renderString(vdom) */
    
    // Array.prototype.joinNodes = function(){
    //idea: split the array, into one with strings and one with nodes
    //and pass the initial position of each elem as a second value to these 2 new array objects
    //now join the strings array with "" and join the nodes array with "\n"
    //loop on both arrays simultaneously and only increment when the larger of both positions has exceeded the 
    //current i you use to loop on both
    //but use j and k to loop seperately on either where j & k are initially == i 

    //     let children = this
    //     children.forEach((elem)=>{
    //         if(typeof elem =="string" && elem.charAt(elem.length-1)){
    //             //append an empty string to the node? replace - with ""
    //             elem+= "."
    //         }
    //         else{
    //             //replace - with "\n"
    //             elem+= "\n"
    //         }
    //     })
    //     children.join("")
    //     return children
    // } 

    function adjustIndentation(_level){
        let _indentation = ""
        for(let i=0 ; i < _level ; i++){
            _indentation += " "
        }
        return _indentation;   
    }

    function closeTag(type, tagPosition){
        if(tagPosition == 'first'){
            switch(type){
                //check all self-closing cases
                case 'input': return '/>';
                default: return '>';
            }
        }else if(tagPosition == 'second'){
            switch(type){
                //check all self-closing cases
                case 'input': return '';
                default: return ('</' + type + '>') ; 
            }
        }
        return '====WRONG ARGUMENTS PASSED TO APPEND TYPE FUNCTION====';
    }

    function appendProps(props){
        let result = ""
        if (props['className']){
            let value = props['className']
            props['class'] = value
            delete props['className']
        }

        Object.keys(props).forEach((propName) => {
            let propValue = props[propName]
            result += (" "+ propName + "='" + propValue + "'")
        })
        return result;
    }

    //---------------------------------------------------------------------------------------------
    function renderHTML($container, newVDOM){
        updateElement($container, vDOM, newVDOM); //updateElement(parent, old, new)
        vDOM = newVDOM; //update the vDOM
    }

    /*  helpers for renderHTML() */
    function createElement({type, props, children}){
        if(typeof arguments[0] === 'string'){
            return document.createTextNode(arguments[0])
        }
        let $el = document.createElement(type); /* HTML element */
        setProps($el, props);
        addEventListeners($el, props);

        if(props['ref']){/*check react ref property*/
            /* applied to any element, contains a callback that gets called when the element is mounted(attached to DOM) */
            props['ref']($el) /*call the callback and pass the mounted element to it */
        }
        if(children){
            children.map(createElement).forEach($el.appendChild.bind($el));
        }
        return $el;
    }

    function replaceElement($parent, newChild, oldChild){
        $parent.replaceChild(newChild, oldChild)
    }

    function replaceText($parent, newString){
        $parent.innerHTML = newString; //parent.innerText is equivalent
    }

    function removeElement($parent, oldNode){
        //parentNode is a property of the node which returns an HTML elem
        return oldNode.parentNode.removeChild(oldNode)
        // return $parent.removeChild(oldNode)
    }

    function updateElement($parent, oldNode, newNode, index=0){
        if(!oldNode){//meaning a node was added in the new object
            if(!newNode) return;      
            $parent.appendChild(createElement(newNode))
        }
        else if(!newNode){//meaning a node was deleted from the new object
                removeElement($parent, $parent.childNodes[index])
        }
        else if( isChanged(oldNode, newNode) == 'node'){//if the node itself changed
                //note that childNodes return a DOM node not HTML element
                replaceElement($parent, createElement(newNode), $parent.childNodes[index]);
        }
        else if(isChanged(oldNode, newNode) == 'text'){
                replaceText($parent, newNode)
        }
        else{
            if(newNode.props){//if they're not text nodes
                checkAndUpdateProps($parent, oldNode, newNode);
            }

            let oldLengh;
            let newLength;
            
            if(!oldNode.children){
                oldLengh = -1;
            }
            else{
                oldLengh = oldNode.children.length
            }

            if(!newNode.children){
                newLength = -1; 
            }
            else{
                newLength = newNode.children.length
            }

            for(let i = 0 ; i < oldLengh || i < newLength; i++){
            /*check both lengths so that we'd keeping looping to detect the first 2 cases*/
            /*the children property on $parent returns html object unlike childNodes which returns DOM*/
                updateElement($parent.children[index] , oldNode.children[i], newNode.children[i], (newLength<oldLengh?Math.min(i, newLength):i) )
            }
        } 
    }
    /* helpers for diffing nodes */
    function isChanged(oldNode, newNode){
        if(isNodeChanged(oldNode, newNode)){
            return 'node'
        }
        else if(isTextChanged(oldNode, newNode)){
            return 'text'
        }
    }

    function isNodeChanged(oldNode, newNode){        
        return (typeof oldNode != typeof newNode) || (oldNode.type != newNode.type) || (newNode.props && newNode.props.forceUpdate)
        //textNode vs Element || different tags or update is forced bc an event was added
    }

    function isTextChanged(oldNode, newNode){//both nodes are a string but are different
        return (typeof oldNode === "string") && (typeof oldNode === 'string') && (newNode != oldNode) 
    }

    function checkAndUpdateProps($parent, oldNode, newNode){
        let newProps = newNode.props
        let oldProps = oldNode.props
        let allProps = Object.assign({}, oldProps, newProps)

        Object.keys(allProps).forEach( (key) => {
            if(!newProps.hasOwnProperty(key)){
                //old node has it but new node doesn't (it was deleted)
                removeProp($parent, key)
            }else if(!oldProps.hasOwnProperty(key)){
                //if new node has it but old node doesn't (it was added)
                setProp($parent, key, newProps[key])//setProp($parent, key, value)
                //oldNode has it but new node doesn't (it was deleted)
            }else if(newProps[key] != oldProps[key]){
                //both nodes have it --compare values
                setProp($parent, key, newProps[key])//parent, key, newValue   
            }
        }) 
    }

    /* helpers for diffing props */
    function isCustomProperty(node, property){
        //takes a vdom node & a property, which if is custom is not added to the actual DOM
        return isEventProp(property) || property === 'forceUpdate' || property == 'ref' 
    }

    function setProps($el, properties){
        if (!properties) return; 
        Object.keys(properties).forEach((key)=> { 
            setProp($el, key, properties[key])
        })
    }

    function setProp($el, key, value){
        if(isCustomProperty($el, key)){
            return; //we dont want to set custom properties
        }
        else if(key == 'className'){
            $el.setAttribute('class', value)
        }
        else if(typeof value == 'boolean'){
            setBooleanProp($el, key, value)
        }
        else{
            $el.setAttribute(key,value)
        }
    }

    function setBooleanProp($el, key, value){
        if(value){//if(value == true)
            $el.setAttribute(key, value)
            $el[key] = true; 
        }else {
            $el[key]= false;
        }
    }
    
    function removeProp($el, key){
        if(isCustomProperty($el, key)){
            return; //we dont want to remove custom properties
        }
        else if(key === 'className'){
            $el.removeAttribute('class')
        }
        else if(typeof value == 'boolean'){
            removeBooleanProp($el, key)
        }
        else{
            $el.removeAttribute(key)
        }
    }
    
    function removeBooleanProp($el, key){
        $el.removeAttribute(key)
        $el[key]= false //in HTML, attributes are part of the object 
    }

    /* helpers for events handling */
    function isEventProp(key){
        return key.slice(0,2) == 'on';
    }

    function extractEventName(key){
        return key.slice(2).toLowerCase();
    }

    function addEventListeners($target, props){
        if(props){
            Object.keys(props).forEach((key)=>{
                if(isEventProp(key)){
                    let eventName = extractEventName(key);
                    $target.addEventListener(eventName, props[key])
                    /*  by default, capture flag is set to false */
                    /*addEventListener($target, listenerFn, captureFlag[if true, prevent bubbling, but allow capturing]) */
                }
            })
        }
    }

    //----------------------------------------------------------------------------
    return {//return references
            renderString,
            hyperscript,
            renderHTML,
    }

} )()