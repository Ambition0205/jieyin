<template>
	<view style="margin:30rpx;">
		<u-search  v-model="keyword"  @custom="searchBtn"></u-search>
		<view style="margin-top: 20rpx;">
			<u-cell-group v-for="(item,index) in con" :key="index">
				<u-cell-item center @click="nextPage(index)" :title="'设备名:'+item.tittle" :value="item.timer" :label="'￥'+item.label+'元'" :value-style="{'margin-bottom':'40rpx','margin-right':'30rpx'}"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
import request from '../../../common/request.js';
var _self;
export default {
	data() {
		return {
			keyword:'2020',
			con:[{
				tittle:'敏捷广场c6',
				timer:'2020-05',
				label:'1.5'
			},{
				tittle:'敏捷广场c6',
				timer:'2020-06',
				label:'2.5'
			},
			]
		}
	},
	onLoad() {
		_self = this;
	},
	created() {
		_self = this;
	
	},
	methods: {
		nextPage:function(index){
			console.log(index)
			this.$u.route({
				url: 'pages/center/dailySummary/dailySummary?index='+index
			})
		},
		searchBtn:function(){
			console.log(_self.keyword)
		}
			
	}
}
</script>

<style lang="scss" scoped>
</style>
