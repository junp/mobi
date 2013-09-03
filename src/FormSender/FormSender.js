/**
 * @namespace  FormPost通信器类
 * 
 * @param {String} actionURL 请求地址
 * @param {String} [method] 发送方式[GET|POST]，除非指明GET，否则全部为POST
 * @param {Object} [data] hashTable形式的字典，即{param1:param1_val, param2:param2_val}形式的参数
 * @param {String} [charset="gbk"] 于后台数据交互的字符集
 * @constructor
 * 
 * 使用FormSender的CGI需要按照如下模版返回: 
 * <html><head><meta http-equiv="Content-Type" content="text/html;
 * charset=gbk" /></head> <body><script type="text/javascript">
 * document.domain="qq.com"; frameElement.callback({JSON:"Data"}); </script></body></html>
 */
 
Zepto.cb = Zepto.cb || {};
Zepto.cb.FormSender = function(actionURL, method, data, charset) {
    /**
     * form的名称，默认为 _fpInstence_ + 计数
     * 
     * @type string
     * @private
     */
    this.name = "_fpInstence_" + Zepto.cb.FormSender.counter;
    Zepto.cb.FormSender.instance[this.name] = this;
    Zepto.cb.FormSender.counter++;
    
    if (typeof(actionURL) == 'object' && actionURL.nodeType == 1 && actionURL.tagName == 'FORM') {
		this.instanceForm = actionURL;
	} else {//standard mode
        /**
         * 数据发送方式
         * 
         * @type string
         * @private
         */
        this.method = method || "POST";

        /**
         * 数据请求地址
         * 
         * @type string
         * @private
         */
        this.uri = actionURL;
        
        /**
         * 数据参数表
         * 
         * @type object
         * @private
         */
        this.data = (typeof(data) == "object" || typeof(data) == 'string') ? data : null;
        this.proxyURL = (typeof(charset) == 'string' && charset.toUpperCase() == "UTF-8")
                ? Zepto.cb.config.CONST_FS_HELPER_PAGE.replace(/_gbk/, "_utf8")
                : Zepto.cb.config.CONST_FS_HELPER_PAGE;

        this._sender = null;
    }
    /**
     * 服务器正确响应时的处理
     * 
     * @event
     */
    this.onSuccess = Zepto.cb.emptyFn;

    /**
     * 服务器无响应或预定的不正常响应处理
     * 
     * @event
     */
    this.onError = Zepto.cb.emptyFn;
};

Zepto.cb.emptyFn = function() {
};

Zepto.cb.FormSender.instance = {};
Zepto.cb.FormSender.counter = 0;
Zepto.cb.FormSender._errCodeMap = {
    999 : {
        msg : 'Connection or Server error'
    }
};
Zepto.cb.FormSender.pluginsPool = {
    "formHandler" : []
};
Zepto.cb.FormSender._pluginsRunner = function(pType, data){
    var _s = Zepto.cb.FormSender,
        l = _s.pluginsPool[pType],
        t = data,
        len;

    if(l && (len = l.length)){
        for(var i = 0; i < len; ++i){
            if(typeof(l[i]) == "function"){
                t = l[i](t);
            }
        }
    }

    return t;
};

/**
 * 将方法绑定在对象上，能够保护this指针不会“漂移”
 * @private 
 * @param {Object} obj 母体对象
 * @param {Object} method 目标方法
 * @example var e = Zepto.cb.FormSender.bind(objA,funB);
 */
Zepto.cb.FormSender.bind = function(obj, method) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function() {
        var _obj = obj || this;
        var _args = args.concat(Array.prototype.slice.call(arguments, 0));
        if (typeof (method) == "string") {
            if (_obj[method]) {
                return _obj[method].apply(_obj, _args);
            }
        } else {
            return method.apply(_obj, _args);
        }
    };
};

/**
 * 建立有name属性的element
 * @private
 * @param {String} type node的tagName
 * @param {String} name name属性值
 * @param {object} doc document
 * @return {Object} 结果element
 */
Zepto.cb.FormSender.createNamedElement = function(type, name, doc) {
    doc = doc || document;
    var element;
    try {
        element = doc.createElement('<' + type + ' name="' + name + '">');
    } catch (ignore) {
    }
    if (!element || !element.name) {
        element = doc.createElement(type);
        element.name = name;
    }
    return element;
};

