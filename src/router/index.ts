import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
const HomePage = () => import('@/views/HomePage.vue')
const AndroidDevices = () => import('@/views/AndroidDevices.vue')
const AndroidDeviceDetail = () => import('@/views/AndroidDeviceDetail.vue')
const PCBuild = () => import('@/views/PCBuild.vue')
const MusicPlayer = () => import('@/views/MusicPlayer.vue')
const ToolBox = () => import('@/views/ToolBox.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: '首页 - Avider.top'
      }
    },
    {
      path: '/android',
      name: 'Android',
      component: AndroidDevices,
      meta: {
        title: '安卓刷机 - Avider.top'
      }
    },
    {
      path: '/android/:id',
      name: 'AndroidDeviceDetail',
      component: AndroidDeviceDetail,
      meta: {
        title: '设备详情 - Avider.top'
      }
    },
    {
      path: '/android/:deviceId/:resourceType/:resourceId',
      name: 'AndroidResourceDetail',
      component: AndroidDeviceDetail,
      meta: {
        title: '资源详情 - Avider.top'
      }
    },
    {
      path: '/pc',
      name: 'PC',
      component: PCBuild,
      meta: {
        title: '电脑装机 - Avider.top'
      }
    },
    {
      path: '/music',
      name: 'Music',
      component: MusicPlayer,
      meta: {
        title: '音乐播放器 - Avider.top'
      }
    },
    {
      path: '/tools',
      name: 'Tools',
      component: ToolBox,
      meta: {
        title: '工具箱 - Avider.top'
      }
    }
  ],
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
