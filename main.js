import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'





// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

import ajax from './common/service.js'

const app = new Vue({
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import service from '@/common/service.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(service, app)

app.$mount()
