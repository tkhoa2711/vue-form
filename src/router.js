import Vue from 'vue';
import Router from 'vue-router';
import Form1 from './components/Form1';
import Form2 from './components/Form2';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Form1,
    },
    {
      path: '/form2',
      component: Form2,
    },
  ]
});
