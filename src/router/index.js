import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/Layout/index";

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/auth',
    component: () => import('@/views/Login/index'),
    redirect: '/auth/login',
    meta: { title: 'Auth' },
    children: [
      {
        path: 'login',
        component: () => import('@/views/Login/components/login'),
        meta: { title: 'Login' }
      },
      {
        path: 'register',
        component: () => import('@/views/Login/components/register'),
        meta: { title: 'Register' }
      }
    ]

  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/Home/index'),
        meta: { title: 'Home'}
      }
    ]
  },
  {
    path: '/simpleTrade',
    component: Layout,
    redirect: '/simpleTrade/trade',
    name: 'SimpleTrade',
    children: [
      {
        path: '/simpleTrade/trade',
        component: ()=> import('@/views/SimpleTrade/index'),
        redirect: '/simpleTrade/trade/express',
        children: [
          {
            path: 'express',
            component: () => import('@/views/SimpleTrade/components/express/index'),
            name: 'Express',
            redirect: '/simpleTrade/trade/express/buy',
            meta: { title: 'SimpleTrade' },
            children: [
              {
                path: 'buy',
                component: ()=> import('@/views/SimpleTrade/components/express/components/buy'),
                name: 'buy',
                meta: {activateName: 'express'}
              },
              {
                path: 'sell',
                component: ()=> import('@/views/SimpleTrade/components/express/components/sell'),
                name: 'sell',
                meta: {activateName: 'express'}
              }
            ]
          },
          {
            path: 'p2p',
            component: () => import('@/views/SimpleTrade/components/p2p/index'),
            name: 'P2P',
            meta: { title: 'SimpleTrade', activateName: 'p2p'}
          }
        ]
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/index',
    name: 'Market',
    children: [
      {
        path: 'index',
        component: () => import('@/views/Market/index'),
        meta: { title: 'Market' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/UserAccount/overview'),
        meta: { title: 'Account' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/UserAccount/order'),
        meta: { title: 'Order' }
      },
      {
        path: 'wallet',
        name: 'Wallet',
        component: () => import('@/views/UserAccount/wallet'),
        meta: { title: 'Wallet' }
      },
      {
        path: 'logout',
        name: 'Logout',
        redirect: '/'
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}



export default router
