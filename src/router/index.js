import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateReport from '../views/CreateReport'
import Report from '../views/Report.vue'
import Reports from '../views/Reports'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/reports/api' },
  {
    path: '/reports/:type',
    name: 'ReportsList',
    component: Reports,
    beforeEnter: (to, _, next) => {
      if (!['api', 'local'].includes(to.params.type)) {
        next({ name: 'CreateReport' })
      }
      next()
    },
  },
  {
    path: '/reports/:type/:id',
    name: 'Report',
    component: Report,
  },
  {
    path: '/create',
    name: 'CreateReport',
    component: CreateReport,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
