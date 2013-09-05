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
	})(mLib);