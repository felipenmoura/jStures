/* 
 * JStures JavaScript library
 */
;window.jstures= (function(){
    "use strict";
    
    var _self= false,
        _d= false, // to be the document local reference
        _settings= {
            debug: false,
            preventZoom: true,
            preventScroll: true
        }

    /************************************************
     * PRIVATE VARIABLES
     ************************************************/
    var _currentTouches= [],
        _gestures= {},
        _debugEl= false,
        _debugElMessages= false,
        _debugElTouches= false;
    
    var _MESSAGES= {
        invalidConfObj: 'invalid gesture conf object'
    };
    
    /************************************************
     * PRIVATE METHODS
     ************************************************/
    var _isValidGestureConf= function(conf){
        if(typeof conf == 'object' && conf.type && conf.exec && conf.target){
            return true;
        }else{
                _log(_MESSAGES.invalidConfObj, 'error', conf);
                return false;
            }
    };
    var _addGesture= function(){
        var j= 0, l= 0, i= 0, ts= [], conf;
        
        l= arguments.length;
        for(; j<l; j++){
            conf= arguments[j];
            if(_isValidGestureConf(conf)){
                _log('AddedGesture');
                if(!_gestures[conf.type])
                    _gestures[conf.type]= {};

                if(typeof conf.target == 'string')
                    conf.target= _d.querySelectorAll(conf.target);
                if(!conf.target.length)
                    conf.target= [conf.target];

                i= conf.target.length-1;
                ts= conf.target;
                do{
                    ts[i].addEventListener(conf.type, conf.exec, false);
                }while(i--);

            }else
                throw new Error(_MESSAGES.invalidConfObj);
        }
    };
    
    /************************************************
     * UTILS
     ************************************************/
    var _clearLog= function(){
        if(_debugElMessages)
            _debugElMessages.innerHTML= "";
    };
    var _logTouches= function(){
        if(_debugElTouches)
            _debugElTouches.innerHTML= _currentTouches.length;
    }
    var _log= function(msg, type){
        if(_settings.debug){
            if(!_debugEl && _settings.debug !==true){
                _debugEl= _d.querySelector(_settings.debug);
                _debugEl.innerHTML+= "<div>\
                                      Current Touches: <span id='jstures-log-curTouches'>0</span><br/>\
                                      Messages:<br/><div id='jstures-log-messages'></div>\
                                      </div>";
            }
            
            type= type||'log';
            
            _debugElMessages= _d.getElementById('jstures-log-messages');
            _debugElTouches = _d.getElementById('jstures-log-curTouches');
            if(_debugElMessages)    
                _debugElMessages.innerHTML+= type+" - "+msg+"<br/>";
            
            if(window.console){
                window.console[type]("[JStures]", arguments);
            }
        }
    };
    
    var __constructor= function(self, doc){
        _self= self;
        _d= doc;
        
        /** DEALING WITH BROWSERS THAT DOES NOT SUPPORT TOUCH */
        if(!document.createTouch){
            // TODO: decide how to deal with it
            //throw new JSTURESERROR();
        }
    };
    
    var _setSettings= function(set){
        for(var x in set){
            if(set.hasOwnProperty(x))
                _settings[x]= set[x]
        }
    }
    
    /************************************************
     * PUBLIC
     ************************************************/
    return {
        debug: false,
        settings: _setSettings,
        log: _log,
        clearLog: _clearLog,
        logTouches: _logTouches,
        currentTouches: _currentTouches,
        addGesture: _addGesture,
        init: __constructor
    }
})();

// used to enable the auto-complite in your IDE
jstures.CONST= {
    TOUCH_START: 'touchStartEvent',
    TOUCH_MOVE: 'touchMoveEvent',
    TOUCH_END: 'touchEndEvent',
    TAP: 'tap',
    DOUBLE_TAP: 'doubleTap',
    TRIPPLE_TAP: 'trippleTap',
    HOLD: 'hold',
    MOVE_DOWN: 'moveDown',
    MOVE_UP: 'moveUp',
    MOVE_Left: 'moveLeft',
    MOVE_RIGHT: 'moveRight',
    MOVE_AWAY: 'moveAway',
    MOVE_CLOSER: "moveCloser",
    MOVE_FARTHER: 'moveFarther',
    MOVE_OFF: 'moveOff'
};

// __constructor
jstures.init(jstures, document);