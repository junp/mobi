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
			var android = CheckUA(ua, "(Android)" + versionRegExp) || CheckUA(ua, "(Android)");
			var iphone = CheckUA(ua, "(iPhone)" + iosRegExp + versionRegExp) || CheckUA(ua, "(iPhone)");
			var ipad = CheckUA(ua, "(iPad)" + iosRegExp + versionRegExp) || CheckUA(ua, "(iPad)");
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
			var opera = CheckUA(ua, "(Opera|Opera" + anyRegExp + ")" + versionRegExp);
			var operamini = CheckUA(ua, "(Opera Mini)" + versionRegExp);
			var safari = CheckUA(ua, "(iPhone|iPad|iPod)" + anyRegExp + versionRegExp);
			var mobilesafari = CheckUA(ua, "(Mobile Safari)");
			var chrome = CheckUA(ua, "(Chrome)" + versionRegExp);
			var firefox = CheckUA(ua, "(Firefox)" + versionRegExp);
			var maxthon =  CheckUA(ua, "(Maxthon)" + versionRegExp) || CheckUA(ua, "(Maxthon)");
			var mqqbrowser =  CheckUA(ua, "(MQQBrowser)" + versionRegExp) || CheckUA(ua, "(MQQBrowser)");
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