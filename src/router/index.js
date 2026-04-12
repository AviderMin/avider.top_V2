import { createRouter, createWebHistory } from 'vue-router';
// 导入页面组件
var HomePage = function () { return import('@/views/HomePage.vue'); };
var AndroidDevices = function () { return import('@/views/AndroidDevices.vue'); };
var AndroidDeviceDetail = function () { return import('@/views/AndroidDeviceDetail.vue'); };
var PCBuild = function () { return import('@/views/PCBuild.vue'); };
var ToolBox = function () { return import('@/views/ToolBox.vue'); };
var router = createRouter({
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
            path: '/tools',
            name: 'Tools',
            component: ToolBox,
            meta: {
                title: '工具箱 - Avider.top'
            }
        }
    ],
});
// 路由守卫 - 更新页面标题
router.beforeEach(function (to, from, next) {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default router;
