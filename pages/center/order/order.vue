<template>
	<view style="padding-top: 200rpx;">
		<u-empty text="暂无订单" mode="list"></u-empty>
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
				
			}
		},
		onLoad() {
			_self = this;
			
		},
		methods:{
			formatNumber(payDate) {
				return formatter.formatNumber(payDate, '0.00')
			},
		}
	}
</script>

<style  lang="scss" scoped>
</style>