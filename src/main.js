import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router'

import {createPinia} from 'pinia'

import { createPersistedState } from 'pinia-persistedstate-plugin'

import locale from 'element-plus/dist/locale/zh-cn.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist);
const app = createApp(App);
app.use(ElementPlus, {locale});
app.use(router);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app');
//createApp(App).mount('#app')

