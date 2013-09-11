	/**
	* @name user
	* @namespace
	* 用户模块（登录、退出、个人信息） 
	*/
	(function(ns){
		var ua = ns.ua
		/**
		登录类，根据访问设备返回不同样式登录链接
		@class Login
		@private
		 **/
		function Login(){
			this.construct(url, options)
		}
		Login.prototype = {
			/**
			登录类构造函数
			@method construct
			@param url {string} 登录成功回跳链接
			@private
			@param options {object}
			**/
			construct: function(url, options){
				var self = this
				if(typeof url == 'object'){
					self.options = $.extend(Login.defaults, options)
				}
				else{
					self.options = $.extend(Login.defaults, {s_url: url})
				}
			},
			
			/**
			返回登录链接
			@method getLink
			@private
			@return {String} 登录链接
			**/
			getLink: function(){
				var temp = []
				var options = this.options
				for(var p in options){
					temp.push(p + '=' + encodeURIComponent(options[p]) )		
				}

				return 'http://ui.ptlogin2.qq.com/cgi-bin/login?' + temp.join('&')
						
			}
		}

		Login.defaults = {
			style: ua.ios() ? 8 : 9,
			appid: 8000212, // app ID
			daid: '', // 业务ID，用于登录隔离
			s_url:'', //　登录成功回跳url
			low_login: 0, // 弱登录，ptlogin登录cookie长期有效，非财产业务方可使用
			hln_css: 'http://imgcache.qq.com/vipstyle/caibei/v3/public/img/ptlogin_244x100.png', // 图片logo url
			hln_custompage: '', // 自定义底部
			hln_title: '', // 
			hln_acc: '',
			hln_pwd: '',
			hln_u_tips: '', // 帐号输入提示
			hln_p_tips: '', // 密码输入提示
			hln_autologin: '',
			hln_login: '', // 登录按钮文字
			hln_otheracc: '',
			hln_qloginacc: '',
			hln_reg: '', // 注册按钮文字
			hln_vctitle: '',
			hln_verifycode: '',
			hln_vclogin: '',
			hln_feedback: '', // 意见反馈链接文字
			hln_copyright: ''
		}
		
		/**
		 * @lends user
		 **/

		/**
		 * 获取登录链接
		 * @function loginLink
		 * @param {String} url 登录后回跳链接
		 * @param {Object} [options]
		 * @param {String} options.hln_css 图片logo url
		 * @param {Number} options.style 登录界面风格，默认为9（android），当设备为ios时，值为8
		 * @param {Number} options.appid appid 默认：8000212
		 * @param {Number} options.daid 业务ID，用于登录隔离
		 * @param {Number} options.low_login 弱登录，ptlogin登录cookie长期有效，非财产业务方可使用
		 * @param {String} options.hln_u_tips 帐号输入提示
		 * @param {String} options.hln_p_tips 密码输入提示
		 * @param {String} options.hln_login 登录按钮文字
		 * @param {String} options.hln_reg 注册按钮文字
		 * @param {String} options.hln_feedback 意见反馈链接文字
		 * @returns {String} 登录链接
		 **/
		var loginLink = function(url, options){
			return new Login(url, options).getLink()
		}

		/**
		* 跳转到登录页面
		* @function goLogin
		* @param {String} ulr 登录后回跳链接
		* @param {Object} [options] 参与loginLink
		*/
		var goLogin = function(url, options){
			var loginLink = new Login(url, options).getLink()
			location.href = loginLink
		}

		/**
		* 退出登录
		* @function logout
		* @param {Function} callback
		*/
		var logout = function(callback) {
			var cookie = exports.cookie
			var isCfm = window.confirm("您确认退出彩贝触屏版吗？");
			if(isCfm) {
				cookie.del('uin');
				cookie.del('skey');       
				if(callback && typeof callback === 'function'){
					callback();
				}else{
					window.top.location.reload();
				}
			}
		};

		/**
		* @todo 取用户信息
		*/
		var getUserInfo = function(paraObj, loginCbFn, notLoginCbFn){
		
		};

		var user = {
			loginLink: loginLink,
			goLogin: goLogin,
			logout: logout,
			getUserInfo: getUserInfo
		}
		ns.user = user;
	})(cbLib);
