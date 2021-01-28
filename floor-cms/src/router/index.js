import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import("../components/user/login.vue"),
  },
  {
    path: '/',
    name: 'home',
    component: () => import("../components/home/home.vue"),
    children: [{
        path: '/index',
        name: "homeIndex",
        component: () => import("../components/home/index.vue")
      },
      {
        path: '/userManagement/averageUser',
        name: "averageUser",
        component: () => import("../components/userManagement/averageUser.vue")
      },
      {
        path: '/indexManagement/swiperManagement',
        name: "swiperManagement",
        component: () => import("../components/indexManagement/swiperManagement.vue")
      },
      {
        path: '/indexManagement/uploadSwiper',
        name: "uploadSwiper",
        component: () => import("../components/indexManagement/uploadSwiper.vue")
      },
      {
        path: '/information/informationList',
        name: "informationList",
        component: () => import("../components/information/informationList.vue")
      },
      {
        path: '/information/addInformation',
        name: "addInformation",
        component: () => import("../components/information/addInformation.vue")
      },
      {
        path: '/information/modifyContent/:id',
        name: "modifyContent",
        component: () => import("../components/information/modifyContent.vue")
      },
      {
        path: '/goodsManagement/goodsManagement',
        name: "goodsManagement",
        component: () => import("../components/goodsManagement/goodsManagement.vue")
      },
      {
        path: '/goodsManagement/modifyGoods/:id',
        name: "modifyGoods",
        component: () => import("../components/goodsManagement/modifyGoods.vue")
      },
      {
        path: '/goodsManagement/commentsManagement/:id',
        name: "commentsManagement",
        component: () => import("../components/goodsManagement/commentsManagement.vue")
      },
      {
        path: '/goodsManagement/addGoods',
        name: "addGoods",
        component: () => import("../components/goodsManagement/addGoods.vue")
      },
      {
        path: '/orderManagement',
        name: "orderManagement",
        component: () => import("../components/orderManagement/orderManagement.vue")
      },
      {
        path: '/orderManagement/orderReview',
        name: "orderReview",
        component: () => import("../components/orderManagement/orderReview.vue")
      },
      {
        path: '/report',
        name: "report",
        component: () => import("../components/report/report.vue")
      },

      
    ]
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  NProgress.start();
  if (to.name == 'login') {
    sessionStorage.removeItem('token');
    next()
  } else {
    if (token) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
})

router.afterEach(() => {  
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router