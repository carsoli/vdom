(function(global){
    let {document, Observer} = global;
    
    global.Todo_Item = {
        render(todo, todoId){
            return `<label class="todo-item__label chk-box__label">
                    <input class="chk-box" type="checkbox" id="done: ${todoId}" onChange="Todo_Item.toggleDone(id)" ${(todo.done)?"checked":""} > ${todo.content}</input>
                </label>
                <button class="btn--small bg--pale-pink todo-item__btn txt" id="delete: ${todoId}" onClick="Todo_Item.removeItem(id)"> x </button>`
        },

        removeItem(id){
            Observer.publish('action', {type: 'REMOVE_ITEM', index: id})
        },

        toggleDone(id){
            Observer.publish('action', {type: 'TOGGLE_DONE_ITEM', index: id})
        }
    }

})(window)
