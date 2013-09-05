/**
* 用户模块（登录、退出、个人信息）
*/
(function(ns){
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
		style: isIos() ? 8 : 9,
		appid: 0,
		daid: 0,
		s_url:'',
		low_login: 0,
		hln_css: '',
		hln_custompage: '',
		hln_title: '',
		hln_acc: '',
		hln_pwd: '',
		hln_u_tips: '',
		hln_p_tips: '',
		hln_autologin: '',
		hln_login: '',
		hln_otheracc: '',
		hln_qloginacc: '',
		hln_reg: '',
		hln_vctitle: '',
		hln_verifycode: '',
		hln_vclogin: '',
		hln_feedback: '',
		hln_copyright: ''
	}

	var loginLink = function(url, options){
		return new Login(url, options).getLink()
	}

	/*
	*@function logout
	*@param {Function} callback
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
		login: login,
		logout: logout,
		getUserInfo: getUserInfo
	}
	ns.user = user;
})(mLib);