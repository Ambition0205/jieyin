<template>
	<view v-if="list==null||list.length ==0">
		<view class="content" >
			<view style="flex:0.5"><image src="../../../static/index-selected.png" style="width:40rpx;height:40rpx;"></image></view>
			<view style="flex:3">
				<view style="font-size: 24rpx;color:#7B7B7B;">
					暂无日期
				</view>
			</view>
			
			<view style="font-size: 24rpx;color:#7B7B7B;">￥0.00元</view>
		</view>
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
				list:[]
			
			}
		},
		onLoad() {
			_self = this;
		},
		created() {
			// 账单列表
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
			// border-bottom: solid #eee;
	    }
</style>
