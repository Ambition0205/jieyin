<template>
	<view class="">
		<view v-if="list==null||list.length ==0" style="padding-top: 200rpx;">
			<u-empty text="暂无数据" mode="list" ></u-empty>
		</view>
		<view v-else>
			<!-- <u-cell-group v-for="item in list" :key="item.index">
				<u-cell-item id="bill" icon="red-packet-fill" icon-size="50" :title="item.name" :arrow="false" :label="item.time" :value-style="{color: 'red',paddingTop:'30rpx'}" :icon-style="{marginTop:'30rpx'}"  :value=" '￥' + item.account +'元'"></u-cell-item>
			</u-cell-group> -->
			<view class="content" v-for="(item, index) in list" :key="index">
				<view style="flex:0.5"><image src="../../../static/index-selected.png" style="width:40rpx;height:40rpx;"></image></view>
				<view style="flex:3">
					<view >
						{{item.transDesc}}	
					</view>
					<view style="font-size: 24rpx;color:#7B7B7B;margin-top: 10rpx;">
						{{item.transTime}}
					</view>
				</view>
				<view v-if="item.transType==3||item.transType==5" style="font-size: 24rpx;color: #7B7B7B;">{{formatNumber(item.balance)/100}}元</view>
				<view  v-else style="font-size: 24rpx;color: #EBBE9B;">{{formatNumber(item.balance)/100}}元</view>
			</view>
		</view>
		<view class="saoerImg">
			<u-icon size="66" name="plus" color="#fff" @click="openList"></u-icon>
		</view>
		<!-- 更新银行卡弹出框 -->
		<u-popup v-model="show" mode="center" length="80%" border-radius="14">
			<u-icon size="40" name="close" color="#ccc" @click="close" style="float: right;margin-right: 20rpx;margin-top: 20rpx;"></u-icon>
			<view class="tittleName">
				修改提现申请
			</view>
			<view style="padding:0 10rpx;">
				<u-cell-group>
					<u-field
						v-model="form.cardNumber"
						label="卡号:"
						placeholder="请填写提现卡号"
					>
					</u-field>
					<u-field
						v-model="form.money"
						label="申请金额:"
						placeholder="请填写申请金额(元)"
					>
					</u-field>
					<u-field
						v-model="form.serCharge"
						label="手续费:"
					>
					</u-field>
					
					<u-field
						v-model="form.remarks"
						label="备注:"
						placeholder="请填写备注"
					>
					</u-field>
					<u-field
						v-model="form.abstract"
						label="摘要:"
						placeholder="请填写摘要"
					>
					</u-field>
				</u-cell-group>
			</view>
			<view style="margin-top: 20rpx;">
				<u-row gutter="16" justify="left">
					<u-col span="6">
						<button class="tjBtn" @click="TemBtn">临时保存</button>
					</u-col>
					<u-col span="6">
						<button class="tjBtn" @click="appBtn">提交申请</button>
					</u-col>
				</u-row>
			</view>
			
			
		</u-popup>
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
				// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
				list:[],
				show:false,
				form:{
					cardNumber:'',
					money:'',
					serCharge:0,
					remarks:'',
					abstract:''
				},
			}
		},
		onLoad() {
			_self = this;
			// 个人信息
			 
		},
		created() {
			request({
                url:"/water/waterAcctChargeOrder/acctTrans",
                method:'get',
                success: function (res) {
					console.log(res)
					if(res.data.code==0){
						console.log(res.data.data)
						_self.list=res.data.data;
					}else{
						uni.showToast({
							 icon: 'none',
							 title: res.data.msg,
						 });
					}
                }
            })   
		},
		methods:{
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
			// 更新银行卡弹框
			openList:function(){
				_self.show=true;
			},
			// 临时保存按钮
			TemBtn:function(){
				var regExp = /^([1-9]{1})(\d{15}|\d{18})$/; 
				var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
				if (!regExp.test(_self.form.cardNumber)|| _self.form.cardNumber == "") {//bankCode为银行卡号
						uni.showToast({
							 icon: 'none',
							 title: '请输入正确银行卡号',
						 });
						return false;
				};
				if(!isNum.test(_self.form.money)|| _self.form.money == ""){
					uni.showToast({
						 icon: 'none',
						 title: '请输入正确金额',
					 });
						return false;
				}
				console.log(_self.form)
			},
			appBtn:function(){
				var regExp = /^([1-9]{1})(\d{15}|\d{18})$/;
				var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
				if (!regExp.test(_self.form.cardNumber)|| _self.form.cardNumber == "") {//bankCode为银行卡号
						uni.showToast({
							 icon: 'none',
							 title: '请输入正确银行卡号',
						 });
						return false;
				};
				if(!isNum.test(_self.form.money)|| _self.form.money == ""){
					uni.showToast({
						 icon: 'none',
						 title: '请输入正确金额',
					 });
						return false;
				}
				console.log(_self.form)
			},
				
			// 关闭按钮
			close:function(){
				_self.show=false;
			}
			
		}
	}
</script>

<style  lang="scss" scoped>
	#bill .u-cell__left-icon-wrap{
		margin-top: 10px!important;
	}
	.content {
		display: flex;
		justify-content: flex-start;
		align-items:center;
		height:110rpx;
		margin: 0 30rpx;	
	}
	.saoerImg{
		width:80rpx;
		height:80rpx;
		line-height: 80rpx;
		background-color: #EBBE9B;
		border-radius: 50%;
		position: fixed;
		bottom:230rpx;
		right:40rpx;
		padding-left: 8rpx;
		padding-top: 6rpx;
	}
	.tjBtn{
		width:200rpx;
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
</style>
