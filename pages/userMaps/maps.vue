<template>
	<view class="">
		<view :class="[isAdmin == true ? 'none' : 'black']">
			<view class="content">
				<!-- <u-top-tips ref="uTips" :navbar-height="statusBarHeight"></u-top-tips> -->
				<view class="topbg">
					<image src="../../static/logo.png" style="width:60rpx;height:60rpx;margin-left: 30rpx;margin-right: 10rpx;"></image>
					<text style="color:#fff;">洁浩净水，健康饮水专家</text>
				</view>
				<u-cell-group style="border-radius: 50rpx;">
					<u-field v-model="tel" label="当前余额" placeholder="当前余额"></u-field>
					<u-field v-model="deviceNo" label="设备编码" placeholder="设备编码"></u-field>
					<u-field v-model="dealerCompany" label="设备名称" placeholder="设备名称"></u-field>
					<u-field v-model="inTds" label="进水TNS" placeholder="进水TNS"></u-field>
					<u-field v-model="outTds" label="出水TNS" placeholder="出水TNS"></u-field>
				</u-cell-group>
				<view class="bbb" :class="[isShow == true ? 'black' : 'none']">
					<view style="text-align: left;margin-left: 30rpx;">
						<u-circle-progress active-color="#2979ff" :percent="100" :duration="aaa" width="70" border-width="4">
							<view class="u-progress-content">
								<view class="u-progress-dot"></view>
								<text class="u-progress-info">2%</text>
							</view>
						</u-circle-progress>
						<text style="margin-left: 20rpx;margin-top: 20rpx;font-size: 24rpx;">正在用水中,预计还有{{ value }}秒完成</text>
					</view>
				</view>
				<view class="aaa" :class="[isShow == false ? 'black' : 'none']">
					<view :class="[isShow == false ? 'black' : 'none']">
						<view style="margin:30rpx 0;">用水量选择</view>
						<u-subsection :list="list" :current="1" bg-color="#fff" active-color="#ff9900" @change="sectionChange"></u-subsection>
					</view>
				</view>
			</view>
			<view class="btns" :class="[isShow == false ? 'black' : 'none']">
				<button type="primary " class="zcbtn" @tap="StartUseWater" open-type="getUserInfo" bindgetuserinfo="getUserInfo">开始用水</button>
			</view>
			<view class="btns" :class="[isShow == true ? 'black' : 'none']">
				<button type="primary " class="zcbtn" @tap="endUseWater" open-type="getUserInfo" bindgetuserinfo="getUserInfo">结束用水并结算</button>
			</view>
		</view>
		<view :class="[isAdmin == true ? 'black' : 'none']">
			<view class="page-body">
				<view class="page-section page-section-gap"><map style="width: 100%;height:96vh;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
			</view>
		
			<view class="scan">
				<button class="testbutton" open-type="getUserInfo" @getuserinfo="getuserinfo"><u-icon size="88" name="scan" color="#fff" class=" saoerImg"></u-icon></button>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../common/request.js';
