import { createApp } from 'vue'
import {createPinia} from "pinia";
import Antd from 'ant-design-vue'
import App from './App.vue'
import "@/assets/reset.css"
import 'ant-design-vue/dist/antd.variable.min.css';
import router from "@/router/index.js";

const pinia = createPinia()


createApp(App).use(router).use(pinia).use(Antd).mount('#app')
