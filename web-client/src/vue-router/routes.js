import Main from '@/vue/pages/Main';
import About from '@/vue/pages/About';
import FAQ from '@/vue/pages/FAQ';
import NotFound from '@/vue/pages/NotFound';

export default [
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/faq',
    name: 'Faq',
    component: FAQ
  },
  {
    path: '/etherscan',
    beforeEnter() {
      location.href =
        'https://kovan.etherscan.io/address/0xEf9819Fb7AAE67Fe44a00ACb816c85a5ac339760';
    }
  }
];
