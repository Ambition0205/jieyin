<template>
	<view class="">
		<!-- <u-navbar :is-back="false" title="首页" :background="background" title-color="#fff"></u-navbar> -->
		<view class="content">
			<!-- <u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight" ></u-top-tips> -->
			<!-- <u-button @click="showTips">弹出Tips</u-button> -->
			<view class="topbg">
				<image src="../../static/logo.png" style="width:60rpx;height:60rpx;margin-left: 30rpx;margin-right: 10rpx;"></image>
				<text style="color:#fff;">洁浩净水，健康饮水专家</text>
			</view>
			<u-cell-group style="border-radius: 50rpx;">
				<u-field
					v-model="tel"
					label="当前余额"
					placeholder="请填写手机号"
				>
				</u-field>
				<u-field
					v-model="deviceNo"
					label="设备编码"
					placeholder="请填写验证码"
				>
				</u-field>
				<u-field
					v-model="dealerCompany"
					label="设备名称"
					placeholder="设备名称"
				>
				</u-field>
				<u-field
					v-model="inTds"
					label="进水TNS"
					placeholder="请填写验证码"
				>
				</u-field>
				<u-field
					v-model="outTds"
					label="出水TNS"
					placeholder="请填写手机号"
				>
				</u-field>
			</u-cell-group>
			<view class="bbb" :class="[isShow==true?'black':'none']" >
				<view style="text-align: left;margin-left: 30rpx;" >
					<u-circle-progress active-color="#2979ff" :percent="100" :duration="aaa" width="70" border-width="4">
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<text class='u-progress-info'>2%</text>
						</view>
					</u-circle-progress>
					<text style="margin-left: 20rpx;margin-top: 20rpx;font-size: 24rpx;">
						正在用水中,预计还有{{value}}秒完成
					</text>
				</view>
			</view>
			<view class="aaa" :class="[isShow==false?'black':'none']">
				<view :class="[isShow==false?'black':'none']">
					<view style="margin:30rpx 0;" >
						用水量选择
					</view>
					<u-subsection :list="list" :current="1" bg-color="#fff" active-color="#E5A779" @change="sectionChange"></u-subsection>
				</view>
			</view>
		</view>
		<view class="btns" :class="[isShow==false?'black':'none']">
			<button type="primary " class="zcbtn" @tap="StartUseWater" open-type="getUserInfo"  bindgetuserinfo="getUserInfo">开始用水</button>
		</view>
		<view class="btns" :class="[isShow==true?'black':'none']">
			<button type="primary " class="zcbtn" @tap="endUseWater" open-type="getUserInfo"  bindgetuserinfo="getUserInfo">结束用水并结算</button>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	var formatter=require("@/common/formatter.js");
	var formatNumber=require("@/common/formatter.js");
	var _self;
	export default {	
		data() {
			return {
				background: {
					// backgroundColor: '#001f3f',
					
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				deviceNo:'',
				tel:'',
				dealerCompany:'',
				inTds:'',
				outTds:'',
				value:0,
				aaa:'25000',
				isShow:false,
				list: [
					{
						name: '250ml'
					}, 
					{
						name: '750ml'
					}, 
					{
						name: '3升'
					},
					{
						name: '5升以上'
					}
				],
				curNow:'750',
				balanceList:{},
				current: 1
				
			}
		},
		onLoad() { 
			_self=this;
			let data={
				qrCode:'80006'
			}
			request({
                url:"/water/water4App/getDeviceInfo4AppIndex",
                method:'get',
				data:data,
                success: function (res) {
					if(res.data.code==0){
						_self.balanceList=res.data.data;
						_self.tel=_self.balanceList[0].tel;
						_self.deviceNo=_self.balanceList[0].deviceNo;
						_self.dealerCompany=_self.balanceList[0].dealerCompany
						_self.inTds=(_self.balanceList[0].inTds)+'PPM';
						_self.outTds=(_self.balanceList[0].outTds)+'PPM';
						console.log(_self.balanceList)
					}
                }
            })  
		},
		//  created(){
		//       _self.StartUseWater();
		// },
		onReachBottom() {
			
			
		},
		created:function(){},
		
		methods: {
			showTips() {
				this.$refs.uTips.show({
					title: '温馨提示,以实际取水量结算，为避免您忘记结算可能造成的损失,请选择本次最大用水量',
					duration:4000,
					type:'warning'
				});
			},
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
			sectionChange(index) {
				_self.curNow=parseInt(_self.list[index].name)
				console.log(_self.curNow)
			},
			// 开始用水
			StartUseWater:function(){
				_self.showTips()
				
				let data={
					qrCode:80006,
					waterMl:_self.curNow
				}
				console.log(data)
				request({
	                url:"/water/water4App/confirm",
	                method:'get',
					data:data,
		                success: function (res) {
							if(res.data.code==0){
								_self.balanceList=res.data.data;
								_self.value=res.data.data.duringTime;
								// _self.aaa=res.data.data.duringTime*1000;
								// console.log(_self.aaa)
								setInterval(function(){
									if(_self.value==0){
									_self.isShow=false;
									return false;
									}else{
										_self.value=(res.data.data.duringTime--)-1;
									}
								},1000);
								_self.isShow=true;
							}else{
								uni.showToast({
									 icon: 'none',
									 title: res.data.msg,
								 });
							}
		                }
		            })  	
			},
			// 结束用水按钮
			endUseWater:function(){
				let data={
					qrCode:80006,
					ticketNo:_self.value
				}
				console.log(data)
				request({
	                url:"/water/water4App/stopDevice",
	                method:'get',
					data:data,
		                success: function (res) {
							if(res.data.code==0){
								uni.showToast({
									 icon: 'none',
									 title: res.data.msg,
								 });
								 _self.isShow=false;
								console.log(res.data)
							}else{
								uni.showToast({
									 icon: 'none',
									 title: res.data.msg,
								 });
							}
		                }
		            })  	
			}
			
		}
	}
</script>



<style lang="scss" scoped>
	page {
		background-color: rgb(240, 240, 240);
	}
	.content{
		margin:25rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.aaa{
			text-align: center;
			height: 200rpx;
		}
		.bbb{
			text-align: center;
			height: 100rpx;
			line-height: 80rpx;
		}
	}
	.btns{
		margin-top: 150rpx;
		text-align: center;
		.StartUseWater{
			margin: 0 25rpx;
		}
	}
	.zcbtn{
		background-color: #F3C78F;
		color: #fff;
		margin: 0 30rpx;
		height:80rpx;
		line-height: 80rpx;
		&::after{
			border:1px solid #F3C78F;
			
		}
	}
	.topbg{
		height: 100rpx;
		line-height:100rpx;
		background: #1F2B5B;
		display: flex;
		justify-content: flex-start;
		align-items:center;
	}
	.wrap {
		padding: 60rpx;
		margin-top: 10rpx;
	}
	.u-primary{
		background: #00BCD5!important;
	}
	.u-progress-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.u-progress-info {
		font-size: 20rpx;
		letter-spacing: 2rpx
	}
	.black{
		display: block;
	}
	.none{
		display: none;
	}
</style>