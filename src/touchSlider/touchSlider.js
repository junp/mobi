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
		var container = this.container = $(this.container)
		// �ݴ��������Ƿ����
		if(!container.length){
			return
		}

		var wrap = this.wrap = this.wrap && container.find(this.wrap) || container.children().first()
		// �ݴ�
		if( !wrap.length){
			return
		}

		var panel = this.panel && container.find(this.panel) || wrap.children.first()
		// �ݴ�
		if(!panel.length){
			return
		}

		this.panels = panel.children()
		// �ݴ�
		if(!this.panels.length){
			return
		}

		this.trigger = this.trigger && container.find(this.trigger)
		this.prev = this.prev && container.find(this.prev)
		this.next = this.next && container.find(this.next)
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
	* Ĭ�ϼ��صڼ���
	*/
	lazyIndex: 1,
	/**
	* ���������ص�
	*/
	callback: null,
	/**
	* ��һҳ
	*/
	prev: null,
	/**
	* ��һҳ
	*/
	next: null,
	/**
	* �߽���ʽ
	*/
	activePnCls: 'none'
}