(function(global){
    let {document, Observer, vdom} = global; 
    let hyperscript = vdom.hyperscript

    global.Create_Todo = {
        input: {},
        render(state){
            return [
                hyperscript('input', {class: "todo-list-entry__input", placeholder: "Enter New To Do", ref: (inputDOM)=>{ this.input = inputDOM; }}),
                hyperscript('button', {
                        class: "btn--small bg--orange-gradient txt--white todo-list-entry__btn",
                        onClick: Create_Todo.addItem.bind(this) 
                    }
                ,'+')
            ]
            // return `<input class="todo-list-entry__input" placeholder="Enter New To Do" </input> 
                // <button class="btn--small bg--orange-gradient txt--white todo-list-entry__btn" onClick="Create_Todo.addItem()"> + </button>` 
        },
        addItem(){
            let todoContent = this.input.value;
            // let todoContent = document.querySelector('.todo-list-entry__input').value;
            if(state.selectedListIndex && state.selectedListIndex != -1){
                if(todoContent != ''){
                    let newItem = {content: todoContent , done: false}
                    Observer.publish('action', { type: 'ADD_ITEM', todo: newItem})
                }
                else{
                    global.alert('Please fill in Todo Info')
                    return; 
                }
            }else{
                global.alert('Please Create/Select a List First')
                return; 
            }     
        }
    }    
    
})(window)
