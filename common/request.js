 import baseurl from './config.js'

// 公共的请求
 const request = function(options) {
     options.url = baseurl + options.url;
     try {
       const token = uni.getStorageSync('token');
		// console.log(token)
       if (token) {
         options.header = {
           'Authorization' : 'Bearer bearer ' + token
         };
        }else{
            uni.navigateTo({
                url: '/pages/user/login'
            });
            return;
        }
     } catch (err) {
      console.log(err)
    }
    return uni.request(options);
  }
export default request;