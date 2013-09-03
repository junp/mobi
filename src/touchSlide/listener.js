/**
 * 监听事件
 */

define(function(require, exports, module) {
	/**
	 * @class Listener 监听器
	 */
	var Listener = {
	    /**
	     * @method getListener 获取可用监听者
	     * @param {Object} caller 监听者
	     */
	    getListener : function(caller){
	        var o = caller || {"on":{}};
	        return o;
	    },
	    /**
	     * @method set 设置回调
	     * @param {Object} caller 調用者
	     * @param {String} type 类型
	     * @param {Function} callback 回调
	     * @param {Array} args 参数
	     * @param {Object} context 上下文
	     */
	    set : function(caller, type, callback, args, context){
	        var key = "on" + type;
	        var rvs = "|beforecheck|offline|online|customcheck|";
	        var listener = this.getListener(caller);
	
	        if(key in listener.on){
	            if(callback && (callback instanceof Function) && callback.apply){
	                listener.on[key] = {
	                    "callback" : callback,
	                    "args" : args || [],
	                    "context" : context || listener,
	                    "returnValue" : (rvs.indexOf("|"+type+"|") != -1)
	                };
	            }else{
	                listener.on[key] = null;
	            }
	        }
	        
	        listener = null;
	    },
	    /**
	     * @method remove移除回调
	     * @param {Object} caller 調用者
	     * @param {String} type 类型
	     */
	    remove : function(caller, type){
	        var listener = this.getListener(caller);
	        
	        listener.on["on" + type] = null;
	        
	        listener = null;
	    },
	    /**
	     * @method get 获取回调
	     * @param {Object} caller 调用者
	     * @param {String} type 类型
	     * @return {Object} 监听者
	     */
	    get : function(caller, type){
	        var listener = this.getListener(caller);
	        var key = "on" + type;
	        var o = listener.on;
	
	        if(key in o){
	            return o[key];
	        }
	        
	        listener = null;
	        return null;
	    },
	    /**
	     * @method clear 清除所有回调
	     * @param {Object} caller 调用者
	     */
	    clear : function(caller){
	        var listener = this.getListener(caller);
	         
	        for(var key in listener.on){
	            if(listener.on.hasOwnProperty(key)){
	                listener.remove(caller, key.substr(2));
	            }
	        }
	        
	        listener = null;
	    },
	    /**
	     * @method execCallback 执行回调函数
	     * @param {Object} caller 調用者
	     * @param {String} type 类型
	     * @param {Array} args 消息
	     * @return {Object} 返回值
	     */
	    execCallback : function(caller, type, args){
	        var o = this.get(caller, type);
	        var m = args || [];
	        var a = [].concat(m);
	        var result = undefined;
	
	        if(o && o.callback){
	            a = a.concat(o.args||[]);
	            if(true === o.returnValue){
	                result = o.callback.apply((o.context||this), a);
	            }else{
	                o.callback.apply((o.context||this), a);
	            }
	        }
	        m = null; a = null;
	
	        return result;
	    }
	};
	
	return Listener;
});