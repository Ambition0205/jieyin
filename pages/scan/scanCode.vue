<template>
	<view class="content">
		<view class="text-area">
			<text>{{code}}</text>
			<text class="title">{{result}}</text>
		</view>
		<view v-if="select_view == 'credible_view'" class="open_view">
			<button type="primary">受信地址</button>
		</view>
		
		<view v-if="select_view == 'open_view'" class="open_view">
			<button type="primary">不受信地址</button>
		</view>
	</view>
</template>

<script>
	import helper from "@/common/helper.js";
	
	export default{
		data() {
			return {
				domain:"www.zunkr.com",
				code: '默认的内容',// 获取的二维码
				result: '',
				select_view:"no",
				model:"pda",
				callbackurl:''
			}
		},
		onLoad:function(option){
			var that = this;
			if(!option.code){
				this.result = "扫码内容为空";
			}
			if(option.model){
				this.model = option.model;
			}
			this.callbackurl = decodeURIComponent(option.callbackurl);// 回调地址
			const code = decodeURIComponent(option.code);
			// code = "https://www.baidu.com?51b6d2c0-1964-11ea-a286-00163e0dfa3d";
			this.code = code;
			// 分解是类型
			switch (typeof(code)){
				case 'number':
					this.result = code+"number 类型";
					break;
				case 'string':
					this.result = code+"string 类型";
					
					if(helper.IsURL(code)){
						
						// 解析内部地址 
						var domain = helper.AnalysisURL(code)[2]
						console.log(domain)
						console.log(that.domain)
						console.log(that.model)
						if(domain === that.domain){
							// 检测工作模式
							if (that.model == 'pda'){
								// 分解参数
								var param = code.split("?");
								var uuid = param[1];
								this.result = domain+"为可控域名\r\nuuid为"+uuid;
								if(that.callbackurl){
									uni.redirectTo({
										url:that.callbackurl+'?item='+uuid
									})
								}
							
							}else if(that.model == 'browser'){
								this.result = domain+"可信域验证通过";
								this.select_view = "credible_view"
							}
						}else{
							// 检测工作模式
							console.log(that.model)
							if (that.model == 'pda'){
								uni.showToast({
									title:"PDA模式权限验证失败"
								})
								this.result = '模式权限验证失败';
								this.select_view = "no"
							}else if(that.model == 'browser'){
								this.result = domain+"不属于内部域名可以第二webview打开";
								this.select_view = "open_view"
							}
							
						}
						
					}else{
						this.result = code+"外部数据禁止使用";
					}
					
					break;
				case 'boolean':
					this.result = code+"boolean 类型";
					break;
				case 'array':
					this.result = code+"array 类型";
					break;
				default:
					this.result = code+"default 类型";
					break;
			}
			
			console.log('App Load')
		},
		onShow: function() {
			var that = this;
			
			console.log('App Show')
		},
		methods:{
			back(){
				console.log("回去");
				uni.navigateBack({
					delta:1
				})
			},
			open_view(){
				console.log(encodeURI(this.code));
				uni.navigateTo({
					url: "/pages/webviews/openview?url="+ encodeURI(this.code)  ,
					animationType: 'pop-in',
					animationDuration: 200,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
				
			}
		}

	}
</script>

<style>
	.scan-result {
		min-height: 50upx;
		line-height: 50upx;
	}
</style>
