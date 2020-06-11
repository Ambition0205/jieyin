<template>
	<view class="">
		<u-cell-group v-for="(item,index) in con" :key="index">
			<u-cell-item  @click="nextPage(index)" :title="'设备名:'+item.tittle" :value="item.timer" :label="'￥'+item.label+'元'"  :arrow="false" :value-style="{'margin-top':'28px','font-size':'24rpx'}"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import request from '../../../common/request.js';
	var _self;
	export default {
		data() {
			return {
				con:[{
					tittle:'敏捷广场c6',
					timer:'2020-05-23',
					label:'1.5'
				},{
					tittle:'敏捷广场c6',
					timer:'2020-06-10',
					label:'2.5'
				},
				]
			}
		},
		onLoad(options) {
			_self = this;
			_self.option=options.index
			console.log(_self.option)
		},
		created() {
			_self = this;
		
		},
		methods: {
			
				
		}
	};
</script>

<style>
</style>
