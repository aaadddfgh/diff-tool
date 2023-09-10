import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import VueI18n from "@/plugins/i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

createApp(App).provide('i18n',VueI18n).use(VueI18n).mount('#app')


