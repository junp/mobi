	/**
	* @name config
	* @namespace
	* 全局配置 
	*/
	(function(ns){
		var config = {
			/**
			 * @lends config  
			 */

			/**
			 * qq.com
			 * @property String CONST_QQ_COM
			 */
			CONST_QQ_COM : 'qq.com',
				
			/**
			* cb.qq.com
			* @property String CONST_CB_QQ_COM
			*
			*/
			CONST_CB_QQ_COM: 'cb.qq.com',

			/**
			* m.cb.qq.com
			* @property String CONST_M_CB_QQ_COM
			*/
			CONST_M_CB_QQ_COM: 'm.cb.qq.com',


			/**
			* act.cb.qq.com
			* @property String CONST_ACT_CB_QQ_COM
			*/
			CONST_ACT_CB_QQ_COM: 'act.cb.qq.com',

			/**
			* act-cgi.cb.qq.com
			* @property String CONST_ACT_CGI_CB_QQ_COM
			*/
			CONST_ACT_CGI_CB_QQ_COM: 'act-cgi.cb.qq.com',


			/**
			* 最小uin 10000
			* @property String CONST_MIN_UIN
			*/
			CONST_MIN_UIN: 10000,


			/**
			 * csrf salt 5381
			 * @property CONST_SALT
			 */
			CONST_SALT : 5381,

			/**
			* md5 key tencentQQVIP123443safde&!%^%1282
			* @property String CONST_MD5_KEY
			*/
			CONST_MD5_KEY : 'tencentQQVIP123443safde&!%^%1282'
		};
		ns.config = config;
	})(cbLib);