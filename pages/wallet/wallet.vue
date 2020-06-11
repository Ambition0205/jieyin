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
					<u-col span="2"><image class="userinfo-avatar u-skeleton-circle" :src="userInfo.imageUrl" style="margin-top: 10rpx;"></image>
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
					<u-cell-item
						icon="setting"
						title="余额"
						:value="'￥' + formatNumber(balance) / 100 + '元'"
						:value-style="{ color: '#E5A779' }"
						@click="nextBalance"
					></u-cell-item>
					<u-cell-item icon="file-text" title="账单" @click="nextBill"></u-cell-item>
					<u-cell-item icon="bell" title="提现申请" @click="application"></u-cell-item>
					<u-cell-item icon="coupon" title="银行卡" @click="bankCard"></u-cell-item>
				</u-cell-group>
				<u-cell-group v-else>
					<u-cell-item
						icon="setting"
						title="余额"
						:value="'￥' + formatNumber(balance) / 100 + '元'"
						:value-style="{ color: '#E5A779' }"
						@click="nextBalance"
					></u-cell-item>
					<u-cell-item icon="file-text" title="账单" @click="nextBill"></u-cell-item>
				</u-cell-group>
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
			// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
			userInfo: {},
			balance: 0
		};
	},

	onLoad() {
		_self = this;
	},
	created() {
		_self = this;
		// 个人信息
		_self.userinfo();
		_self.zcbtnBtn();
	},
	methods: {
		// 判断是否登录
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
										console.log(res);
										uni.setStorageSync('token', res.data.access_token);
										_self.userinfo();
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
		// 获取用户信息
		userinfo: function() {
			let data={
				clientType:'wxmp'
			}
			request({
				url: '/water/waterAcctChargeOrder/wxUserInfo',
				method: 'get',
				data:data,
				success: function(res) {
					console.log(res);
					if (res.data.code == 0) {
						console.log(res);
						_self.userInfo = res.data.data;
						console.log(_self.userInfo);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}
			});
		},
		// 格式化金额
		formatNumber(payDate) {
			return formatter.formatNumber(payDate, '0.00');
		},
		// 获取余额金额
		zcbtnBtn() {
			request({
				url: '/water/waterAcctChargeOrder/acctBalance',
				method: 'get',
				success: function(res) {
					if (res.data.code == 0) {
						_self.balance = res.data.data.balance;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}
			});
		},
		// 余额
		nextBalance: function() {
			this.$u.route({
				url: 'pages/wallet/balance/balance',
				params: {
					balance: _self.balance
				}
			});
		},
		// 账单
		nextBill: function() {
			this.$u.route({
				url: 'pages/wallet/account/account'
			});
		},
		// 提现申请
		application: function() {
			this.$u.route({
				url: 'pages/wallet/application/application'
			});
		},
		// 银行卡
		bankCard: function() {
			this.$u.route({
				url: 'pages/wallet/bankCard/bankCard'
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
		margin: 10rpx 0;
	}
	.nikename {
		font-size: 30rpx;
	}
	.consumer {
		color: #909399;
		font-size: 24rpx;
	}
}

.colorred {
	color: red;
}
.lists {
	margin: 10px 0;
}

.demo-layout {
	height: 80rpx;
	border-radius: 8rpx;
}
</style>
