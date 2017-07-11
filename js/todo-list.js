(function(global){
    let {document, Observer, vdom} = global; 
    let hyperscript = vdom.hyperscript;

    global.Todo_List = {
        render(list, listIndex){
            if(list){
                return hyperscript('ul', {class: "container-list"}, Todo_List.getListItems(list, listIndex) )
                /* return `<ul class="container-list"> 
                    ${list.items.map((todo, index) => 
                        `<li class="bg--pale-pink" id="${listIndex}: ${index}"> ${global.Todo_Item.render(todo, Todo_List.getId(listIndex, index) )} 
                        </li>`
                        ).join('') 
                    }<ul>` */
            }
            else{
                return hyperscript('ul', {class:"container-list"})
                /* return `<ul class="container-list"></ul>` */
            }   
        },
        getListItems(list, listIndex){
            let todos = list.items.map( (todo, index) => {
                return hyperscript('li', {class: "bg--pale-pink", id: listIndex+": "+index}, global.Todo_Item.render(todo, Todo_List.getId(listIndex, index)) )
            })
            return todos;
        }, 
        getId(listIndex, index){
            let todoId = listIndex + ": " + index
            return todoId
        }
    }
})(window)