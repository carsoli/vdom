(function(global){
    let {document, Observer, vdom} = global; 
    let hyperscript = vdom.hyperscript;

    global.Todo_List_List = {
        render(state){
            return hyperscript('ul', {class: "container-list"}, Todo_List_List.getLists(state) )
        
            // return `<ul class="container-list"> 
            // ${state.todoListList.map( list => 
            //     `<li>
            //     <button id="select: ${list.id}" class="btn todo-list-list__sel-btn bg--magneta-shade txt--white" onClick="Todo_List_List.selectList(id)"> ${list.name} </button>
            //     <button id="delete: ${list.id}" class="btn--small todo-list-list__del-btn bg--magneta-shade txt--white" onClick="Todo_List_List.removeList(id)"> x </button>
            //     </li>`).join('')
            // }</ul>`
        },

        getLists(state){
            let lists = state.todoListList.map((list) => {  
                return hyperscript('li', {}, 
                    hyperscript('button', {
                        id: "select: "+ (list.id), 
                        class:"btn todo-list-list__sel-btn bg--magneta-shade txt--white", 
                        onClick: function(){ Todo_List_List.selectList(this.id) 
                        /*scoping it in a function allows accessing props object scope with this*/ }
                        }, 
                    (list.name)+''), 
                    hyperscript('button', { id: "delete: "+ (list.id),
                        class: "btn--small todo-list-list__del-btn bg--magneta-shade txt--white",
                        onClick: function(){ Todo_List_List.removeList(this.id) } 
                        }
                    ,'x')
                )//each list object has two children passed to it
            })
            return lists;
        },

        removeList(id){//smth is wrong here
            let index = id.split(" ").pop()
            Observer.publish('action', {type: 'REMOVE_LIST', index: index})
        },

        selectList(id){//here,too
            let index = id.split(" ").pop()
            Observer.publish('action', {type: 'SELECT_LIST', index: index})
        }

    }

})(window)