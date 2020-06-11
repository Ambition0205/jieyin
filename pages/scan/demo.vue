<template>
	<view class="content">
		<view class="text-area">
			<text class="name">{{name}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
	</view>
</template>

<script>
	import permision from "@/common/permission.js";
	export default {
		data() {
			return {
				name: '默认name',
				title: 'Hello'
			}
		},
		onLoad:function(option){
			this.name = option.name;
			this.title = option.item;
			this.func();
			
			// console.log("option: " + JSON.stringify(option));
		},
		methods: {
			func(){
				uni.showToast({
				    title: '跳转扫码',
				    duration: 1000,
					success:function(){
						setTimeout(function() {
							uni.redirectTo({
								url:"./scanQrcodePlus?callbackurl="+encodeURIComponent("/pages/scan/demo?name=传输的文字")+"&count=1" 
							})
						}, 1000);
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.bu {
		margin-top: 20upx;
	}
</style>

