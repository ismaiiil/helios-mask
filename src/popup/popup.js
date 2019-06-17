import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

//var background = chrome.extension.getBackgroundPage(); 
//console.log(background.login("test","testpopup"))
//console.log(background.testvar("CALLED FROM POPUP.JS"));

// This is a global mixin, it is applied to every vue instance
Vue.mixin({
  data: function() {
    return {
      get background() {
        return chrome.extension.getBackgroundPage();;
      }
    }
  }
})

Vue.component('child', {
  template: "<div>In Child: {{background}}</div>"
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
