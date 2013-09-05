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
