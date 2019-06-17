//import PageIndex from './pages/Index';
import LoginComponent from './pages/Login'
import LocalKeyComponent from './pages/LocalKey'
import SecureComponent from './pages/Secure'

export default [
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
];
