import { createRouter, createWebHistory } from 'vue-router'
import token from '../api/Token.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/Register.vue')
    },
    {
      path: '/Admin/home',
      name: 'home',
      component: () => import('../views/system/Home.vue'),
      beforeEnter: (to, from, next) => {
        const tk = token()
        if (tk == null) {
          next('/login')
        } else if (tk.userLevel == 1) {
          next('/Buss/board')
        } else if (tk.userLevel == 2) {
          next()
        }
      },
      children: [
        {
          label: '数据仪表盘',
          title: '数据仪表盘',
          path: '/Admin/board',
          component: () => import("../views/system/children/Board.vue"),
        },
        {
          label: '商家管理',
          title: '商家管理',
          path: '/Admin/buss',
          component: () => import("../views/system/children/Buss.vue"),
        },
        {
          label: '商品管理',
          title: '商品管理',
          path: '/Admin/data',
          children: [
            {
              label: '商品管理',
              title: '商品管理',
              path: '/Admin/objectinfo',
              component: () => import("../views/system/children/Object/ObjectManager.vue")
            },
            {
              label: '商品分类',
              title: '商品分类',
              path: '/Admin/classinfo',
              component: () => import("../views/system/children/Object/ObjectClass.vue")
            },
          ],
        },
        {
          label: '用户管理',
          title: '用户管理',
          path: '/Admin/user',
          children: [
            {
              label: '用户管理',
              title: '用户管理',
              path: '/Admin/userinfo',
              component: () => import("../views/system/children/User/UserManager.vue")
            },
            {
              label: '权限管理',
              title: '权限管理',
              path: '/Admin/userlevel',
              component: () => import("../views/system/children/User/UserLevel.vue")
            },
            {
              label: '用户登录信息',
              title: '用户登录信息',
              path: '/Admin/userlogininfo',
              component: () => import("../views/system/children/User/UserLoginInfo.vue")
            },
            {
              label: '用户密码修改',
              title: '用户密码修改',
              path: '/Admin/userpass',
              component: () => import("../views/system/children/User/UserPass.vue")
            },
          ],
        },
        {
          label: '销售管理',
          title: '销售管理',
          path: '/Admin/sale',
          children: [
            {
              label: '订单管理',
              title: '订单管理',
              path: '/Admin/orderManager',
              component: () => import("../views/system/children/Sale/OrderManager.vue")
            },
            {
            label: '订单处理',
            title: '订单处理',
            path: '/Admin/orderDispose',
            component: () => import("../views/system/children/Sale/OrderDispose.vue")
            },
            {
              label: '购物车管理',
              title: '购物车管理',
              path: '/Admin/shopManager',
              component: () => import("../views/system/children/Sale/ShopManager.vue")
            },
          ]
        },
        {
          label: '系统管理',
          title: '系统管理',
          path: '/Admin/system',
          children: [
            {
              // label: '性能监控',
              title: '性能监控',
              path: '/Admin/monitor',
              component: () => import("../views/system/children/Monitor.vue")
            },
            {
              // label: '接口管理',
              title: '接口管理',
              path: '/Admin/interface',
              component: () => import("../views/system/children/Interface.vue"),
            },
            {
              // label: '服务管理',
              title: '服务管理',
              path: '/Admin/Server',
              component: () => import("../views/system/children/Server.vue"),
            }
          ],
        },
      ]
    },
    {
      path: '/Buss',
      name: 'Buss',
      component: () => import('../views/buss/Manager.vue'),
      beforeEnter: (to, from, next) => {
        const tk = token()
        if (tk == null) {
          next('/login')
        } else if (tk.userLevel == 1) {
          next()
        } else if (tk.userLevel == 2) {
          next('/Admin/board')
        } else if (tk.userLevel == null) {
          next('/login')
        }
      },
      children: [
        {
          label: '数据仪表盘',
          title: '数据仪表盘',
          path: '/Buss/board',
          name: 'BussBoard',
          component: () => import("../views/buss/children/Board.vue"),
        },
        {
          label: '商家中心',
          title: '商家中心',
          path: '/Buss',
          children: [
            {
              label: '商品管理',
              title: '商品管理',
              path: '/Buss/objManager',
              component: () => import("../views/buss/children/ObjectManager.vue"),
            },
            {
              label: '商品上架',
              title: '商品上架',
              path: '/Buss/ObjectInsert',
              component: () => import("../views/buss/children/ObjectInsert.vue"),
            },
            {
              label: '订单管理',
              title: '订单管理',
              name: 'BussOrderManager',
              path: '/Buss/orderManager',
              component: () => import("../views/buss/children/OrderManager.vue"),
            },
            {
              label: '订单处理',
              title: '订单处理',
              path: '/Buss/orderDispose',
              component: () => import("../views/buss/children/OrderDispose.vue"),
            }
          ]
        },
        {
          label: '商家信息',
          title: '商家信息',
          name: 'BussInfo',
          path: '/Buss/info',
          component: () => import("../views/buss/children/Info.vue"),
        },
        {
          label: '联系客服',
          title: '联系客服',
          name: 'BussSend',
          path: '/Buss/about',
          component: () => import("../views/buss/children/SendMess.vue"),
        },
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/detail.vue')
    },
    {
      path: '/User',
      name: '/User',
      beforeEnter: (to, from, next) => {
        const tk = token()
        if (tk.userLevel == 0) {
          next() 
        } else{
          next('/login')
        }
      },
      children: [
        {
          label: '我的购物车',
          title: '我的购物车',
          path: '/User/Shop',
          name: 'UserShop',
          component: () => import("../views/user/Shop.vue")
        },
        {
          label: '我的订单',
          title: '我的订单',
          path: '/User/Order',
          name: 'UserOrder',
          component: () => import("../views/user/Order.vue")
        },
        {
          title: '个人信息',
          path: '/User/Info',
          name: 'UserInfo',
          component: () => import("../views/user/Info.vue")
        },
        {
          label: '收件地址',
          title: '收件地址',
          path: '/User/Address',
          name: 'address',
          component: () => import("../views/user/Address.vue")
        },
      ]
    },
    {
      title: '商品列表',
      label: '商品列表',
      path: '/objectList',
      name: 'ObjectList',
      component: () => import('../views/ObjectList.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
    },
  ]
})

export default router
