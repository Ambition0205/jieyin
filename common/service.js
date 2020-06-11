/**
 * 此文件管理项目所有接口
 */
import { get, post,put,upload} from '../jsTools/request';
export const apiServer = 'https://www.warelink.cn'; //api 基础路径地址, 在项目中使用组合的方式组合出 api 路径，便于后期 api 的接口更换及维护
// var openApi = require("./openApi.js");
// fenxiao.99zhifukeji.com
 var header={};
 let mDict={}
module.exports = {  
	setHToken:function(token){
		// header = {"token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTA0NDE1MDEsInVzZXJfbmFtZSI6IjIwNjcyNDQ5Mjg2NzcxNTA3MyIsImp0aSI6ImRiZTA3MDY1LTk1OTgtNGE5Ni1iMWNhLWVkNWE'}
	},
	setDict:function(dict){
		 mDict = dict
	}, 
	getDict:function(){
		return mDict
	},
	// 微信认证
	auth:(data,callback,err ) => post(`${apiServer}/oauth/auth/weixin`,data,"",null,callback,err),
	qrpay:(data,callback,err ) => post(`${apiServer}/water/scan/qrpay.html`,data,"",null,callback,err),
	// 开始用水
	confirm:(data,callback,err ) => post(`${apiServer}/water/water4App/confirm`,data,"",header,callback,err),
	// 个人中心
	wxUserInfo:(callback,err ) => post(`${apiServer}/water/waterAcctChargeOrder/wxUserInfo`,{},"",header,callback,err),
	
	
}
  



 