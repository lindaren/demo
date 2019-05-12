import Vue from 'vue'
import router from './router'
import './app.js';
import '@/utils/request'
import store from '@/model/index'
import App from './App.vue'
import '@/utils/utils'
import '@/utils/filter'
import FastClick from 'fastclick';
import { install, setContext } from '@/raven.js'
FastClick.attach(document.getElementById('app'));
install();
Vue.config.productionTip = true
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    created() {
        this.$store.commit('cache/initCache')
    },
    components: {
        App
    }
})