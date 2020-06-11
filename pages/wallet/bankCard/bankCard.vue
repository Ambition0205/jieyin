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
				更新银行卡
			</view>
			<view style="padding:0 10rpx;">
				<u-cell-group >
					<u-field
						v-model="form.kaihuh"
						label="开户行"
						placeholder="请填写开户行"
						required
					>
					</u-field>
					<u-field
						v-model="form.name"
						label="持卡人"
						required
						placeholder="请填写持卡人姓名"
					>
					</u-field>
					<u-field
						v-model="form.code"
						label="银行卡号"
						placeholder="请填写银行卡号"
						required
					>
					</u-field>
				</u-cell-group>
				<view style="margin:30rpx;">
					<u-checkbox-group >
						<u-checkbox 
							@change="checkboxChange" 
							v-model="item.checked" 
							v-for="(item, index) in listss" :key="index" 
							:name="item.name"
						>{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<button class="tjBtn" @click="tjBtn">提交</button>
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
					kaihuh:'',
					name:'',
					code:'',
					checked:false
				},
				listss: [
					{
						name: '默认有效卡',
						checked: false
					}
				]
			
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
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e.value);
				_self.form.checked=e.value;
			},
			// 提交按钮
			tjBtn:function(){
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
