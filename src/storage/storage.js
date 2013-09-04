/**
 * 构造函数
 * @class Storage
 * @example
 * new Storage('local')
 * new Storage('session')
 **/
function Store(type){
	this.type = 'local'

	if(type && type === 'session'){
		this.type = type
	}
}
Store.prototype = {
	/**
	 * 判断是否支持localStorage或sessionStorage
	 * @method isSupport
	 * @return boolean
	 **/
	isSupport: function(){
		return !!window[this.type + 'Storage']	   
	},
	/**
	 * 根据构造函数参数，获取storage对象
	 * @method storage
	 * @return {Object}
	 **/
	storage: function(){
		var self = this
		if(self.isSupport()){
			return window[this.type + 'Storage']	 
		}
		return null	
	},
	/**
	 * 设置
	 * @method set
	 * @param {String} key 存储key
	 * @param {String} val 存储值
	 * @example
	 * set('foo', 'bar')
	 **/
	set: function(key, val){
		var self = this
		var type = self.type
		var storage = self.storage()

		if(!storage)return

		try{
			storage.setItem(key, val)
		}catch(e){
			// 写出错：1、空间满；2、用户禁用写
		}			
	},
	/**
	 * 取值
	 * @method get
	 * @param {String} key
	 * @return boolean
	 * @example
	 * get('foo'); // 返回'bar'
	 **/
	get: function(key){
		var storage = this.storage()
		if(!storage)return

		return storage.getItem(key)	
	},
	/**
	 * 删除值
	 * @method remove
	 * @param {String} key
	 * @example
	 * remove('foo'); // 删除key为foo的值
	 **/
	remove: function(key){
		var storage = this.storage()
		if(!storage)return

		storage.removeItem(key)	
	},
	/**
	 * 清除所有
	 * @method clear
	 * @example
	 * clear();
	 **/
	clear: function(){
		var storage = this.storage()
		if(!storage)return

		storage.clear()       
	}
}
