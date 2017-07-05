(function(global){
    let {document, Observer} = global; 

    global.Todo_List_List = {
        render(state){
            return `<ul class="container-list"> 
            ${state.todoListList.map( list => 
                `<li>
                <button id="select: ${list.id}" class="btn todo-list-list__sel-btn bg--magneta-shade txt--white" onClick="Todo_List_List.selectList(id)"> ${list.name} </button>
                <button id="delete: ${list.id}" class="btn--small todo-list-list__del-btn bg--magneta-shade txt--white" onClick="Todo_List_List.removeList(id)"> x </button>
                </li>`).join('')
            }</ul>`
        },

        removeList(id){
            let index = id.split(" ").pop()
            Observer.publish('action', {type: 'REMOVE_LIST', index: index})
        },

        selectList(id){
            let index = id.split(" ").pop()
            Observer.publish('action', {type: 'SELECT_LIST', index: index})
        }

    }

})(window)