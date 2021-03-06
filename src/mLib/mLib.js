define(function(require, exports){
	/**
	 * @name mLib
	 * @namespace mLib命名空间
	 **/
	var mLib = {};
	(function(ns){
		var config = {
			/**
			 * 系统全局一级域名。请不要硬编码到代码中，以方便本框架以后移植到其他域名，例如tenpay.com。
			 * @property String CONST_QQ_COM
			 */
			CONST_QQ_COM : 'qq.com',

			/**
			* @property String CONST_M_CB_QQ_COM
			*/
			CONST_M_CB_QQ_COM: 'm.cb.qq.com',

			/**
			* @property String CONST_CB_QQ_COM
			*
			*/
			CONST_CB_QQ_COM: 'cb.qq.com',

			/*
			* @property String CONST_ACT_CB_QQ_COM
			*/
			CONST_ACT_CB_QQ_COM: 'act.cb.qq.com',

			/**
			* @property String CONST_ACT_CGI_CB_QQ_COM
			*/
			CONST_ACT_CGI_CB_QQ_COM: 'act-cgi.cb.qq.com',


			/**
			* @property String CONST_MIN_UIN
			*/
			CONST_MIN_UIN: 10000,


			/**
			 * @private CONST_SALT
			 */
			CONST_SALT : 5381,

			/***
			* property String CONST_MD5_KEY
			*/
			CONST_MD5_KEY : 'tencentQQVIP123443safde&!%^%1282'
		};
		ns.config = config
	})(mLib);	/**
	* @name util
	* @namespace
	*/
	(function(ns){
		/**
		 * @lends util
		 */

		/**
		* 取url参数
		* @functon getParameter
		* @param {String} name 参数名
		* @param {String} [str=location.search] 支持手动传入url串
		* @param {Boolean} [decode] 是否使用decodeURIComponent解码
		* @returns {String} 参数值，参数不存在返回空串
		* @example
		* eg:location.seach = '?foo=bar'
		* getParameter('foo')	// return bar
		*/
		var getParameter = function(name, str, decode){
		    var reg = new RegExp( "(?:^|[&\?])"+name+"=([^&#]*)(?:[&#].*|$)");
			var val = (str||location.search||'').match(reg);
			if(val){
				val = val[1];
			}
			val = val || '';
			return decode && val? decodeURIComponent(val) : val;
		};

		/**
		* 截取字串长度
		* @function truncation
		* @param {String} str 原始字串
		* @param {Number} [length=30] 截取保留长度
		* @param {String} [tail=...] 截取后尾随字串
		* @return 截取后字串 + tail
		* @example
		* truncation('abcdefg', 4); // return abcd...
		*/
		var truncation = function(str, length, tail){
			length = length || 30,
			tail = tail ? tail : '...';
			var re = /[^\x00-\xff]/g;
			var tmp = str.replace(/\*/g,'o').replace(re, '**');
			var tmp2 = tmp.substring(0, length);
			var xLen = tmp2.split('\*').length - 1;
			var chNum = xLen / 2;
			length = length - chNum;
			var res = str.substring(0, length);
			return str.length > length ? res + tail : res;
		};

		/**
		 * 检查是否联网
		 * @function checkOnLine
		 * @returns {Boolean} true / false
		 */
		function checkOnLine(){
			return (navigator.onLine);
		};
		
		 /**
		 * html解码
		 * @function decodeHTML
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
		 * @function encodeHTML
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
		 * @function getDeviceSize
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
		 * @function getViewportSize
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
		 * @function getOrientation
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
		 * @fucntion filterScript
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
		 * @function hideAddressBar
		 */
		function hideAddressBar(){
			setTimeout(function(){
				window.scrollTo(0, 1);
			}, 0);
		};

		 /**
		 * 将querystring转换成map对象
		 * @function parseQueryString
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
		 * 生成ta统计script
		 * @function ta
		 * @param {Number} 统计ID
		 * @param {String} [charset=utf-8] 编码
		 **/
		function ta(id, charset){
			charset || (charset = 'utf-8');
		document.write('<script charset="' + charset + '" src="http://tajs.qq.com/stats?sId="' + id + '"><\/script>');
		}
		
		util = {
			getParameter: getParameter,
			truncation: truncation,
			checkOnLine: checkOnLine,
			decodeHTML: decodeHTML,
			encodeHTML: encodeHTML,
			getDeviceSize: getDeviceSize,
			getViewportSize: getViewportSize,
			getOrientation: getOrientation,
			filterScript: filterScript,
			hideAddressBar: hideAddressBar,
			parseQueryString: parseQueryString,
			ta: ta
		};
		ns.util = util;
	})(mLib);
	/**
	 * @name cookie
	 * @namespace
	 */
	(function(ns){
		var config = exports.config;

		var cookie = {
			/**
			 * @lends cookie
			 */
			 
			/**
			 * 获取指定名称的cookie值
			 * @param  {String} name cookie名称
			 * @returns {String}      获取到的cookie值
			 * @example
			 * 例子：
			 * cookie.get('name1');
			 */
			set : function (name, value, domain, path, hour) {
				var expire = new Date();
				if (hour) {
					expire.setTime(expire.getTime() + 3600000 * hour);
				}
				document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + config.CONST_M_QQ_COM + ";"));
				return true;
			},

			/**
			 * 获取指定名称的cookie值
			 * @param  {String} name cookie名称
			 * @returns {String}      获取到的cookie值
			 * @example
			 * 例子：
			 * cookie.get('name1');
			 */
			get : function (name) {
				var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
				var m = document.cookie.match(r);
				return (!m ? "" : m[1]);
			},

			/**
			 * 删除指定cookie
			 * @param {String} name   cookie名称
			 * @param {String} domain 所在域
			 * @param {String} path   所在路径
			 * @example
			 * 例子：
			 * del('name1',"cb.qq.com","/");
			 */
			del : function (name, domain, path) {
				document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + config.CONST_QQ_COM + ";"));
			},

			
		};

		ns.cookie = cookie;
	})(mLib);	/*
	* @name csrf
	* @namespace
	*/
	(function(ns) {
		var config = ns.config;
		var cookie = ns.cookie;

		var hexcase = 0;
		var b64pad = '';
		var chrsz = 8;
		var mode = 32;
		function hex_md5(s) {
			return binl2hex(core_md5(str2binl(s), s.length * chrsz));
		};
		function b64_md5(s) {
			return binl2b64(core_md5(str2binl(s), s.length * chrsz));
		};
		function str_md5(s) {
			return binl2str(core_md5(str2binl(s), s.length * chrsz));
		};
		function hex_hmac_md5(key, data) {
			return binl2hex(core_hmac_md5(key, data));
		};
		function b64_hmac_md5(key, data) {
			return binl2b64(core_hmac_md5(key, data));
		};
		function str_hmac_md5(key, data) {
			return binl2str(core_hmac_md5(key, data));
		};
		function core_md5(x, len) {
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			for (var i = 0; i < x.length; i += 16) {
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;
				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			if (mode == 16) {
				return Array(b, c);
			} else {
				return Array(a, b, c, d);
			}
		};
		function md5_cmn(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		};
		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		};
		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		};
		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b^c^d, a, b, x, s, t);
		};
		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c^(b | (~d)), a, b, x, s, t);
		};
		function core_hmac_md5(key, data) {
			var bkey = str2binl(key);
			if (bkey.length > 16)
				bkey = core_md5(bkey, key.length * chrsz);
			var ipad = Array(16),
			opad = Array(16);
			for (var i = 0; i < 16; i++) {
				ipad[i] = bkey[i]^0x36363636;
				opad[i] = bkey[i]^0x5C5C5C5C;
			}
			var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
			return core_md5(opad.concat(hash), 512 + 128);
		};
		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		};
		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		};
		function str2binl(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
			return bin;
		};
		function binl2str(bin) {
			var str = "";
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < bin.length * 32; i += chrsz)
				str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
			return str;
		};
		function binl2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
				hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		};
		function binl2b64(binarray) {
			var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i += 3) {
				var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i
							+2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
				for (var j = 0; j < 4; j++) {
					if (i * 8 + j * 6 > binarray.length * 32)
						str += b64pad;
					else
						str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
				}
			}
			return str;
		};
		function _md5(s) {
			return hex_md5(s);
		};
		function _getAntiCSRFToken(objConfig) {
			objConfig = objConfig || {};
			var salt = objConfig.salt || config.CONST_SALT;
			var skey = objConfig.skey || cookie.get("skey");
			var md5key = objConfig.md5key || config.CONST_MD5_KEY;
			var hash = [],
			ASCIICode;
			hash.push((salt << 5));
			for (var i = 0, len = skey.length; i < len; ++i) {
				ASCIICode = skey.charAt(i).charCodeAt();
				hash.push((salt << 5) + ASCIICode);
				salt = ASCIICode;
			}
			var md5str = _md5(hash.join('') + md5key);
			return md5str;
		};

		var csrf = {
			/** @lends csrf */

			/**
			* @method getToken
			* @returns token
			* @example
			* csrf.getToken();
			*/
			getToken: _getAntiCSRFToken,
			/**
			* @method md5
			* @return md5
			* @example
			* csrf.md5('foo')
			*/
			md5: _md5
		};

		ns.csrf = csrf;
	})(mLib);
