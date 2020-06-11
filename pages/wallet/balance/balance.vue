<template>
	<view class="container">
		<view class="contentTop">
			<u-icon name="coupon" color="#EBBE9B" size="60"></u-icon>
			<view style="padding-top: 20rpx;">我的余额</view>
			<view style="padding-top: 20rpx;">￥{{formatNumber(balance/100)}}元</view>
		</view>
		<!-- <u-button :ripple="true" type="primary" ></u-button> -->
		<button type="primary" class="recharge" @click="recharge">充值</button>
		<!-- 充值遮罩层 -->
		<view>
			<u-toast ref="uToast"/>
			<u-modal v-model="show" :title-style="{background: '#eee',height: '100rpx',lineHeight: '20rpx'}" title="充值" confirm-text="支付"  show-cancel-button :content-slot="true" @confirm="confirm" @cancel="cancel" >
				<view class="slot-content">
					<!-- <input type="text" v-model="cont" class="cInput" placeholder="请输入金额(元)" /> -->
					<u-cell-group>
						<u-field v-model="cont" placeholder="请输入金额(元)" > </u-field>
					</u-cell-group>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	var _self;
	import request from '@/common/request.js'
	var formatter=require("@/common/formatter.js");
	var formatNumber=require("@/common/formatter.js");
	export default {
		data() {
			return {
				// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
				userInfo: {
					avatarUrl: 'https://qlogo2.store.qq.com/qzone/1416956117/1416956117/100?1531323520',
					nickName: '小可爱',
					consumer: '消费者'
				},
				show: false,
				cont:'',
				content: `
					空山新雨后<br>
					天气晚来秋
				`,
				balance:1000
			}
		},
		onLoad(options) {
			_self=this;
			_self.balance=options.balance;
		},
		methods:{
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
			// 余额
			recharge:function(){
				_self.show = true;
			},
			confirm:function(){
				let data={
					amount:_self.cont,
					ua:'weixin'
				}
				request({
	                url:"/water/waterAcctChargeOrder/wxpay",
	                method:'get',
					data:data,
	                success: function (res) {
						console.log(res)
						if(res.data.code==0){
							console.log(res.data.data.payParams)
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.payParams.timeStamp,
								nonceStr: res.data.data.payParams.nonceStr,
								package: res.data.data.payParams.package,
								signType: 'MD5',
								paySign: res.data.data.payParams.paySign,
								appId:res.data.data.payParams.appId,
								success: function(res) {
									console.log(res)
									console.log('success:' + JSON.stringify(res));
									// uni.showToast({
									// 	 icon: 'none',
									// 	 title: res.msg,
									//  });
									//  setTimeout(function(){ 
									// 	 uni.redirectTo({
									// 		url: '/pages/order/paySuc'
									// 	 })
									// }, 1000);	
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.showToast({
										 icon: 'none',
										 title: err.errmsg,
									}); 
								}
							});
						}
	                }
	            })    
				// }
				
				
				// _self.$refs.uToast.show({
				// 	title: '充值成功',
				// 	url: '/pages/index/index',
				// 	isTab:true,
				// 	type: 'success',
				// 	param: {
				// 		id: 1,
				// 		menu: 3
				// 	}
				// })
			},
			cancel:function(){
				_self.$refs.uToast.show({
					title: '您点击i了取消',
					type: 'error'
				})
			},
			
			
		}
	}
</script>

<style  lang="scss" scoped>
	.container{
		margin-top: 200rpx;
		.contentTop{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom:40rpx;
		}
		.recharge{
			width:200rpx;
			background-color: #EBBE9B;
			&::after{
				border:1px solid #EBBE9B;
			}
		}
		.slot-content {
			font-size: 28rpx;
			color: $u-content-color;
			padding-left: 30rpx;
		}
		.u-size-default.data-v-4adafb06{
			width:200rpx!important;
		}
		.cInput{
			// width:80%;
			height: 100rpx;
			text-align: center;
		}
	}
	
</style>
