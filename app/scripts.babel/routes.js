import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from './popup/Login.vue'
import LocalKeyComponent from './popup/LocalKey.vue'
import SecureComponent from './popup/Secure.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'login'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginComponent
        },
        {
            path: '/local',
            name: 'local',
            component: LocalKeyComponent
        },
        {
            path: '/secure',
            name: 'secure',
            component: SecureComponent
        }
    ]
})