/**
 * @name ua
 * @namespace 
 **/
(function(ns){  
	var UA = (function ParseUA(ua){
		ua = ua.replace(/_/g, ".");
		/**
		 * 检测UA
		 * @param String key 关键字
		 * @return Boolean true/false
		 */
		function CheckUA(ua, key){
			var result = 0;
			var matcher = null;
			var p = new RegExp(key, "gi");

			if(null != (matcher = p.exec(ua))){
				result = matcher[2];
				if(result){
					result = parseFloat(result, 10);
				}else{
					result = 1;
				}
			}
			
			p = null;
			matcher = null;
			
			return result;
		};
		
		//版本正则
		var versionRegExp = "[\\s\\/]{1}(\\d+(\\.\\d+)?)";
		//ios判断正则
		var iosRegExp = "[;a-z0-9\\s]+OS";
		//任意字符正则
		var anyRegExp = "[\\w\\W]+Version";
		
		/**
		 * 校验结果
		 * @param String ua
		 * @return Object o
		 *          @member float linux
		 *          @member float android
		 *          @member float ios
		 *          @member float iphone
		 *          @member float ipad
		 *          @member float ipod
		 *          @member float windows
		 *          @member float windowsnt
		 *          @member float windowsphone
		 *          @member float windowsce
		 *          @member float blackberry
		 *          @member float symbianos
		 *          @member float series60
		 *          @member float nokia
		 *          @member float iemobile
		 *          @member float ie
		 *          @member float opera
		 *          @member float operamini
		 *          @member float safari
		 *          @member float mobilesafari
		 *          @member float chrome
		 *          @member float firefox
		 *          @member float maxthon
		 *          @member float mqqbrowser
		 *          @member float uc
		 */
		var result = (function(ua){
			var linux = CheckUA(ua, "(Linux)");
			/**
			 * 是否nadroid，返回版本号，如果获取版本号失败，返回1
			 * @lends ua
			 * @property {Number} android 是否android
			 **/
			var android = CheckUA(ua, "(Android)" + versionRegExp) || CheckUA(ua, "(Android)");
			/**
			 * @lends ua
			 * @property {Number} iphone 是否iphone
			 **/
			var iphone = CheckUA(ua, "(iPhone)" + iosRegExp + versionRegExp) || CheckUA(ua, "(iPhone)");
			/**
			 * @lends ua
			 * @property {Number} ipad 是否ipad
			 **/
			var ipad = CheckUA(ua, "(iPad)" + iosRegExp + versionRegExp) || CheckUA(ua, "(iPad)");
			/**
			 * @lends ua
			 * @property {Number} ipod 是否ipod
			 **/
			var ipod = CheckUA(ua, "(iPod)" + iosRegExp + versionRegExp);
			var windows = CheckUA(ua, "(Windows)" + versionRegExp);
			var windowsnt = CheckUA(ua, "(Windows NT)" + versionRegExp);
			var windowsphone = CheckUA(ua, "(Windows Phone OS)" + versionRegExp);
			var windowsce = CheckUA(ua, "(Windows CE)") || CheckUA(ua, "(Windows Mobile)");
			var blackberry = CheckUA(ua, "(BlackBerry)" + versionRegExp) || CheckUA(ua, "(BlackBerry)"); // 型号
			var symbianos = CheckUA(ua, "(SymbianOS)" + versionRegExp) || CheckUA(ua, "(SymbOS)");
			var series60 = CheckUA(ua, "(Series60)" + versionRegExp) || CheckUA(ua, "(Series 60)") || CheckUA(ua, "(S60;)");
			//----------------------------------------------------
			var nokia = CheckUA(ua, "(BrowserNG)" + versionRegExp);
			var ie = CheckUA(ua, "(MSIE)" + versionRegExp); //for compatible
			var iemobile = CheckUA(ua, "(IEMobile)" + versionRegExp);
			/**
			 * @lends ua
			 * @property {Number} opera 是否opera
			 **/
			var opera = CheckUA(ua, "(Opera|Opera" + anyRegExp + ")" + versionRegExp);
			/**
			 * $lends ua
			 * @property {Number} operamini 是否operamini
			 **/
			var operamini = CheckUA(ua, "(Opera Mini)" + versionRegExp);
			/**
			 * @lends ua
			 * @property {Number} safari 是否safari
			 **/
			var safari = CheckUA(ua, "(iPhone|iPad|iPod)" + anyRegExp + versionRegExp);
			/**
			 * @lends ua
			 * @property {Number} mobilesafari 是否mobilesafari
			 **/
			var mobilesafari = CheckUA(ua, "(Mobile Safari)");
			/**
			 * @lends ua
			 * @property {Number} chrome 是否chrome
			 **/
			var chrome = CheckUA(ua, "(Chrome)" + versionRegExp);
			/**
			 * @lends ua
			 * @property {Number} firefox
			 **/
			var firefox = CheckUA(ua, "(Firefox)" + versionRegExp);
			/**
			 * @lends ua
			 * @property {Number} mathon
			 **/
			var maxthon =  CheckUA(ua, "(Maxthon)" + versionRegExp) || CheckUA(ua, "(Maxthon)");
			/**
			 * @lends ua
			 * @property {Number} mqqbrower
			 **/
			var mqqbrowser =  CheckUA(ua, "(MQQBrowser)" + versionRegExp) || CheckUA(ua, "(MQQBrowser)");
			/**
			 * @lends ua
			 * @property {Number} uc
			 **/
			var uc = CheckUA(ua, "(UCWEB)(\\d+(\\.\\d+)?)") || CheckUA(ua, "(UCWEB)");
			//----------------------------------------------------
			
			var o = {
				"linux" : linux,
				"android" : android,
				"ios" : (iphone||ipad||ipod),
				"iphone" : iphone,
				"ipad" : ipad,
				"ipod" : ipod,
				"windows" : windows,
				"windowsnt" : windowsnt,
				"windowsphone" : windowsphone,
				"windowsce" : windowsce,
				"blackberry" : blackberry,
				"symbianos" : symbianos,
				"series60" : series60,
				"nokia" : nokia,
				"iemobile" : iemobile,
				"ie" : ie,
				"opera" : opera,
				"operamini" : operamini,
				"safari" : safari,
				"mobilesafari" : mobilesafari,
				"chrome" : chrome,
				"firefox" : firefox,
				"maxthon" : maxthon,
				"mqqbrowser" : mqqbrowser,
				"uc" : uc
			};

			return o;
		})(ua);
		
		return result;
	})(navigator.userAgent);
})(mLib);
	return mLib;
});
