//https://github.com/pushiming/sea-module-marketing-slider/blob/master/lib/touchSlider.js
/**
* @class TouchSlider
* @param {String} container ����
* @param {Objects} options ����
*/
function TouchSlider(container, options){
	if (!container){
		return null
	}

	if (options){
		options.container = container
	}
	else{
		options = typeof container === 'string' ? { container: container} : container
	}

	$.extend(this, TouchSlider.defaults, options)

	
}

TouchSlider.prototype = {
	construct: function(){
		/**
		 * silder ������
		 * @property container
		 * @type String
		 * @default '.slider'
		 **/
        	var container = this.container = $(this.container)
		// �ݴ��������Ƿ����
		if(!container.length){
			return
		}

		/**
		 * slider���ڣ���ʽoverflow��Ϊhidden
		 * @property wrap
		 * @type String
		 **/
		var wrap = this.wrap = this.wrap && container.find(this.wrap) || container.children().first()
		// �ݴ�
		if( !wrap.length){
			return
		}

		/**
		 * ����Ԫ������������ԭ��ͨ�����øô�����ʽ��left����
		 * @property panel
		 * @type String
		 **/
		var panel = this.panel && container.find(this.panel) || wrap.children.first()
		// �ݴ�
		if(!panel.length){
			return
		}
		
		/**
		 * <ul>
		 * 	<li></li>
		 * 	<li></li>
		 * </ul>
		 * ulΪpanel��liΪpanelElements
		 **/
		this.panelElements = panel.children()
		// �ݴ�
		if(!this.panelElements.length){
			return
		}

		/**
		 * ��һ������
		 * @property prevTrigger
		 * @type String
		 **/
		this.prevTrigger = this.prevTrigger && container.find(this.prevTrigger)

		/**
		 * ��һ������
		 * @property nextTrigger
		 * @type String
		 **/
		this.nextTrigger = this.nextTrigger && container.find(this.nextTrigger)
	},
	/***
	 * @method moveTo �ƶ�
	 * @param index �ƶ��ڼ���
	 **/
	moveTo: function(index){
		var step = this.step,
		    wrap = this.wrap,
		    left = index * step

		wrap.css('left', left)
	},
	/**
	 * @method next ��һ��
	 *
	 **/
	next: function(){
		var self = this
		var index = this.curIndex--
		
		self.moveTo(index)
	},
	/**
	 * @method prev ��һ��
	 *
	 **/
	prev: function(){
		var self = this
		var index = this.curIndex++

		self.moveTo(index)	
	},
	/**
	 * @method first ����
	 **/
	first: function(){
		this.moveTo(0)       
	},
	/**
	 * @method last ���һ��
	 **/
	last: function(){
		this.moveTo(this.maxPage)      
	},
	/**
	 * @method bindEvent �¼���
	 * @private
	 **/
	bindEvent: function(){
			   
	}

}

TouchSlider.defaults = {
	/**
	* ������
	*/
	container: '.slider',
	wrap: null,
	panel: null,
	/**
	* ����Ԫ��
	*/
	trigger: null,
	/**
	* ��ǰ����Ԫ����ʽ
	*/
	activeTriggerCls: 'sel',
	/**
	* �����¼�
	*/
	hasTrigger: false,
	/**
	* ����
	*/
	steps: 0, 
	/**
	* panel ��ʼx����
	*/
	left: 0,
	/**
	* ÿ�λ�������panels
	*/
	visible: 1,
	/**
	* �����Ԫ�ؼ��
	*/
	margin: 0,
	/**
	* ��ʼ�����ĸ�panel 
	*/
	curIndex: 0,
	/**
	* ��������ʱ��
	*/
	curation:300,
	/**
	* ����ѭ��
	*/
	loop: false,
	/**
	* �����Զ�����
	*/
	autoPlay: false,
	/**
	* ���ż��ʱ��
	*/
	interval: 5000,
	/**
	* ��ʱ����ͼƬ����
	*/
	lazy: '.lazyimg',
	/**
	* ���������ص�
	*/
	callback: null,
	/**
	* �߽���ʽ
	*/
	activePnCls: 'none'
}
