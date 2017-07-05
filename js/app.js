(function(global){
    // let Observer = global.Observer; //'s equivalent
    let {Observer} = global;
    
	global.App = {
        render(state){
            return `       
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
                    
                </div>`
        },
// Create_List, Create_Todo are exposed by their components
    }
})(window)
