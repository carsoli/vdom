(function(global){
    let {Observer, vdom} = global;
    let hyperscript = vdom.hyperscript;
	
    global.App = {
        render(state){
            return hyperscript('div', {class: "container-base"}, 
                [
                    hyperscript('div', {class: "header bg--magneta-shade"}, global.Header.render()) ,
                    hyperscript('div', {class: "container-main"},
                        hyperscript('div', {class: "col1"},
                            hyperscript('div', {class: "add-list"}, global.Create_List.render(state)),
                            hyperscript('div', {class: "container-sub bg--dark-purple"}, global.Todo_List_List.render(state))
                        ),
                        hyperscript('div', {class: "col2"},
                            hyperscript('div', {class: "add-todo"}, global.Create_Todo.render(state)),
                            hyperscript('div', {class: "container-sub"}, 
                                global.Todo_List.render(state.todoListList[state.selectedListIndex], state.selectedListIndex)
                            )
                        )
                    )
                ]
            )
            /* return `       
                <div class="header bg--magneta-shade">${global.Header.render()}</div>
                <div class="container-main">
                    <div class="col1">
                        <div class="add-list">${global.Create_List.render(state)}</div>
                        <div class="container-sub bg--dark-purple"> ${global.Todo_List_List.render(state)} </div>
                    </div>

                    <div class="col2">
                        <div class="add-todo"> ${global.Create_Todo.render()} </div>
                        <div class="container-sub">${global.Todo_List.render(state.todoListList[state.selectedListIndex], state.selectedListIndex)}</div>
                    </div>  
                    
                </div>` */
        }
    }
})(window)