/**
 * 发送请求
 * @return {Boolean} 是否成功
 * @example
 * 使用例子：
 * document.domain = "qq.com"; //注意：这个必须设置
 *      var objParam = {
 *		cmd  : 'get',
 *		g_tk : $.CSRF()
 *      };
 *
 *      var FormSender = new $.cb.FormSender('http://cb.qq.com/my/paipai_addr_cmd.php', 'POST', objParam, 'UTF-8');
 *      FormSender.onSuccess = function(json){
 *           data = json.JSON;
 *           //未登录
 *           if(data.iUin < gMinUin) {
 *              openLoginWindow();   
 *              return;
 *           }
 *			......
 *      };
 *
 *      FormSender.onError = function(data){alert('对不起，系统繁忙，请稍后再试');};
 *      FormSender.send(); 
 *
 * 服务器端返回值：
 * <html><head><meta http-equiv="Content-Type" content="text/html;
 * charset=utf-8" /></head> <body><script type="text/javascript">
 * document.domain="qq.com"; frameElement.callback({JSON:{"errorCode":0,"errorMessage":"success","uin":12345678}}); </script></body></html>
 */
Zepto.cb.FormSender.prototype.send = function() {
    if (this.method == 'POST' && this.data == null) {
        return false;
    }
    function clear(o) {
        o._sender = o._sender.callback = o._sender.errorCallback = o._sender.onreadystatechange = null;
        if (Zepto.browser.safari || Zepto.browser.opera) {
            setTimeout('Zepto("#_fp_frm_' + o.name + '").remove()', 50);
        } else {
            Zepto("#_fp_frm_" + o.name).remove();
        }
        o.instanceForm = null;
    }
    if (this._sender === null || this._sender === void (0)) {
        var sender = this.instanceForm ? document.createElement('<' + iframe + ' name="_fp_frm_' + this.name + '">') : document.createElement("iframe");
        sender.id = "_fp_frm_" + this.name;
        sender.style.cssText = "width:0;height:0;border-width:0;display:none;";
        document.body.appendChild(sender);

        sender.callback = Zepto.cb.FormSender.bind(this, function(o) {
                    clearTimeout(timer);
                    this.onSuccess(o);
                    clear(this);
                });
        sender.errorCallback = Zepto.cb.FormSender.bind(this, function(o) {
                    clearTimeout(timer);
                    this.onError(o);
                    clear(this);
                });

        if (typeof sender.onreadystatechange != 'undefined') {
            sender.onreadystatechange = Zepto.cb.FormSender.bind(this, function() {
                if (this._sender.readyState == 'complete' && this._sender.submited) {
                    clear(this);
                    this.onError(Zepto.cb.FormSender._errCodeMap[999]);
                }
            });
        } else {
            var timer = setTimeout(Zepto.cb.FormSender.bind(this, function() {
                try {
                    var _t = this._sender.contentWindow.location.href;
                    if (_t.indexOf(this.uri) == 0) {
                            clearTimeout(timer);
                        clear(this);
                        this.onError(Zepto.cb.FormSender._errCodeMap[999]);
                    }
                } catch (err) {
                        clearTimeout(timer);
                    clear(this);
                    this.onError(Zepto.cb.FormSender._errCodeMap[999]);
                }
            }), 1500);
        }
        this._sender = sender;
    }

    if(!this.instanceForm){
        this._sender.src = this.proxyURL;
    }else{
        this.instanceForm.target = (sender.name = sender.id);
        this._sender.submited = true;
        this.instanceForm.submit();
    }
    return true;
};

/**
 * Zepto.cb.FormSender对象自毁方法，用法 ins=ins.destroy();
 * 
 * @return {Object} null用来复写引用本身
 */
Zepto.cb.FormSender.prototype.destroy = function() {
    var n = this.name;
    delete Zepto.cb.FormSender.instance[n]._sender;
    Zepto.cb.FormSender.instance[n]._sender = null;
    delete Zepto.cb.FormSender.instance[n];
    Zepto.cb.FormSender.counter--;
    return null;
};

if( typeof Zepto.FormSender == undefined ) Zepto.FormSender = FormSender.cb.FormSender;