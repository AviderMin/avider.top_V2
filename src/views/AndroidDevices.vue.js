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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { androidAPI } from '@/services/api';
var router = useRouter();
// 设备数据（从后端API动态获取）
var devices = ref([]);
// 数据加载状态
var isLoading = ref(true);
var errorMessage = ref('');
// 从后端API加载设备数据
var loadDevices = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                isLoading.value = true;
                errorMessage.value = '';
                return [4 /*yield*/, androidAPI.getAndroidData()
                    // 直接使用响应数据，因为axios拦截器已经返回了data
                ];
            case 1:
                response = _a.sent();
                // 直接使用响应数据，因为axios拦截器已经返回了data
                if (response && response.devices) {
                    devices.value = response.devices;
                }
                else {
                    throw new Error('设备数据格式错误');
                }
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                console.error('加载设备数据失败:', error_1);
                errorMessage.value = error_1.message || '加载设备数据失败，请检查后端服务是否正常运行';
                // 如果后端服务不可用，使用空数组
                devices.value = [];
                return [3 /*break*/, 4];
            case 3:
                isLoading.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 下载统计
var downloadStats = ref({});
// 计算属性
var totalDownloads = computed(function () {
    return Object.values(downloadStats.value).reduce(function (sum, count) { return sum + count; }, 0);
});
var totalFiles = computed(function () {
    return devices.value.reduce(function (sum, device) {
        return sum + device.kernels.length + device.recoveries.length;
    }, 0);
});
// 方法
var getDownloadCount = function (fileId) {
    return downloadStats.value[fileId] || 0;
};
// 跳转到资源详情页面
var goToResourceDetail = function (deviceId, resourceType, resourceId) {
    router.push("/android/".concat(deviceId, "/").concat(resourceType, "/").concat(resourceId));
};
// 获取设备图片路径
var getDeviceImage = function (device) {
    // 后端返回的路径是相对路径，直接使用即可
    // Vite会自动处理public目录下的静态资源
    if (device.image) {
        console.log('设备图片路径:', device.id);
        return device.image;
    }
    // 默认图片路径
    return "/images/android/devices/".concat(device.id, ".png");
};
// 处理图片加载错误
var handleImageError = function (event) {
    var img = event.target;
    // 设置默认图片
    img.src = '/images/android/default-device.png';
    console.warn("\u8BBE\u5907\u56FE\u7247\u52A0\u8F7D\u5931\u8D25: ".concat(img.alt));
};
// 组件挂载时加载数据
onMounted(function () { return __awaiter(void 0, void 0, void 0, function () {
    var stats, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadDevices()
                // 加载下载统计
            ];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, androidAPI.getDownloadStats()];
            case 3:
                stats = _a.sent();
                downloadStats.value = stats ? stats : {};
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error('加载下载统计失败:', error_2);
                downloadStats.value = {};
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['device-card']} */ ;
/** @type {__VLS_StyleScopedClasses['device-card']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kernel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['recovery-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['devices-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['device-card']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['device-content']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "android-page" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "page-title" }));
var __VLS_0 = {}.BotIcon;
/** @type {[typeof __VLS_components.BotIcon, ]} */ ;
// @ts-ignore
BotIcon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: "24",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        size: "24",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "page-description" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "devices-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "devices-grid" }));
var _loop_1 = function (device) {
    // @ts-ignore
    [devices,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (device.id) }, { class: "device-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "device-image-container" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign(__assign(__assign({ onError: (__VLS_ctx.handleImageError) }, { src: (__VLS_ctx.getDeviceImage(device)), alt: (device.name) }), { class: "device-image" }), { loading: "lazy" }));
    // @ts-ignore
    [handleImageError, getDeviceImage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "device-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "device-name" }));
    (device.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "device-codename" }));
    (device.id);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "device-description" }));
    (device.description);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-stats" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "stat-item" }));
    var __VLS_5 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ icon: "microchip" }, { class: "stat-icon" })));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ icon: "microchip" }, { class: "stat-icon" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
    (device.kernels.length);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "stat-item" }));
    var __VLS_10 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ icon: "tools" }, { class: "stat-icon" })));
    var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ icon: "tools" }, { class: "stat-icon" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
    (device.recoveries.length);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "resource-buttons" }));
    var _loop_2 = function (kernel) {
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.goToResourceDetail(device.id, 'kernel', kernel.id);
                // @ts-ignore
                [goToResourceDetail,];
            } }, { key: (kernel.id) }), { class: "resource-btn kernel-btn" }));
        (kernel.version);
    };
    for (var _b = 0, _c = __VLS_getVForSourceType((device.kernels)); _b < _c.length; _b++) {
        var kernel = _c[_b][0];
        _loop_2(kernel);
    }
    var _loop_3 = function (recovery) {
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.goToResourceDetail(device.id, 'recovery', recovery.id);
                // @ts-ignore
                [goToResourceDetail,];
            } }, { key: (recovery.id) }), { class: "resource-btn recovery-btn" }));
        (recovery.version);
    };
    for (var _d = 0, _e = __VLS_getVForSourceType((device.recoveries)); _d < _e.length; _d++) {
        var recovery = _e[_d][0];
        _loop_3(recovery);
    }
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.devices)); _i < _a.length; _i++) {
    var device = _a[_i][0];
    _loop_1(device);
}
/** @type {__VLS_StyleScopedClasses['android-page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['page-description']} */ ;
/** @type {__VLS_StyleScopedClasses['devices-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['devices-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['device-card']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image']} */ ;
/** @type {__VLS_StyleScopedClasses['device-content']} */ ;
/** @type {__VLS_StyleScopedClasses['device-name']} */ ;
/** @type {__VLS_StyleScopedClasses['device-codename']} */ ;
/** @type {__VLS_StyleScopedClasses['device-description']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-item']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-item']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kernel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['resource-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['recovery-btn']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
