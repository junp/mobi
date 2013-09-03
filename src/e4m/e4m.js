(function(Zepto){

    /**
     * 客户端session接口
     */
    var _Session = {
        storage : "Storage",
        session : "session",
        prefix : "E4M_",
        db : {
            "session" : -1,
            "local" : -1
        },
        /**
         * 获取真实KEY
         */
        getRealKey : function(key){
            var p = this.prefix || "E4M_";
            
            return (p + key);
        },
        getSafeType : function(type){
            var _type = type || this.session;
            
            if("local" ==  _type && !this.support(_type)){
                _type = this.session;
            }
            
            return _type;
        },
        /**
         * 设置属性值
         * @param String key 名称
         * @param String value  值
         * @param String type 存储方式 local/session 默认为session
         */
        set : function(key, value, type){
            try{
                type = this.getSafeType(type);
                window[type + this.storage].setItem(this.getRealKey(key), value);
            }catch(e){}
        },
        /**
         * 获取属性值
         * @param String key 名称
         * @param String type 存储方式 local/session 默认为session
         * @return String value  值
         */
        get : function(key, type){
            var v = "";
            try{
                type = this.getSafeType(type);
                v = window[type + this.storage].getItem(this.getRealKey(key));
            }catch(e){}

            return v;
        },
        /**
         * 删除属性值
         * @param String key 名称
         * @param String type 存储方式 local/session 默认为session
         */
        remove : function(key, type){
            try{
                type = this.getSafeType(type);
                window[type + this.storage].removeItem(this.getRealKey(key));
            }catch(e){}
        },
        /**
         * 清空sessionStorage
         * @param String type 存储方式 local/session 默认为session
         */
        clear : function(type){
            try{
                type = this.getSafeType(type);
                var storage = window[type + this.storage];
                var item, key;
                var conf = null;
                
                for(item in storage){
                    key = item.split(this.prefix)[1];
                    
                    if(key && (null != (conf = this.get(key)))){
                        this.remove(key);
                    }
                }
            }catch(e){}
        },
        /**
         * 清理Storage的存储值
         * @param String keysRegExp 以特定格式组成的key值（需保留的KEY）， key1|key2|key3|...keyn
         * @param String type 存储方式 local/session 默认为session
         */
        clean : function(keysRegExp, type){
            type = this.getSafeType(type);
            
            var pattern = null;
            var keys = (keysRegExp || "");
            var key = null;
            var storage = window[type + this.storage];
            
            if(!keys){
                this.clear(type);
            }else{
                pattern = new RegExp("^(" + keys + ")$");

                for(var i = storage.length; i >= 0; i--){
                    key = storage.key(i);
                    key = key.split(this.prefix)[1];
                    
                    if(!!!key){continue;}
                    if(pattern.test(key)){continue;}
                    this.remove(key, type);
                }
            }
            
            pattern = null; arr = null;
        },
        /**
         * 是否支持storage
         * @param String type 存储方式 local/session 默认为session
         * @return Boolean support true/false
         */
        support : function(type){
            type = type||this.session;
            
            var storage = window[type + this.storage];
            var __is = false;
            var key = "E4M_CACHE_SUPPORT";
            var cache = this.db[type];
            
            if(cache != -1){
                return cache;
            }else{
                try{
                    storage.setItem(key, "1");
                    __is = ("1" == storage.getItem(key));
                    storage.removeItem(key);
                }catch(e){}finally{
                    return __is;
                }
            }
        }
    };
   
    /**
     * 检测网络是否在线
     * @return Boolean true/false
     */
    function checkOnLine(){
        return (navigator.onLine);
    };
	
	/**
     * html解码
     * @param String str 字符串
     * @return String tmp 解码后的字符串
     */
    function decodeHTML(str){
        var tmp = str.replace(/&#60;/g, "<");
            tmp = tmp.replace(/&#62;/g, ">");
            tmp = tmp.replace(/&#34;/g, "\"");
            tmp = tmp.replace(/&#39;/g, "'");
            tmp = tmp.replace(/&#38;/g, "&");
            
        return tmp;
    };
	
    /**
     * html编码
     * @param String str 字符串
     * @return String tmp 编码后的字符串
     */
    function encodeHTML(str){
        var tmp = str.replace(/&/g, "&#38;");
            tmp = tmp.replace(/>/g, "&#62;");
            tmp = tmp.replace(/"/g, "&#34;");
            tmp = tmp.replace(/'/g, "&#39;");
            tmp = tmp.replace(/</g, "&#60;");
        
        return tmp;
    };

    /**
     * 获取设备尺寸
     * @return Object {int width, int height, int availWidth, int availHeight}
     */
    function getDeviceSize(){
        var win = window;
        var scr = win.screen;
        
        return {
            width : scr.width,
            height : scr.height,
            availWidth : scr.availWidth,
            availHeight : scr.availHeight
        };
    };	
	
    /**
     * 获取视窗尺寸
     * @return Object {int innerWidth, int outerWidth, int innerHeight, int outerHeight}
     */
    function getViewportSize(){
        var win = window;
        
        return {
            innerWidth : win.innerWidth,
            innerHeight : win.innerHeight,
            outerWidth : win.outerWidth,
            outerHeight : win.outerHeight
        };
    };
	
    /**
     * 获取设备屏幕显示方向
     * @return int orient 0:竖屏 1:横屏
     */
    function getOrientation(){
        var orient = window.orientation;

        if(0 === orient || 180 == orient){
            return 0; //竖屏
        }else if(90 == orient || -90 == orient){
            return 1;  //横屏
        }else{
            return 0;  //竖屏
        }
    };	
	
    /**
     * 过滤脚本
     * @param String str 字符串
     * @return String str 过滤后的字符串
     */
    function filterScript(str){
        str = str || "";
        str = str.replace(/<.*>/g, ""); //过滤标签注入
        str = str.replace(/(java|vb|action)script/gi, ""); //过滤脚本注入
        str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ""); //过滤HTML属性注入
        str = str.replace(/[\s ]/g, "&nbsp;"); //替换空格
        return str;
    };	
    /**
     * 隐藏地址栏
     */
    function hideAddressBar(e){
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
    };

	/**
     * 将querystring转换成map对象
     * @param String qs URL查询串
     * @return Object items
     */
    function parseQueryString(qs){
        qs = (qs || "");
        
        var ch = qs.substring(0, 1);
        var search = (("?&".indexOf(ch) == -1) ? "?" + qs : qs);
        var s = (search || location.search);
        var pattern = /[\?&]([^\?&=#]+)=([^&#\?]*)/g;
        var matcher = null;
        var items = {};

        while(null != (matcher = pattern.exec(s))){
            items[matcher[1]] = filterScript(matcher[2]);
        }
        pattern = null; matcher = null;

        return items;
    };
	
    /**
     * 获取URL参数
     * @param String key 参数名
     * @param String i 是否忽略大小写
     * @param String querystring URL查询参数
     * @return String 匹配的值，如果没匹配返回null
     */
    function getParameter(key, i, querystring){
        var search = (querystring || document.location.search);
        var pattern = new RegExp("[\?&]"+key+"\=([^&#\?]*)", "g" + (i||""));
        var matcher = pattern.exec(search);
        var items = null;
        if(null != matcher){
            items = matcher[1];
        }
        if(null != items){
            items = filterScript(items);
        }
        pattern = null;
        return items;
    };

	//导出接口
	var o = {
		"getParameter"     : getParameter,
		"parseQueryString" : parseQueryString,
		"hideAddressBar"   : hideAddressBar,
		"filterScript"     : filterScript,
		"getOrientation"   : getOrientation,
		"getViewportSize"  : getViewportSize,
		"getDeviceSize"    : getDeviceSize,
		"encodeHTML"       : encodeHTML,
		"decodeHTML"       : decodeHTML,
		"checkOnLine"      : checkOnLine,
		"session"          : _Session
	};
	Zepto.cb = Zepto.cb || {};
	Zepto.extend(Zepto.cb, o);
	
})(Zepto);