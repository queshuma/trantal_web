import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DatePicker } from 'ant-design-vue';

import App from './App.vue'
import router from './router/index'
import store from './store'
import 'ant-design-vue/dist/reset.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(DatePicker)
app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')
