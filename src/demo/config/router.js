import Vue from 'vue'
import VueRouter from 'vue-router'
import pages from './pages'
import navigation from './navigation'

// convert navigation to routes
const routes = navigation.reduce((routes, section) => {
  section.pages.forEach(page => {
    const name = page.name
    routes.push({
      name,
      path: `/${name}`,
      component: pages[name],
      meta: {
        title: page.title,
        url: page.url,
      }
    })
  })
  return routes
}, [])

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: 'cards'
    },
    ...routes
  ]
})
