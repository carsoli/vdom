/*
type VirtualDOMObject = {
    tag/type: string,
    props: object,
    children: [VirtualDOMObject]
}

//exported fns are to be used by the actual document to append the final output to the container
    exports.renderString(VirtualDOMObject): String //takes the vdom and returns a string? useful??
    exports.renderHTML(container, VirtualDOMObject) //takes the vdom and the container  

updateElement(parent, oldvdom: VirtualDOMObject, newvdom: VirtualDOMObject, indexOfChild): DOMNode   //recursive 
`createElement(name, props, children): DOMNode 
``setProps(domNode, props)
``exports.appendChild(domNode, children)
``removeChild(parent, index)
`isChanged($oldNode, newNode): boolean //true if nodes are not equal
`removeElement(index, $oldNode)
hypertext(name, props, ...children): VirtualDOMObject*/

window.vdom = (function(){
    let vDOM; 

    function renderString(vdom){
        // debugger
        if(typeof vdom == "string"){
            return vdom //a string 
        }

        return ` <${vdom.type}${(vdom.props)?appendProps(vdom.props):''}${appendType(vdom.type, 'first')} 
  ${((vdom.children)&&(vdom.children.length>0))?(vdom.children.map(renderString)).join('\n  '):''}
${appendType(vdom.type,'second')} `
        
    }
    
    //helpers
    function adjustIndentation(){

    }
    function appendType(type, tagPosition){
        // debugger
        if(tagPosition == 'first'){
            switch(type){
                //check all self-closing cases
                case 'input': return ' />';
                default: return '>';
            }
        }else if(tagPosition == 'second'){
            switch(type){
                //check all self-closing cases
                case 'input': return;
                default: return ('</' + type + '>') ; 
            }
        }
        return '====WRONG ARGUMENTS PASSED TO APPEND TYPE FUNCTION====';
    }

    function appendProps(props){
        // debugger
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

    //----------
    function renderHTML($container, newVDOM){
        // debugger
        updateElement($container, vDOM, newVDOM); //updateElement(parent, old, new)
    }

    
    function hyperscript(type, props, ...children){ 
        // debugger
        //in case one of the elements in the children objects is passed as an array
        children = (children || []).reduce((acc,child)=> { return acc.concat(child) }, [])

        return { type, props: props || {}, children}
    }

    //helpers
    function createElement({type, props, children}){
        // debugger
        if(typeof arguments[0] === 'string'){
            //  || typeof arguments[0] !== 'object'){
            return document.createTextNode(arguments[0])
        }
        let $el = document.createElement(type) //does this *return* a document element?
        setProps($el, props);
        children.map(createElement).forEach($el.appendChild.bind($el))
        return $el;
    }

    function setProps($el, properties){
        if (!properties) return; 
        
        if(properties['class']){//handling the class attribute thing 
            let {class: propValue} =properties
            // let propValue = props['class']
            properties['className'] = propValue
            delete properties['class']
        }

        Object.keys(properties).forEach((key)=> {
            if(properties[key]){ 
                $el.setAttribute(key, properties[key])
            }
            let events = []
            if(properties[key].slice(0,2) == 'on'){
                /* event */
            }
            else {
                /* all other special cases */
            }
        })

        // let attributeNames = []
        // let index = 0
        // for(prop in properties){ 
        //     if(properties && properties.hasOwnProperty(prop)){
        //         attributeNames.push(prop)
        //         $el.setAttribute(attributeNames[index], properties[attributeNames[index]])
        //     /*later*/
        //     if(attributeNames[index].slice(0,2) == 'on'){
        //         /* it's an event */
        //     }
        //     else {
        //         /* handle all other special cases for non-event properties */ 
        //     }

        //     }
        //     index++;
        // } 


    }

    function removeChild(child){ 
        //for debugging temporarily
        let refToRC= document.removeChild //reference to removeChild
        let removedChild = parent.refToRC(child).bind(parent);
    }

    function isChanged(oldNode, newNode){
        return oldNode.type != newNode.type
    }

    function updateElement($parent, $oldNode, newNode, index=0){
        // debugger
    //recursive
        if(!$oldNode){
        //meaning a node was added in the new object
            if(!newNode) return;
            $parent.appendChild(createElement(newNode))
        }else if(!newNode){
        //meaning a node was deleted from the new object
        $parent.removeChild($parent.childNode[index])
        }else if($oldNode.type == newNode.type){ 
        // !(isChanged($oldNode, newNode))){
        let oldLengh = $oldNode.children.length
        let newLength = newNode.children.length 
        for(let i=0 ; i < oldLengh || i < newLength; i++){
            //condition checks both lengths so that we'd keeping looping to detect the first 2 cases
            updateElement($parent, $oldNode.children[i], newNode.children[i], i)
        }
    } else {//either changes
        $parent.replaceChild(createElement(newNode), $parent.childNode[index]) 
        // parent.appendChild(createElement(newNode))
        }
    }

    return {//return references
            renderString,
            hyperscript,
            renderHTML,
        }

})()

    // function hyperscript(type, props, ...children){ 
    //     if(props['class']){
    //         // let {class: className} = props
    //         let propValue = props['class']
    //         props['className'] = propValue
    //         delete props['class']
    //     }
    //     children = (children || []).reduce((acc,child)=> {return acc.concat(child)}, [])

    //     return { type, props: props || {}, children}
    // }

    // let a =
    //         hyperscript('ul', {class: "list"}, 
    //             hyperscript('li', null, 'item1'), 
    //             hyperscript('li', null, 'item2')
    //         )  
    
    // let b = (
    // <ul class= 'list'>
    //     <li>
    //         <p>item1.1</p>
    //         <p>item 1.2</p>
    //     </li>

    //     <li>item 2</li>
    // </ul>)