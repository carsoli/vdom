window.store = function store(global) {
    this.state = {
        "buttonOrInput": "button",
        "todoListList": [
            {
                "id": 0,
                "name": "First List",
                "items": [
                    {
                        "content": "Somthing 1",
                        "done": true
                    },
                    {
                        "content": "Something 2",
                        "done": false
                    }
                ],
            },

            {"id": 1, "name": "Second List", "items": [{"content": "item 1","done": false},{"content": "item 2","done": true}]}
        ], 
        "selectedListIndex": 0 
    }

    // this.reducer: (state, action)=> {return state} //initially so it wouldn't through an error

    // _subscribers: [],

    this.getState = () => { 
        return this.state; 
    }

    // setReducer: (reducer)=> {

    // },

    // dispatch: ()=>{
        //essentially like publish 
    // },

    // subscribe: ()=>{

    // },

    return {
        getState: this.getState,
        // setReducer: this.setReducer, 
        // dispatch: this.dispatch, 
        // subscribe: this.subscribe
    }

}(window)