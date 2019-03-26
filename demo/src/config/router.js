import Vue from 'vue';
import VueRouter from 'vue-router';
import navigation from './navigation';

// convert navigation to routes
const routes = navigation.reduce((routes, section) => {
  section.pages.forEach(page => {
    const name = page.name;
    routes.push({
      name,
      path: `/${name}`,
      component: page.component,
      meta: {
        title: page.title
      }
    });
  });
  return routes;
}, []);

// set up router
Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: 'cards'
    },
    ...routes
  ]
});
