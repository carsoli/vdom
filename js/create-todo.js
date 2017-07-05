(function(global){
    let {document, Observer} = global; 

    global.Create_Todo = {
        render(){
            return `<input class="todo-list-entry__input" placeholder="Enter New To Do" </input> 
                <button class="btn--small bg--orange-gradient txt--white todo-list-entry__btn" onClick="Create_Todo.addItem()"> + </button>` 
        },
        addItem(){
            let todoContent = document.querySelector('.todo-list-entry__input').value;
            if(todoContent != ''){
                let newItem = {content: todoContent , done: false}
                Observer.publish('action', { type: 'ADD_ITEM', todo: newItem})
            }
            else{
                global.alert('Please fill in Todo Info')
                return; 
            } 
        }
    }    
    
})(window)
