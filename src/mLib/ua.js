	/**
	 * @name ua
	 * @namespace
	 * 检测UA
	 */
	(function(ns){  
		var UA = (function ParseUA(ua){
			ua = ua.replace(/_/g, ".");
			/**
			 * @param String key 关键字
			 * @return Boolean true/false
			 */
			function CheckUA(ua, key){
				return function(){
					var result = 0;
					var matcher = null;
					var p = new RegExp(key, "gi");

					if(null !== (matcher = p.exec(ua))){
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
			}
			
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
				/**
				@lends ua
				*/
				/**
				 * 判断是否linux
				 * @function linux
				 * @returns 版本号，是：返回版本号，获取版本号失败则返回1，否：返回0
				 **/
				var linux = CheckUA(ua, "(Linux)");
				/**
				 * 判断是否android
				 * @function android
				 * @returns 版本号
				 **/
				var android = CheckUA(ua, "(Android)" + versionRegExp) || CheckUA(ua, "(Android)");
				/**
				 * 判断是否iphone
				 * @function iphone
				 * @returns 版本号
				 **/
				var iphone = CheckUA(ua, "(iPhone)" + iosRegExp + versionRegExp) || CheckUA(ua, "(iPhone)");
				/**
				 * 判断是否ipad
				 * @function ipad
				 * @returns 版本号
				 **/
				var ipad = CheckUA(ua, "(iPad)" + iosRegExp + versionRegExp) || CheckUA(ua, "(iPad)");
				/**
				 * 判断是否ipod
				 * @function ipod
				 * @returns 版本号
				 **/
				var ipod = CheckUA(ua, "(iPod)" + iosRegExp + versionRegExp);
				/**
				 * 判断是否ios 
				 * @function ios
				 * @returns 版本号
				 **/
				var ios = function(){
					return iphone() || ipad() || ipod();
				};
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
				 * 判断是否opera
				 * @function opera
				 * @returns 版本号
				 **/
				var opera = CheckUA(ua, "(Opera|Opera" + anyRegExp + ")" + versionRegExp);
				/**
				 * 判断是否operamini
				 * @function operamini
				 * @returns 版本号
				 **/
				var operamini = CheckUA(ua, "(Opera Mini)" + versionRegExp);
				/**
				 * 判断是否safari
				 * @function safari
				 * @returns 版本号
				 **/
				var safari = CheckUA(ua, "(iPhone|iPad|iPod)" + anyRegExp + versionRegExp);
				/**
				 * 判断是否mobilesafari
				 * @function mobilesafari
				 * @returns 版本号
				 **/
				var mobilesafari = CheckUA(ua, "(Mobile Safari)");
				/**
				 * 判断是否chrome
				 * @function chrome
				 * @returns 版本号
				 **/
				var chrome = CheckUA(ua, "(Chrome)" + versionRegExp);
				/**
				 * 判断是否firefox
				 * @function firefox
				 * @returns 版本号
				 **/
				var firefox = CheckUA(ua, "(Firefox)" + versionRegExp);
				/**
				 * 判断是否maxthon
				 * @function maxthon
				 * @returns 版本号
				 **/
				var maxthon =  CheckUA(ua, "(Maxthon)" + versionRegExp) || CheckUA(ua, "(Maxthon)");
				/**
				 * 判断是否mqqbrowser
				 * @function mqqbrowser
				 * @returns 版本号
				 **/
				var mqqbrowser =  CheckUA(ua, "(MQQBrowser)" + versionRegExp) || CheckUA(ua, "(MQQBrowser)");
				/**
				 * 判断是否uc
				 * @function uc
				 * @returns 版本号
				 **/
				var uc = CheckUA(ua, "(UCWEB)(\\d+(\\.\\d+)?)") || CheckUA(ua, "(UCWEB)");
				//----------------------------------------------------
				
				var o = {
					"linux" : linux,
					"android" : android,
					"ios" : ios,
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
			
			ns.ua = result;
		})(navigator.userAgent);
	})(cbLib);
