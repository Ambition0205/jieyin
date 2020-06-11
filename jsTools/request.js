/*  
 - 网络请求工具 
*/ 
import {mLog} from '@/common/mLog.js' 
var headerObj ={}
let tag="success"
let errMsg ="";
module.exports = {  
	get : function(url, data, contentType, headers, callback,err){ 
		request(url,'GET',data, contentType, headers, callback,err) 
	},
	post : function(url, data, contentType, headers, callback,err){
		request(url,'POST',data, contentType, headers, callback,err) 
	},
	put : function(url, data, contentType, headers, callback,err){
		request(url,'PUT',data, contentType, headers, callback,err) 
	},
	upload: function(url, filePath,name , contentType, headers,fileType,formData, callback,err,onProgress){
	 	switch(contentType){
	 		case "form" :
	 			var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
	 		break;
	 		case "json" : 
	 			var headerObj = {'content-type' : 'application/json'};
	 		break;
	 		case "file" : 
	 			var headerObj = {'content-type' : 'multipart/form-data'};
	 		break;
	 		default :
	 			var headerObj = {'content-type' : 'multipart/form-data'};
	 	} 
	 	for(var k in headers){headerObj[k] = headers[k];}
	 	switch (fileType){
	 		case 'image': 
	 			break; 
			case 'video': 
				break;
			case 'audio': 
				break;
	 		default:
				fileType="image"
	 			break;
	 	} 
		uploadFile(url, filePath,name,headers,fileType,formData, callback,err,onProgress)
	 },
}
 function uploadFile(url, filePath,name,header,fileType,formData, callback,err,onProgress){
	  tag="success"
	  errMsg=""; 
	   const task = uni.uploadFile({
	   	url:url,
	   	filePath:filePath,
	   	name:name,
		header:header,
		fileType:fileType,
		formData,
		dataType : "json",
		success  : (res) => { 
		},
		fail     : (e) => {
			tag="fail"  
			errMsg=e.errMsg;
		},
		complete: (res) => {
			mLog.log("url",url)
			mLog.log("filePath",filePath)
			mLog.log("name",name)
			mLog.log("fileType",fileType)
			mLog.log("formData",formData)
			mLog.log("headers",headerObj)
			mLog.log(tag,res) 
			res.data = JSON.parse(res.data);
			if(res.statusCode!=200){
				//fail timeout 
				//服务器请求响应异常 
				if(tag=="fail"){ 
				}else if(res.data.message){
					errMsg=res.data.message
				}
				uni.showToast({title: errMsg, icon:"none"});  
				switch (res.statusCode){ 
					case 400:
						if(errMsg==""){
							errMsg="错误请求"
						}
						break; 
					case 401:
						if(errMsg==""){
							errMsg="未授权"
						}
						break; 
					case 403:
						if(errMsg==""){
							errMsg="服务器拒绝请求"
						}
						break; 
					case 404:
						if(errMsg==""){
							errMsg="请求的网页不存在"
						}
						break;  
					case 405:
						if(errMsg==""){
							errMsg="方法禁用"
						}
						break; 
					case 408:
						if(errMsg==""){
							errMsg="请求超时"
						}
						break;   
					case 503 :
						if(errMsg==""){
							errMsg="服务不可用"
						}
						break;
					default:
						break;
				}
				let data={
					code: -1,
					data: null, 
					errMsg: errMsg
				}
				mLog.log("err",data) 
				err(data);
			}else{  
				mLog.log("callback",res.data) 
				callback(res.data);
			}
		} 
	   
	   });
	   task.onProgressUpdate(function(res){
	   	onProgress(res.progress) 
	   }); 
}

 function request(url,method, data, contentType, headers, callback,err){
		switch(contentType){
			case "form" :
				  headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
			break;
			case "json" : 
				  headerObj = {'content-type' : 'application/json'};
			break;
			default :
				 headerObj = {'content-type' : 'application/json'};
		}
		for(var k in headers){headerObj[k] = headers[k];}
	    tag="success"
	    errMsg="";
		uni.request({
			url      : url,
			data     : data,
			method   : method,
			dataType : "json",
			header   : headerObj,
			success  : (res) => {   
			},
			fail     : (e) => {
				tag="fail"
				try{
					if(e.data && e.data.message!=undefined){
						errMsg=e.data.message;
					} else{
						errMsg=e.errMsg;
					} 
				}catch(e){
					errMsg=e.errMsg; 
				} 
			},
			complete: (res) => {
				mLog.log("url",url)
				mLog.log("data",data)
				mLog.log("headers",headerObj)
				mLog.log(tag,res) 
				if(res.statusCode!=200){
					//fail timeout 
					//服务器请求响应异常 
					if(tag=="fail"){ 
					}else {
						try{
							if(res.data.message!=undefined){
								errMsg=res.data.message;
							} 
						}catch(e){
							 
						}  
					}
					uni.showToast({title: errMsg, icon:"none"}); 
					let data={
						code: -1,
						data: null, 
						errMsg: null
					}
					switch (res.statusCode){ 
						case 400:
							if(errMsg==""){
								errMsg="错误请求"
							}
							break; 
						case 401:
							if(errMsg==""){
								errMsg="未授权"
							}
							break; 
						case 403:
							if(errMsg==""){
								errMsg="服务器拒绝请求"
							}
							break; 
						case 404:
							if(errMsg==""){
								errMsg="请求的网页不存在"
							}
							break;  
						case 405:
							if(errMsg==""){
								errMsg="方法禁用"
							}
							break; 
						case 408:
							if(errMsg==""){
								errMsg="请求超时"
							}
							break;   
						case 502 :
							if(errMsg==""){
								errMsg="502 Bad Gateway"
							}  
						case 500 :
							 data.data=res.data 
							 uni.reLaunch({
							 	url:'/pages/denglu/denglu.vue'
							 })
						case 503 :
							if(errMsg==""){
								errMsg="服务不可用"
							}
							break;
						default:
							break;
					}
					data.errMsg=errMsg;
					mLog.log("err",data) 
					err(data);
				}else{
					try{
						if(res.data && res.data.message!=undefined){
							res.data.msg=res.data.message;
						} 
					}catch(e){
						 
					} 
					mLog.log("callback",res.data) 
					callback(res.data);
				}
			}
		}); 
}