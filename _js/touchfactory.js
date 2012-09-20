window.jstures.touchFactory= (function(){
    "use strict";
    
    /************************************************
     * PRIVATE VARIABLES
     ************************************************/
    var _events= {};
    
    /************************************************
     * PRIVATE METHODS
     ************************************************/
    
    var _triggerEvent= function(evt, type){
        if(!_events[type]){
            _events[type]= new CustomEvent(type,
            {
                bubbles: true,
                cancelable: true,
                detail: {
                }
            });
        }
        evt.target.dispatchEvent(_events[type]);
    };
    
    var __constructor= function(){
        
    }
    
    __constructor();
    
    return {
        triggerEvent: _triggerEvent,
        events: _events
    };
})();