<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">圆弧进度图</view>
		</view>
		<view class="qiun-charts3">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts.js';
	var _self;
	var canvaArcbar1;
	
	export default {
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
			}
		},
		onLoad() {
			_self = this;
			this.cWidth3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(250);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(24);
			this.getServerData();
		},
		methods: {
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let Arcbar1={series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Arcbar1.series=res.data.data.Arcbar1.series;
						_self.showArcbar("canvasArcbar1",Arcbar1);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
					}
				});
				
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts3 {
		width: 750upx;
		height: 250upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}
</style>

