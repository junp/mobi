define(function(require, exports){
	/**
	 @function ta
	 @param id {number} 统计ID
	 @param charset {string} 编码
	 */
	function ta(id, charset){
		charset || (charset = 'utf-8')
		document.write('<script charset="'+charset+'" src="http://tajs.qq.com/stats?sId='+id+'"><\/script>')
	}
})
