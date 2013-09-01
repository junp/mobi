define(function(require, exports){
	
	/**
	判断是否ios设备
	@function isIos
	@return boolean
	**/
	function isIos(){
		var ua = navigator.userAgent.toLowerCase()
		return ua.indexOf('iPhone') >= 0 || ua.indexOf('iPad') >= 0 || ua.indexOf('iPod') >= 0
	}
	
	/**
	登录类，根据访问设备返回不同样式登录链接

	@class Login
	@constructor
	 **/
	function Login(){
		this.construct(url, options)
	}
	Login.prototype = {
		/**
		 登录类构造函数
		 @method construct
		 @param url {string} 登录成功回跳链接
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
		 @return {String} 登录链接
		 **/
		genLink: function(){
			
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
	
	/**
	 对外接口
	 @public 
	 @method loginLink
	 @param url {string} 登录成功后回跳链接
	 @param options {object}
	 style {number} 登录界面样式，目前支持8：ios, 9:Android
	 appid:业务id
	 daid:
	 s_url:
	 **/
	exports.loginLink = function(url, options){
		new Login(url, options)
	}
})
