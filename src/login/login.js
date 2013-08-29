define(function(require, exports){

	function isIos(){
		var ua = navigator.userAgent.toLowerCase()
		return ua.indexOf('iPhone') >= 0 || ua.indexOf('iPad') >= 0 || ua.indexOf('iPod') >= 0
	}

	function Login(){
		this.construct(url, options)
	}
	Login.prototype = {
		construct: function(url, options){
			var self = this
			if(typeof url == 'object'){
				self.options = $.extend(Login.defaults, options)
			}
			else{
				self.options = $.extend(Login.defaults, {s_url: url})
			}
		},
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

	exports.loginLink = function(url, options){
		new Login(url, options)
	}
})
