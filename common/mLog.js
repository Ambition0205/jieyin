let tag='mLog======>';
let isDebug=true;
let showTrace=false;//是否显示堆栈信息
let mLog={ 
	log:function(msg,...obj){ 
		//console.log('String: %s, Int: %d,Float: %f, Object: %o', str, ints, floats, obj) 
		if(isDebug){
			if(obj && obj.length>0){
				console.log(msg, obj);
			}else{
				console.log(tag, msg);
			}  
		}
		 if(showTrace){
			 this.trace()
		 }
		
	}, 
	
	trace:function(){
		//追踪函数的调用过程
		console.trace();
	},  
	assert:function(flg,str){
		console.assert(flg,str);
	},
	clear:function(){
		console.clear();
	},
	context:function(){
		console.context();
	},
	count:function(){
		console.count('count');
	},
	error:function(str){
		console.error('Error: %s (%i)',str,500);
	},
	//别名
	info:function(str){
		console.info(str);
	},
	//将复合类型的数据转为表格显示。 如数组 或对象
	table:function(obj){
		if(isDebug){
			console.table(obj);
		}
	},
	time:function(str){
		//计时开始
		console.time(str);
	},
	timeEnd:function(str){
		//计时结束 
		console.timeEnd(str);
	},
	
	warn:function(str){
		//输出警告信息
		console.warn(str);
	}, 
	
	countReset:function(){
		console.countReset();
	},
	debug:function(){
		console.debug();
	},
	dir:function(){
		console.dir();
	},
	dirxml:function(){
		console.dirxml();
	},
	error:function(){
		console.error();
	},
	group:function(){
		console.group();
	},
	debug:function(){
		console.debug();
	},
	 
	
	profile:function(){
		console.profile();
	},
	profileEnd:function(){
		console.profileEnd();
	},
	groupEnd:function(){
		console.groupEnd();
	},
	groupEnd:function(){
		console.groupEnd();
	},
	
	
	timeLog:function(){
		console.timeLog();
	},
	timeStamp:function(){
		console.timeStamp();
	},
	
	
} 
module.exports = {
	mLog:mLog,
}