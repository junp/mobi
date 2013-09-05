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
	})(mLib);