var formatter = require('@/common/formatter.js');
var formatNumber = require('@/common/formatter.js');
var _self;
export default {
	data() {
		return {
			nodes: [
				{
					name: 'div',
					attrs: {
						class: 'div_class',
						style: 'line-height: 60px; color: red;'
					},
					children: [
						{
							type: 'text',
							text: ''
						}
					]
				}
			],
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 39.9,
			longitude: 116.38,
			covers: [
				{
					latitude: 39.9,
					longitude: 116.38
				}
			],
			isAdmin:true,
			// 这里是首页内容
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
			deviceNo: '',
			tel: '',
			dealerCompany: '',
			inTds: '',
			outTds: '',
			value: 0,
			aaa: '25000',
			isShow: false,
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
			curNow: '750',
			balanceList: {},
			current: 1,
			tokenOne: '',
			qrcode:''
		};
	},
	onLoad() {
		_self = this;
		_self.tokenOne = uni.getStorageSync('token');
		console.log(_self.tokenOne);
		
	},
	onReady() {},
	created() {
		uni.authorize({
			scope: 'scope.userLocation',
			success() {
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res);
						_self.covers[0].longitude = res.longitude;
						_self.covers[0].latitude = res.latitude;
						_self.latitude = res.latitude;
						_self.longitude = res.longitude;
					}
				});
			},
			fail: function() {
				_self.openConfirm();
			}
		}); 
	},
	mounted: function() {},
	methods: {
		// getAuthorizeInfo(){
		//    const that = this;
		//    uni.authorize({
		//     scope: 'scope.userLocation',
		//     success() { // 允许授权
		//      that.getLocationInfo();
		//     },
		//     fail(){    // 拒绝授权
		//      that.openConfirm();
		//      console.log("你拒绝了授权，无法获得周边信息")
		//     }
		//    })
		//   },
		//    // 获取地理位置
		//   getLocationInfo(){
		//    uni.getLocation({
		//     type: 'gcj02',
		//     success: function (res) {
		//     	_self.covers[0].longitude=res.longitude;
		//     	_self.covers[0].latitude=res.latitude;
		//     	_self.latitude=res.latitude;
		//     	_self.longitude=res.longitude;
		// 		}
		//    });
		//   },

		// 再次获取授权
		// 当用户第一次拒绝后再次请求授权
		openConfirm() {
			uni.showModal({
				title: '请求授权当前位置',
				content: '需要获取您的地理位置，请确认授权',
				success: res => {
					if (res.confirm) {
						uni.openSetting(); // 打开地图权限设置
					} else if (res.cancel) {
						uni.showToast({
							title: '你拒绝了授权，无法获得周边信息',
							icon: 'none',
							duration: 1000
						});
					}
				}
			});
		},
		getuserinfo: function() {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					var code = loginRes.code;
					if (code) {
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								let data = {
									code: code,
									wxmpUserInfo: infoRes.userInfo
								};
								console.log(data);
								uni.request({
									header: {
										'Content-Type': 'application/json'
									},
									url: 'https://www.warelink.cn/oauth/custom/miniapp',
									method: 'POST',
									data: data,
									success: res => {
										uni.setStorageSync('token', res.data.access_token);
										if (res.statusCode == 200) {
											uni.scanCode({
												success: function(res) {
													console.log('条码类型：' + res.scanType);
													console.log('条码内容：' + res.result);
													let aaa = res.result.split('=');
													_self.qrcode = aaa[1];
													let data = {
														qrCode: _self.qrcode 
													};
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
																_self.isAdmin=false;
															}
											         	}
												    })
													// request({
													// 	url: '/water/water4App/getTapsByQrCode',
													// 	method: 'get',
													// 	data: data,
													// 	success: function(res) {
													// 		if (res.data.code == 0) {
													// 			_self.balanceList = res.data.data;
													// 			console.log(_self.balanceList);
													// 		}
													// 	}
													// });
												}
											});
										}
									}
								});
							},
							fail: function() {
								console.log('未授权');
							}
						});
					}
				}
			});
		},
		// 这里是首页的方法
		showTips() {
			this.$refs.uTips.show({
				title: '温馨提示,以实际取水量结算，为避免您忘记结算可能造成的损失,请选择本次最大用水量',
				duration: 4000,
				type: 'warning'
			});
		},
		formatNumber(payDate) {
			return formatter.formatNumber(payDate, '0.00');
		},
		sectionChange(index) {
			_self.curNow = parseInt(_self.list[index].name);
			console.log(_self.curNow);
		},
		// 开始用水
		StartUseWater: function() {
			_self.showTips();

			let data = {
				qrCode: 80006,
				waterMl: _self.curNow
			};
			console.log(data);
			request({
				url: '/water/water4App/confirm',
				method: 'get',
				data: data,
				success: function(res) {
					if (res.data.code == 0) {
						_self.balanceList = res.data.data;
						_self.value = res.data.data.duringTime;
						// _self.aaa=res.data.data.duringTime*1000;
						// console.log(_self.aaa)
						setInterval(function() {
							if (_self.value == 0) {
								_self.isShow = false;
								return false;
							} else {
								_self.value = res.data.data.duringTime-- - 1;
							}
						}, 1000);
						_self.isShow = true;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}
			});
		},
		// 结束用水按钮
		endUseWater: function() {
			let data = {
				qrCode: 80006,
				ticketNo: _self.value
			};
			console.log(data);
			request({
				url: '/water/water4App/stopDevice',
				method: 'get',
				data: data,
				success: function(res) {
					if (res.data.code == 0) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						_self.isShow = false;
						console.log(res.data);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scan {
	position: fixed;
	bottom: 10rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 150rpx;
	height: 150rpx;
	background-color: orange;
	border-radius: 50%;
	.testbutton {
		display: flex;
		margin-top: 30rpx;
		margin-left: 20%;
		transform: translateX(-20%);
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0);
		&::after {
			border: none;
		}
	}
}
.page-body {
	margin: 20rpx;
}

// 这里是首页的样式
page {
	background-color: rgb(240, 240, 240);
}
.content {
	margin: 25rpx;
	background-color: #fff;
	border-radius: 20rpx;
	.aaa {
		text-align: center;
		height: 200rpx;
	}
	.bbb {
		text-align: center;
		height: 100rpx;
		line-height: 80rpx;
	}
}
.btns {
	margin-top: 150rpx;
	text-align: center;
	.StartUseWater {
		margin: 0 25rpx;
	}
}
.zcbtn {
	background-color: #e5a779;
	color: #fff;
	margin: 0 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	&::after {
		border: 1px solid #e5a779;
	}
}
.topbg {
	height: 100rpx;
	line-height: 100rpx;
	background: #1f2b5b;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.wrap {
	padding: 60rpx;
	margin-top: 10rpx;
}
.u-primary {
	background: #00bcd5 !important;
}
.u-progress-content {
	display: flex;
	align-items: center;
	justify-content: center;
}
.u-progress-info {
	font-size: 20rpx;
	letter-spacing: 2rpx;
}
.black {
	display: block;
}
.none {
	display: none;
}
</style>
