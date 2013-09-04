define(function(require, exports){
    /**
     * 检查是否联网
     * @function checkOnLine 检测网络是否在线
     * @returns {Boolean} true / false
     */
    function checkOnLine(){
        return (navigator.onLine);
    };
	
     /**
     * html解码
     * @param {String} str 字符串
     * @returns {String} tmp 解码后的字符串
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
     * @function
     * @param {String} str 字符串
     * @returns {String} tmp 编码后的字符串
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
     * @function
     * @returns {Object} -  {int width, int height, int availWidth, int availHeight}
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
     * @function
     * @returns {Object} -  {int innerWidth, int outerWidth, int innerHeight, int outerHeight}
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
     * @function
     * @returns {Number} orient 0:竖屏 1:横屏
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
     * @fucntion
     * @param {String} str 字符串
     * @returns {String}  过滤后的字符串
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
     * @function
     */
    function hideAddressBar(){
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
    };

     /**
     * 将querystring转换成map对象
     * @function
     * @param {String} qs URL查询串
     * @return {Object} items
     * @example
     * var qs = 'a=1&b=2&c=3'
     * parseQueryString(qs)
     * returns {a: 1, b: 2, c: 3}
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
     * @function
     * @param {String} key 参数名
     * @param {String} i 是否忽略大小写
     * @param {String} querystring URL查询参数
     * @returns {String} 匹配的值，如果没匹配返回null
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

    /**
     * 生成ta统计script
     * @function
     * @param {Number} 统计ID
     * @param {String} [charset=utf-8] 编码
     **/
    function ta(id, charset){
    	charset || (charset = 'utf-8');
	document.write('<script charset="' + charset + '" src="http://tajs.qq.com/stats?sId="' + id + '"><\/script>');
    }

    return {
		getParameter     : getParameter,
		parseQueryString : parseQueryString,
		hideAddressBar   : hideAddressBar,
		filterScript     : filterScript,
		getOrientation   : getOrientation,
		getViewportSize  : getViewportSize,
		getDeviceSize    : getDeviceSize,
		encodeHTML       : encodeHTML,
		decodeHTML       : decodeHTML,
		checkOnLine      : checkOnLine,
		ta		 : ta
	};
// end of define
})
	
