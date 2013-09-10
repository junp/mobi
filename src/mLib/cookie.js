	/**
	 * @name cookie
	 * @namespace
	 * cookie 操作方法集
	 */
	(function(ns){
		var config = ns.config;

		var cookie = {
			/**
			 * @lends cookie
			 */
			 
			/**
			 * 设置cookie值
			 * @param {String} name cookie名称
			 * @param {String} values cookie值
			 * @param {String} [domain='m.cb.qq.com'] cookie生效域，默认为m.cb.qq.com
			 * @param {String} [path='/'] cookie作用路径 默认/
			 * @param {Number} [hour=''] 有效时间，单位：小时
			 * @returns {Boolean}
			 * @example
			 * 例子：
			 * cookie.set('foo', 'bar', 'm.cb.qq.com', '/', 2);
			 */
			set : function (name, value, domain, path, hour) {
				var expire = new Date();
				if (hour) {
					expire.setTime(expire.getTime() + 3600000 * hour);
				}
				document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + config.CONST_M_CB_QQ_COM + ";"));
				return true;
			},

			/**
			 * 获取指定名称的cookie值
			 * @param  {String} name cookie名称
			 * @returns {String} 获取到的cookie值
			 * @example
			 * 例子：
			 * cookie.get('foo'); // 返回bar，不存在则返回''
			 */
			get : function (name) {
				var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
				var m = document.cookie.match(r);
				return (!m ? "" : m[1]);
			},

			/**
			 * 删除指定cookie
			 * @param {String} name   cookie名称
			 * @param {String} [domain='m.cb.qq.com'] 所在域
			 * @param {String} [path='/']   作用路径
			 * @example
			 * 例子：
			 * cookie.del('name1',"cb.qq.com","/");
			 */
			del : function (name, domain, path) {
				document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + config.CONST_M_CB_QQ_COM + ";"));
			},

			
		};

		ns.cookie = cookie;
	})(cbLib);