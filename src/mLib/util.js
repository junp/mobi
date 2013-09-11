	/**
	* @name util
	* @namespace
	* 工具类 
	*/
	(function(ns){
		/**
		 * @lends util
		 */

		/**
		 * 模板解析器txTpl: 
		 * @function txTpl
		 * @author: wangfz
		 * @param {String}  str 模板id || 原始模板text
		 * @param {Object}  data 数据源json 
		 * @param {String}  startSelector 可选 要匹配的开始选择符 '<%' 、'[%' 、'<#' ..., 默认为'<%'
		 * @param {String}  endSelector 可选 要匹配的结束选择符 '%>' 、'%]' 、'#>' ..., 默认为'%>'
		 * @param {Boolean} isCache 可选 默认为true 
		 * @return {String}	 
		 * 注意1: 输出"\"时, 要转义,用"\\"或者实体字符"&#92"; 
		 *　　　  输出"开始选择符"或"结束选择符"时, 至少其中一个字符要转成实体字符。 
		 *　　　  html实体对照表：http://www.f2e.org/utils/html_entities.html
		 * 注意2: 模板拼接时用单引号。
		 * 注意3: 数据源尽量不要有太多的冗余数据。 
		 *
		 * @example 
		 * 例子
		 * txTpl('hi, <%=name%>', {name: 'someone'}) // 返回hi, someone
		 */
		var txTpl=(function(){
			var cache={};
			return function(str, data, startSelector, endSelector, isCache){
				var fn, d=data, valueArr=[], isCache=isCache!=undefined ? isCache : true;
				if(isCache && cache[str]){
					for (var i=0, list=cache[str].propList, len=list.length; i<len; i++){valueArr.push(d[list[i]]);}	
					fn=cache[str].parsefn;
				}else{
					var propArr=[], formatTpl=(function(str, startSelector, endSelector){
						if(!startSelector){var startSelector='<%';}	
						if(!endSelector){var endSelector='%>';}					
						var tpl=str.indexOf(startSelector) == -1 ? document.getElementById(str).innerHTML : str;			
						return tpl
							.replace(/\\/g, "\\\\") 											
							.replace(/[\r\t\n]/g, " ") 											
							.split(startSelector).join("\t")										
							.replace(new RegExp("((^|"+endSelector+")[^\t]*)'","g"), "$1\r")	
							.replace(new RegExp("\t=(.*?)"+endSelector,"g"), "';\n s+=$1;\n s+='")  					
							.split("\t").join("';\n")											
							.split(endSelector).join("\n s+='")		
							.split("\r").join("\\'");		
					})(str, startSelector, endSelector);	
					for (var p in d) {propArr.push(p);valueArr.push(d[p]);}	
					fn = new Function(propArr, " var s='';\n s+='" + formatTpl+ "';\n return s");
					isCache && (cache[str]={parsefn:fn, propList:propArr});
				}
				
				try{
					return fn.apply(null,valueArr);
				}catch(e){
					function globalEval(strScript) {
						var ua = navigator.userAgent.toLowerCase(), head=document.getElementsByTagName("head")[0], script = document.createElement("script"); 
						if(ua.indexOf('gecko') > -1 && ua.indexOf('khtml') == -1){window['eval'].call(window, fnStr); return}				
						script.innerHTML = strScript; 
						head.appendChild(script); 
						head.removeChild(script);
					}	
					
					var fnName='txTpl' + new Date().getTime(), fnStr='var '+ fnName+'='+fn.toString();
					globalEval(fnStr);
					window[fnName].apply(null,valueArr);		
				}			
			}
		})();

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
		    var reg = new RegExp( "(?:^|[&?])"+name+"=([^&#]*)(?:[&#].*|$)");
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
			tail = typeof tail !== 'undefined' ? tail : '...';
			var re = /[^\x00-\xff]/g;
			var tmp = str.replace(/\*/g,'o').replace(re, '**');
			var tmp2 = tmp.substring(0, length);
			var xLen = tmp2.split('*').length - 1;
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
		}
		
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
		}
		
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
		}

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
		}
		
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
		}
		
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
		}
		
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
		}
		/**
		 * 隐藏地址栏
		 * @function hideAddressBar
		 */
		function hideAddressBar(){
			setTimeout(function(){
				window.scrollTo(0, 1);
			}, 0);
		}

		/**
		 * 将querystring转换成map对象
		 * @function parseQueryString
		 * @param {String} qs URL查询串
		 * @return {Object} items
		 * @example
		 * var qs = 'foo=bar'
		 * parseQueryString(qs)
		 * returns {foo:'bar'}
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
		}

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
			txTpl: txTpl,
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
	})(cbLib);
