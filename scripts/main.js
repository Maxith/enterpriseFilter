var myFilter = {

	// 初始化
	init: function(){
		// 加载已有数据
		this.loadLocalStorage();
	},

	/**
	 * 加载数据
	 */
	loadLocalStorage: function(){
		_this = this;
		// 发送消息给background，请求已有数据
		this.sendMessageBack('list', {}, function(response){
			if(response.status == 404){
				return false;
			}

			// 将json转为对象
			_this.updateList(response.data);
			
		});
	},

	/**
	 * 获取数据并删除页面对象
	 */
	updateList: function(dicList){
		if(!dicList || dicList.length == 0){
			return;
		}
		console.log(dicList)
		var x = document.getElementsByTagName('a');
		for (var i = x.length - 1; i >= 0; i--) {
			var p = x[i].parentNode;
			if(p != undefined && p.className != undefined && p.className.indexOf('gsmc') >= 0){
				for (var j = 0; j < dicList.length; j++){
					var blackName = dicList[j];
					if(x[i].innerHTML.indexOf(blackName) >= 0){
						p.parentNode.innerHTML=''
					}
				}
			}
		}
	},
	
	/**
	 * 向background发送消息
	 * @params strAction string 执行方法
	 * @params dicData dict 数据字典
	 * @params callback function 回调函数
	 */
	sendMessageBack: function(strAction, dicData, callback){
		chrome.extension.sendMessage({'action': strAction, 'data': dicData},callback);
	}
}

myFilter.init();