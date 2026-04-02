/// <reference types="D:/Projects/Vue/avider.top_V2/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { androidAPI } from '@/services/api';
var route = useRoute();
var router = useRouter();
// 设备数据
var device = ref(null);
var tutorial = ref(null);
// 下载统计
var downloadStats = ref({});
// 当前显示的资源
var currentResource = ref(null);
var resourceType = ref('');
// 获取路由参数
var deviceId = computed(function () { return route.params.id || route.params.deviceId; });
var routeResourceType = computed(function () { return route.params.resourceType; });
var routeResourceId = computed(function () { return route.params.resourceId; });
// 判断是否为资源详情页面
var isResourceDetailPage = computed(function () {
    return routeResourceType.value && routeResourceId.value;
});
// 获取分区类型
var getPartitionType = function () {
    if (deviceId.value === 'marble') {
        return 'vab_rec';
    }
    return 'vab';
};
// 获取设备图片路径
var getDeviceImage = function (device) {
    if (device === null || device === void 0 ? void 0 : device.image) {
        return device.image;
    }
    return "/images/android/devices/".concat(deviceId.value, ".png");
};
// 处理图片加载错误
var handleImageError = function (event) {
    var img = event.target;
    img.src = '/images/android/default-device.png';
};
// 获取下载次数
var getDownloadCount = function (resourceId) {
    return downloadStats.value[resourceId] || 0;
};
// 处理changelog数据，支持数组和字符串格式
var getChangelogArray = function (changelog) {
    if (Array.isArray(changelog)) {
        return changelog;
    }
    if (typeof changelog === 'string') {
        // 如果是字符串，尝试按换行符分割
        return changelog.split('\n').filter(function (item) { return item.trim() !== ''; });
    }
    return [];
};
// 处理下载
var handleDownload = function (downloadUrl, fileId) { return __awaiter(void 0, void 0, void 0, function () {
    var link, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // 记录下载统计
                return [4 /*yield*/, androidAPI.recordDownload(fileId)
                    // 更新本地下载统计
                ];
            case 1:
                // 记录下载统计
                _a.sent();
                // 更新本地下载统计
                downloadStats.value[fileId] = (downloadStats.value[fileId] || 0) + 1;
                link = document.createElement('a');
                link.href = downloadUrl;
                link.download = downloadUrl.split('/').pop() || 'download';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('下载失败:', error_1);
                // 如果API调用失败，只更新本地统计
                downloadStats.value[fileId] = (downloadStats.value[fileId] || 0) + 1;
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// 返回设备列表
var goBack = function () {
    router.push('/android');
};
// 加载设备数据
var loadDeviceData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, devices, tutorialsResponse, tutorials, stats, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, androidAPI.getAndroidData()];
            case 1:
                response = _a.sent();
                if (!(response && response.devices)) return [3 /*break*/, 4];
                devices = response.devices;
                device.value = devices.find(function (d) { return d.id === deviceId.value; });
                if (!device.value) {
                    console.error('设备未找到:', deviceId.value);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, androidAPI.getTutorials()];
            case 2:
                tutorialsResponse = _a.sent();
                if (tutorialsResponse && tutorialsResponse.tutorials) {
                    tutorials = tutorialsResponse.tutorials;
                    tutorial.value = tutorials.find(function (t) { return t.deviceId === deviceId.value; });
                }
                return [4 /*yield*/, androidAPI.getDownloadStats()];
            case 3:
                stats = _a.sent();
                downloadStats.value = stats ? stats : {};
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('加载设备数据失败:', error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// 监听路由参数变化，设置当前资源
watch([routeResourceType, routeResourceId, device], function (_a) {
    var _b, _c;
    var type = _a[0], id = _a[1], deviceData = _a[2];
    if (type && id && deviceData) {
        resourceType.value = type;
        // 根据资源类型查找对应的资源
        if (type === 'kernel') {
            currentResource.value = (_b = deviceData.kernels) === null || _b === void 0 ? void 0 : _b.find(function (k) { return k.id === id; });
        }
        else if (type === 'recovery') {
            currentResource.value = (_c = deviceData.recoveries) === null || _c === void 0 ? void 0 : _c.find(function (r) { return r.id === id; });
        }
    }
    else {
        currentResource.value = null;
    }
}, { immediate: true });
// 组件挂载时加载数据
onMounted(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadDeviceData()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['back-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['back-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-item']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-description']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-description']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-section']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-list']} */ ;
/** @type {__VLS_StyleScopedClasses['download-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['download-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['download-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-info']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-name']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-info']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-info']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-description']} */ ;
/** @type {__VLS_StyleScopedClasses['requirements']} */ ;
/** @type {__VLS_StyleScopedClasses['requirements-list']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['video-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image-section']} */ ;
/** @type {__VLS_StyleScopedClasses['device-info-section']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-section']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-item']} */ ;
/** @type {__VLS_StyleScopedClasses['download-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-header']} */ ;
/** @type {__VLS_StyleScopedClasses['step-header']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "device-detail-page" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.goBack) }, { class: "back-btn" }));
// @ts-ignore
[goBack,];
var __VLS_0 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: "arrow-left",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        icon: "arrow-left",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "page-title" }));
((_a = __VLS_ctx.device) === null || _a === void 0 ? void 0 : _a.name);
// @ts-ignore
[device,];
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "page-subtitle" }));
((_b = __VLS_ctx.device) === null || _b === void 0 ? void 0 : _b.codename);
// @ts-ignore
[device,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "main-content" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "content-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "left-panel" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "device-image-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign(__assign(__assign({ onError: (__VLS_ctx.handleImageError) }, { src: (__VLS_ctx.getDeviceImage(__VLS_ctx.device)), alt: ((_c = __VLS_ctx.device) === null || _c === void 0 ? void 0 : _c.name) }), { class: "device-image" }), { loading: "lazy" }));
// @ts-ignore
[device, device, handleImageError, getDeviceImage,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "device-info-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "info-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-value" }));
((_d = __VLS_ctx.device) === null || _d === void 0 ? void 0 : _d.brand);
// @ts-ignore
[device,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-value" }));
((_e = __VLS_ctx.device) === null || _e === void 0 ? void 0 : _e.model);
// @ts-ignore
[device,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-value" }));
((_f = __VLS_ctx.device) === null || _f === void 0 ? void 0 : _f.processor);
// @ts-ignore
[device,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "info-value" }));
(__VLS_ctx.getPartitionType());
// @ts-ignore
[getPartitionType,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "device-description" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)(__assign({ class: "description-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "description-text" }));
((_g = __VLS_ctx.device) === null || _g === void 0 ? void 0 : _g.description);
// @ts-ignore
[device,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "right-panel" }));
if (__VLS_ctx.isResourceDetailPage) {
    // @ts-ignore
    [isResourceDetailPage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-detail-section" }));
    if (__VLS_ctx.currentResource) {
        // @ts-ignore
        [currentResource,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-detail" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "section-title" }));
        (__VLS_ctx.resourceType === 'kernel' ? '内核文件' : '橙狐Recovery');
        // @ts-ignore
        [resourceType,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-detail-content" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-header" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)(__assign({ class: "resource-name" }));
        (__VLS_ctx.resourceType === 'kernel' ? __VLS_ctx.currentResource.version : __VLS_ctx.currentResource.name + ' ' + __VLS_ctx.currentResource.version);
        // @ts-ignore
        [currentResource, currentResource, currentResource, resourceType,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-meta" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "resource-date" }));
        (__VLS_ctx.currentResource.date);
        // @ts-ignore
        [currentResource,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "resource-size" }));
        (__VLS_ctx.currentResource.size);
        (__VLS_ctx.currentResource.sizeUnit ? '' : 'MB');
        // @ts-ignore
        [currentResource, currentResource,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-description" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (__VLS_ctx.currentResource.description);
        // @ts-ignore
        [currentResource,];
        if (__VLS_ctx.currentResource.changelog && __VLS_ctx.currentResource.changelog.length > 0) {
            // @ts-ignore
            [currentResource, currentResource,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "changelog-section" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
            __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)(__assign({ class: "changelog-list" }));
            for (var _i = 0, _k = __VLS_getVForSourceType((__VLS_ctx.getChangelogArray(__VLS_ctx.currentResource.changelog))); _i < _k.length; _i++) {
                var _l = _k[_i], log = _l[0], index = _l[1];
                // @ts-ignore
                [currentResource, getChangelogArray,];
                __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ key: (index) }, { style: {} }));
                (log);
            }
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "download-section" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.isResourceDetailPage))
                    return;
                if (!(__VLS_ctx.currentResource))
                    return;
                __VLS_ctx.handleDownload(__VLS_ctx.currentResource.downloadUrl, __VLS_ctx.currentResource.id);
                // @ts-ignore
                [currentResource, currentResource, handleDownload,];
            } }, { class: "download-btn primary" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "download-count" }));
        (__VLS_ctx.getDownloadCount(__VLS_ctx.currentResource.id));
        // @ts-ignore
        [currentResource, getDownloadCount,];
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "no-resource" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-section" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "section-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-list" }));
    if (((_h = __VLS_ctx.device) === null || _h === void 0 ? void 0 : _h.kernels) && __VLS_ctx.device.kernels.length > 0) {
        // @ts-ignore
        [device, device,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        var _loop_1 = function (kernel) {
            // @ts-ignore
            [device,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (kernel.id) }, { class: "resource-item" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-info" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)(__assign({ class: "resource-name" }));
            (kernel.version);
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "resource-meta" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "resource-date" }));
            (kernel.date);
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "resource-size" }));
            (kernel.size);
            (kernel.sizeUnit || 'MB');
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "resource-description" }));
            (kernel.description);
            if (kernel.changelog) {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "changelog" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.h5, __VLS_intrinsics.h5)(__assign({ class: "changelog-title" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)(__assign({ class: "changelog-list" }));
                for (var _w = 0, _x = __VLS_getVForSourceType((__VLS_ctx.getChangelogArray(kernel.changelog))); _w < _x.length; _w++) {
                    var _y = _x[_w], log = _y[0], index = _y[1];
                    // @ts-ignore
                    [getChangelogArray,];
                    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                        key: (index),
                    });
                    (log);
                }
            }
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "download-section" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
                    var _a;
                    var _b = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _b[_i] = arguments[_i];
                    }
                    var $event = _b[0];
                    if (!!(__VLS_ctx.isResourceDetailPage))
                        return;
                    if (!(((_a = __VLS_ctx.device) === null || _a === void 0 ? void 0 : _a.kernels) && __VLS_ctx.device.kernels.length > 0))
                        return;
                    __VLS_ctx.handleDownload(kernel.downloadUrl, kernel.id);
                    // @ts-ignore
                    [handleDownload,];
                } }, { class: "download-btn" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "download-count" }));
            (__VLS_ctx.getDownloadCount(kernel.id));
            // @ts-ignore
            [getDownloadCount,];
        };
        for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.device.kernels)); _m < _o.length; _m++) {
            var kernel = _o[_m][0];
            _loop_1(kernel);
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "no-resource" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-section" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "section-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-list" }));
    if (((_j = __VLS_ctx.device) === null || _j === void 0 ? void 0 : _j.recoveries) && __VLS_ctx.device.recoveries.length > 0) {
        // @ts-ignore
        [device, device,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        var _loop_2 = function (recovery) {
            // @ts-ignore
            [device,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (recovery.id) }, { class: "resource-item" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-info" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)(__assign({ class: "resource-name" }));
            (recovery.name);
            (recovery.version);
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "resource-meta" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "resource-date" }));
            (recovery.date);
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "resource-size" }));
            (recovery.size);
            (recovery.sizeUnit || 'MB');
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "resource-description" }));
            (recovery.description);
            if (recovery.changelog) {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "changelog" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.h5, __VLS_intrinsics.h5)(__assign({ class: "changelog-title" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)(__assign({ class: "changelog-list" }));
                for (var _z = 0, _0 = __VLS_getVForSourceType((__VLS_ctx.getChangelogArray(recovery.changelog))); _z < _0.length; _z++) {
                    var _1 = _0[_z], log = _1[0], index = _1[1];
                    // @ts-ignore
                    [getChangelogArray,];
                    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                        key: (index),
                    });
                    (log);
                }
            }
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "download-section" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
                    var _a;
                    var _b = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _b[_i] = arguments[_i];
                    }
                    var $event = _b[0];
                    if (!!(__VLS_ctx.isResourceDetailPage))
                        return;
                    if (!(((_a = __VLS_ctx.device) === null || _a === void 0 ? void 0 : _a.recoveries) && __VLS_ctx.device.recoveries.length > 0))
                        return;
                    __VLS_ctx.handleDownload(recovery.downloadUrl, recovery.id);
                    // @ts-ignore
                    [handleDownload,];
                } }, { class: "download-btn" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "download-count" }));
            (__VLS_ctx.getDownloadCount(recovery.id));
            // @ts-ignore
            [getDownloadCount,];
        };
        for (var _p = 0, _q = __VLS_getVForSourceType((__VLS_ctx.device.recoveries)); _p < _q.length; _p++) {
            var recovery = _q[_p][0];
            _loop_2(recovery);
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "no-resource" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tutorial-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tutorial-content" }));
if (__VLS_ctx.tutorial) {
    // @ts-ignore
    [tutorial,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tutorial-detail" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tutorial-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)(__assign({ class: "tutorial-title" }));
    (__VLS_ctx.tutorial.title);
    // @ts-ignore
    [tutorial,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tutorial-meta" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "difficulty" }));
    (__VLS_ctx.tutorial.difficulty);
    // @ts-ignore
    [tutorial,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "duration" }));
    (__VLS_ctx.tutorial.duration);
    // @ts-ignore
    [tutorial,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "requirements" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)(__assign({ class: "requirements-list" }));
    for (var _r = 0, _s = __VLS_getVForSourceType((__VLS_ctx.tutorial.requirements)); _r < _s.length; _r++) {
        var _t = _s[_r], req = _t[0], index = _t[1];
        // @ts-ignore
        [tutorial,];
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (index),
        });
        (req);
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tutorial-steps" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({});
    for (var _u = 0, _v = __VLS_getVForSourceType((__VLS_ctx.tutorial.steps)); _u < _v.length; _u++) {
        var step = _v[_u][0];
        // @ts-ignore
        [tutorial,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (step.step) }, { class: "step-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "step-header" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "step-number" }));
        (step.step);
        __VLS_asFunctionalElement(__VLS_intrinsics.h6, __VLS_intrinsics.h6)(__assign({ class: "step-title" }));
        (step.title);
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "step-content" }));
        (step.content);
        if (step.warning) {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "step-warning" }));
            var __VLS_5 = {}.FontAwesomeIcon;
            /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
            // @ts-ignore
            FontAwesomeIcon;
            // @ts-ignore
            var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
                icon: "exclamation-triangle",
            }));
            var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
                    icon: "exclamation-triangle",
                }], __VLS_functionalComponentArgsRest(__VLS_6), false));
            (step.warning);
        }
        if (step.note) {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "step-note" }));
            var __VLS_10 = {}.FontAwesomeIcon;
            /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
            // @ts-ignore
            FontAwesomeIcon;
            // @ts-ignore
            var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
                icon: "info-circle",
            }));
            var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
                    icon: "info-circle",
                }], __VLS_functionalComponentArgsRest(__VLS_11), false));
            (step.note);
        }
        if (step.partition) {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "step-partition" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
            (step.partition);
        }
    }
    if (__VLS_ctx.tutorial.videoUrl) {
        // @ts-ignore
        [tutorial,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "video-link" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)(__assign({ href: (__VLS_ctx.tutorial.videoUrl), target: "_blank" }, { class: "video-btn" }));
        // @ts-ignore
        [tutorial,];
        var __VLS_15 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            icon: "play-circle",
        }));
        var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
                icon: "play-circle",
            }], __VLS_functionalComponentArgsRest(__VLS_16), false));
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "no-tutorial" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
/** @type {__VLS_StyleScopedClasses['device-detail-page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['back-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['page-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['left-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image-section']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image']} */ ;
/** @type {__VLS_StyleScopedClasses['device-info-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['device-description']} */ ;
/** @type {__VLS_StyleScopedClasses['description-title']} */ ;
/** @type {__VLS_StyleScopedClasses['description-text']} */ ;
/** @type {__VLS_StyleScopedClasses['right-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-detail-section']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-detail-content']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-header']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-name']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-date']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-size']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-description']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-section']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-list']} */ ;
/** @type {__VLS_StyleScopedClasses['download-section']} */ ;
/** @type {__VLS_StyleScopedClasses['download-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['download-count']} */ ;
/** @type {__VLS_StyleScopedClasses['no-resource']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-list']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-item']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-info']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-name']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-date']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-size']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-description']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-title']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-list']} */ ;
/** @type {__VLS_StyleScopedClasses['download-section']} */ ;
/** @type {__VLS_StyleScopedClasses['download-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['download-count']} */ ;
/** @type {__VLS_StyleScopedClasses['no-resource']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-list']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-item']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-info']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-name']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-date']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-size']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-description']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-title']} */ ;
/** @type {__VLS_StyleScopedClasses['changelog-list']} */ ;
/** @type {__VLS_StyleScopedClasses['download-section']} */ ;
/** @type {__VLS_StyleScopedClasses['download-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['download-count']} */ ;
/** @type {__VLS_StyleScopedClasses['no-resource']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['duration']} */ ;
/** @type {__VLS_StyleScopedClasses['requirements']} */ ;
/** @type {__VLS_StyleScopedClasses['requirements-list']} */ ;
/** @type {__VLS_StyleScopedClasses['tutorial-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step-item']} */ ;
/** @type {__VLS_StyleScopedClasses['step-header']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['step-note']} */ ;
/** @type {__VLS_StyleScopedClasses['step-partition']} */ ;
/** @type {__VLS_StyleScopedClasses['video-link']} */ ;
/** @type {__VLS_StyleScopedClasses['video-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['no-tutorial']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
