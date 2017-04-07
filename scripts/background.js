/**
 * ����content_script���͵���Ϣ
 */
chrome.extension.onMessage.addListener(function(request, _, sendResponse){
	// ��������
	var dicReturn;
	
	// ��ȡ�Ƿ��ʼ��
	if(request.action == 'isInitData'){
		// ��localstorage�ж�ȡ����
		var result = localStorage['isInitData'];
		if(result != null){
			dicReturn = {'status': 200, 'data': result}
		}else{
			dicReturn = {'status': 404}
		}

		// ��content_script������Ϣ
		sendResponse(dicReturn);
	}
	
	// �޸ĳ�ʼ��״̬
	if(request.action == 'updateStatus'){
		localStorage['isInitData'] = true;
	}
	
	// ��ȡ�Ѵ�����
	if(request.action == 'list'){
		// ��localstorage�ж�ȡ����
		var strList = localStorage['list'];
		if(strList){
			// ��json�ַ���תΪ����
			var dicList = JSON.parse(strList)
			dicReturn = {'status': 200, 'data': dicList}
		}else{
			dicReturn = {'status': 404}
		}

		// ��content_script������Ϣ
		sendResponse(dicReturn);
	}

	// ����
	if(request.action == 'save'){
		// content_script����message
		var strMessage = request.data.message;
		// ��localstorage�ж�ȡ����
		var strList = localStorage['list'];
		var dicList = [];
		if(strList){
			// ��json�ַ���תΪ����
			dicList = JSON.parse(strList)
		}
		dicList.push(strMessage);
		localStorage['list'] = JSON.stringify(dicList);

		dicReturn = {'status': 200, 'data': dicList};
		// ��content_script������Ϣ
		sendResponse(dicReturn);
	}
	
	// ��������
	if(request.action == 'saveList'){
		// content_script����message
		var strMessage = request.data.message;
		// ��localstorage�ж�ȡ����
		var strList = localStorage['list'];
		var dicList = [];
		if(strList){
			// ��json�ַ���תΪ����
			dicList = JSON.parse(strList)
		}
		for(var i = 0;i < strMessage.length;i++){
			dicList.push(strMessage[i]);
		}
		
		localStorage['list'] = JSON.stringify(dicList);

		dicReturn = {'status': 200, 'data': dicList};
		// ��content_script������Ϣ
		sendResponse(dicReturn);
	}

	// ɾ��
	if(request.action == 'del'){
		// content_script������message
		var strMessage = request.data.message;
		// ��localstorage�ж�ȡ����
		var strList = localStorage['list'];
		if(strList){
			// ��json�ַ���תΪ����
			dicList = JSON.parse(strList);
			// �������ݣ��ҵ���Ӧֵ
			for(var i in dicList){
				if(dicList[i] == strMessage){
					// ɾ����ֵ
					dicList.splice(i, 1);
				}
			}

			// ���´洢
			localStorage['list'] = JSON.stringify(dicList);
			// ��content_script������Ϣ
			sendResponse({'status': 200});
		}else{
			sendResponse({'status': 501, 'msg': 'ɾ��ʧ�ܣ�δ������'});
		}
	}
});