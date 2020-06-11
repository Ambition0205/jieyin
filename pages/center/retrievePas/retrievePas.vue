<template>
	<view class="">
		<!-- <view class="wrap">
				<u-row gutter="16">
					<u-col span="1">
						<u-icon size="40" name="volume-up" color="#FEB64B" style="margin: 0 20rpx;"></u-icon>
					</u-col>
					<u-col span="8">
						<view class="demo-layout bg-purple-light" style="text-align: center;">如从未设置过密码，初始密码为123456</view>
					</u-col>
				</u-row>
			</view> -->
		<u-notice-bar mode="horizontal" :list="lists"></u-notice-bar>
		<view style="margin:60rpx;margin-top:0rpx;">
			<u-cell-group >
				<u-field
					v-model="form.oldPassword"
					label="旧密码:"
					placeholder="请输入旧密码"
				>
				</u-field>
				<u-field
					v-model="form.newPassword"
					label="新密码:"
					placeholder="请输入新密码"
				>
				</u-field>
				<u-field
					v-model="form.newPas"
					label="确认密码:"
					placeholder="请再次输入新密码"
				>
				</u-field>
			</u-cell-group>
		</view>
		<button class="tjBtn" @click="tjBtn">提交</button>
	</view>
</template>

<script>
	import request from '@/common/request.js'
	var formatter=require("@/common/formatter.js");
	var formatNumber=require("@/common/formatter.js");
	var _self;
	export default {
		data() {
			return {
				form:{
					oldPassword:'',
					newPassword:'',
					newPas:'',
				},
				lists: [
					'温馨提示:如从未设置过密码，初始密码为123456'
				]
			}
		},
		onLoad() {
			_self = this;
			
		},
		methods:{
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
			// 提交按钮
			tjBtn:function(){
				if (_self.form.oldPassword=="" || _self.form.newPassword=="" || _self.form.newPas==""){
				uni.showToast({
					icon: 'none',
					title: '输入不能为空'
				});
				return false;
				}
				if(_self.form.newPassword != _self.form.newPas){
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					});
					return false;
				}
				console.log(_self.form)
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.tjBtn{
		margin:30rpx;
		background-color: #EBBE9B;
		color:#fff;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		&::after{
			border:none;
		}
	}
	.tittleName{
		text-align: center;
		font-size: 32rpx;
		height:80rpx;
		line-height: 80rpx;
	}
	.wrap{
		background-color: #FDF6EC;height:50rpx;color:#FEB64B;
	}
</style>
