import Vue from 'vue';
import App from './popup/App.vue';
Vue.config.devtools = true;
new Vue({
    el: '#app',
    render: c => c(App)
});

//