(function(global){
    let {document, Observer} = global; 

    let createList = {
        localState: {},
        
        render(state){
            if(state.buttonOrInput == "button"){
                return `<button class="btn bg--orange-gradient txt--white create-list__btn" onClick="Create_List.showInput()">Create New List:</button>`
            }
            else if(state.buttonOrInput == "input"){
                return `<input class="create-list__input" placeholder="Enter List Name"> </input> <button class="btn--small bg--orange-gradient txt--white create-list__btn--add" onClick="Create_List.updateTodoListList()"> + </button>` 
            }
        },

        showInput(){
            Observer.publish('action', {type: 'SHOW_INPUT'})
        },

        showButton(){
            Observer.publish('action', {type: 'SHOW_BUTTON'})
        },

        updateTodoListList(){
            let name = document.querySelector('.create-list__input').value;
            if(name == ''){
                global.alert('Please Specify a List Name');
                return;
            }
            let newList = {id: -1, name: name, items: []}
            createList.localState = newList
            createList.showButton() 
            createList.addList(createList.localState);
        },
        
        addList(newList){
            Observer.publish('action', { type: 'ADD_LIST', todoList: newList });
        }
    }
global.Create_List = createList;

})(window)

