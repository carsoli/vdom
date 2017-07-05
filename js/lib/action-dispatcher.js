(function(global){
    let {document, Observer, store} = global; 
    let state = store.getState();
    
    Observer.subscribe('action', (action)=>{
        switch(action.type){
            case 'ADD_LIST': 
                action.todoList.id = state.todoListList.length;
                state.todoListList.push(action.todoList); 
                state.selectedListIndex = state.todoListList.length-1; 
                break;
            case 'SHOW_INPUT': 
                state.buttonOrInput = "input";
                break;
            case 'SHOW_BUTTON': 
                state.buttonOrInput = "button"; 
                break; 
            case 'REMOVE_LIST':
                state.todoListList.splice(action.index, 1);
                if( state.todoListList.length > 0 ){
                    state.selectedListIndex = 0 ;
                }               
                state.todoListList.map((list, index) => { list.id = index; }) 
                break;
            case 'SELECT_LIST': 
                state.selectedListIndex = action.index;
                break;
            case 'ADD_ITEM': 
                state.todoListList[state.selectedListIndex].items.push(action.todo)
                break;
            case 'REMOVE_ITEM':
                let todoIndex = action.index.split(" ").pop()
                state.todoListList[state.selectedListIndex].items.splice(todoIndex, 1)
                break;
            case 'TOGGLE_DONE_ITEM':
                let doneIndex = action.index.split(" ").pop()
                state.todoListList[state.selectedListIndex].items[doneIndex].done = !(state.todoListList[state.selectedListIndex].items[doneIndex].done)
                if(state.todoListList[state.selectedListIndex].items[doneIndex].done){
                    global.alert("PHEWWWW! ONE DOWN")
                }       
                break;
        }
        Observer.publish('stateChange', state)
    })


})(window)