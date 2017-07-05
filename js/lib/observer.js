(function(global){
    let {document} = global;
    
    global.Observer = {
        subscribers: {},
        subscribe(event, subscriber) {
            if(!(this.subscribers[event])){
                this.subscribers[event] = [];
            }
            this.subscribers[event].push(subscriber);
        },
    // remove a subscriber (a function) from the array of subscribers of the event
        unsubscribe(event, subscriber) {
            this.subscribers[event].map((sub,index)=>{
                if(sub == subscriber){
                    this.subscribers.splice(index, 1);
                    return;
                }
            })
            if(this.subscribers[event].length==0){
                delete this.subscribers.event 
            }
        },
    // loop over array of functions subscribed to this event and call them with arguments
        publish(event, args) {
            if(this.subscribers[event]){
                this.subscribers[event].map(subscriber => subscriber(args));
            }
        }
    }
})(window)
