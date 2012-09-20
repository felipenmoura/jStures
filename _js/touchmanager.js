;window.jstures.touchManager= (function(jstures){
    "use strict";
    
    /************************************************
     * PRIVATE VARIABLES
     ************************************************/
    
    /************************************************
     * PRIVATE METHODS
     ************************************************/
    var _touchStart= function(event){
        event.preventDefault();
        window.jstures.touchFactory.triggerEvent(event, jstures.CONST.TOUCH_START);
        //jstures.logTouches();
    }
    var _touchMove= function(event){
        return false;
        event.preventDefault();
        window.jstures.touchFactory.triggerEvent(event, 'move');
        jstures.logTouches();
    }
    var _touchEnd= function(event){
        return false;
        event.preventDefault();
        window.jstures.touchFactory.triggerEvent(event, 'end');
        jstures.logTouches();
    }
    var _touchCancel= function(event){
        return false;
        event.preventDefault();
        window.jstures.touchFactory.triggerEvent(event, 'cancel');
        jstures.logTouches();
    }
    var _touchLeave= function(event){
        return false;
        event.preventDefault();
        window.jstures.touchFactory.triggerEvent(event, 'leave');
        jstures.logTouches();
    }
    
    var __CONSTRUCTOR= function(w){
        w.addEventListener('load', function(){
            var d= w.document;
            d.addEventListener('touchstart',  _touchStart , false);
            d.addEventListener('touchmove',   _touchMove  , false);
            d.addEventListener('touchend',    _touchEnd   , false);
            d.addEventListener('touchcancel', _touchCancel, false);
            d.addEventListener('touchleave',  _touchLeave , false);
        }, false);
    }

    __CONSTRUCTOR(window);
    return {
        
    };
})(jstures);
