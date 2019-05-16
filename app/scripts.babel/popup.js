import Vue from 'vue';
import App from './popup/App.vue';
import VueRouter from 'vue-router'
import routes from './routes';
Vue.use(VueRouter)
Vue.config.devtools = true;


new Vue({
    el: '#app',
    router: routes,
    render: h => h(App)
});
