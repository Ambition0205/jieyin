<template>
	<view>
		<view class="container u-skeleton">
			<view class="userinfo" v-if=" Object.keys(userInfo).length==0 ">
				<u-row>
					<u-col span="2"><image src="../../static/missing-face.png" style="width: 100rpx;height:100rpx;margin-top: 10rpx;"></image>
					</u-col>
					<u-col span="9">
						<button class="loginBtn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">您暂未登录,请登录</button>
					</u-col>
				</u-row>
			</view>
			<view class="userinfo" v-else>
				<u-row>
					<u-col span="2">
						<image class="userinfo-avatar u-skeleton-circle" :src="userInfo.imageUrl" style="margin: 10rpx 0;"></image>
					</u-col>
					<u-col span="9">
						<view class="nikename" style="margin-bottom: 10rpx;margin-top:20rpx;">{{ userInfo.displayName }}</view>
						<view class="consumer" v-if="userInfo.type == 1">普通用户</view>
						<view class="consumer" v-else-if="userInfo.type == 2">经销商</view>
						<view class="consumer" v-else>生产商</view>
					</u-col>
				</u-row>
			</view>
			<view style="margin: 20px 0">
				<u-cell-group v-if="userInfo.type == 2">
					<u-cell-item icon="setting-fill" title="订单" @click="orders"></u-cell-item>
					<u-cell-item icon="order" title="销售订单" @click="SalesOrder"></u-cell-item>
					<u-cell-item icon="edit-pen" title="找回账户密码" @click="retrievePas"></u-cell-item>
					<u-cell-item icon="list" title="汇总报表" @click="summaryReport"></u-cell-item>
				</u-cell-group>
				<u-cell-group v-else>
					<u-cell-item icon="setting-fill" title="售后服务" @click="service"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../common/request.js';
var _self;
export default {
	data() {
		return {
			// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
			userInfo: {}
		};
	},
	onLoad() {
		_self = this;
	},
	created() {
		_self = this;
		_self.$nextTick(function(){  //不使用this.$nextTick()方法会报错
		       _self.zcbtnBtn();
		});
	},
	methods: {
		wxGetUserInfo: function() {
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
										_self.zcbtnBtn();
									}
								});
							},
							fail: function() {
								uni.showToast({
									icon: 'none',
									title: '您取消了授权'
								});
							}
						});
					}
				}
			});
		},
		zcbtnBtn() {
			let data={
				clientType:'wxmp'
			}
			request({
				url: '/water/waterAcctChargeOrder/wxUserInfo',
				method: 'get',
				data:data,
				success: function(res) {
					if (res.data.code == 0) {
						_self.userInfo = res.data.data;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				},
				fail: function(res) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					});
				}
			});
		},
		// 找回账户密码
		retrievePas:function(){
			this.$u.route({
				url: 'pages/center/retrievePas/retrievePas'
			});
		},
		// 订单
		orders:function(){
			this.$u.route({
				url: 'pages/center/order/order'
			});
		},
		// 销售订单
		SalesOrder:function(){
			this.$u.route({
				url: 'pages/center/SalesOrder/SalesOrder'
			});
		},
		// 汇总报表
		summaryReport:function(){
			this.$u.route({
				url: 'pages/center/summaryReport/summaryReport'
			});
		},
		// 售后服务
		service:function(){
			this.$u.route({
				url: 'pages/center/service/service'
			});
		},
			
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 20rpx;
}
.userinfo {
	padding-left: 20rpx;
	margin-top: 30rpx;
	border: 1px solid #eee;
	border-radius: 10rpx;
	.loginBtn {
		border-radius: 80rpx;
		background-color: #fff;
		border: none;
		font-size: 28rpx;
		text-align: left;
		padding: 20rpx 0;
		padding-left: 20rpx;
		&::after {
			border: none;
		}
	}
	.userinfo-avatar {
		width: 98rpx;
		height: 98rpx;
		border-radius: 50%;
	}
	.nikename {
		font-size: 30rpx;
	}
	.consumer {
		color: #909399;
		font-size: 24rpx;
	}
}

.lists {
	margin: 10px 0;
}

.demo-layout {
	height: 80rpx;
	border-radius: 8rpx;
}
</style>
