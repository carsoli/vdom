(function(global){
    let {document, Observer} = global; 
    
    global.Todo_List = {
        render(list, listIndex){
            if(list){
                return `<ul class="container-list"> 
                    ${list.items.map((todo, index) => 
                        `<li class="bg--pale-pink id="${listIndex}: ${index}"> ${global.Todo_Item.render(todo, Todo_List.getId(listIndex, index) )} 
                        </li>`
                        ).join('') 
                    }<ul>`
            }
            else{
                return `<ul class="container-list"></ul>`
            }   
        }, 
        getId(listIndex, index){
            let todoId = listIndex + ": " + index
            return todoId 
        }
    }
})(window)