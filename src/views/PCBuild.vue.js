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
var _a, _b;
import { ref, onMounted } from 'vue';
import { pcAPI } from '@/services/api';
import { Cpu, HardDrive, Monitor as Display, Zap } from 'lucide-vue-next';
// 配置数据
var configurations = ref([]);
// 排行榜数据
var rankings = ref({});
// 状态管理
var selectedConfig = ref(null);
var compareConfig1 = ref('');
var compareConfig2 = ref('');
var showComparison = ref(false);
var isLoading = ref(true);
// 方法
var selectConfig = function (configId) {
    selectedConfig.value = configId;
};
var getSelectedConfig = function () {
    return configurations.value.find(function (config) { return config.id === selectedConfig.value; });
};
var getConfigById = function (id) {
    return configurations.value.find(function (config) { return config.id === id; });
};
// 获取硬件图标
var getComponentIcon = function (type) {
    var iconMap = {
        'CPU': Cpu,
        '显卡': Zap,
        '内存': HardDrive,
        '硬盘': HardDrive,
        '主板': HardDrive, // 使用硬盘图标代替主板图标
        '显示器': Display,
        '电源': Zap,
        '机箱': HardDrive,
        '散热器': Cpu,
        '风扇': Zap
    };
    return iconMap[type] || Cpu;
};
// 获取硬件图标类名（基于WindowsDevices.vue的实现风格）
var getComponentIconClass = function (componentName) {
    // 根据组件类型返回对应的Tailwind CSS类名
    var classMap = {
        CPU: 'w-4 h-4 text-blue-500',
        主板: 'w-4 h-4 text-green-500',
        内存: 'w-4 h-4 text-purple-500',
        显卡: 'w-4 h-4 text-red-500',
        硬盘: 'w-4 h-4 text-yellow-500',
        电源: 'w-4 h-4 text-orange-500',
        机箱: 'w-4 h-4 text-gray-500',
        显示器: 'w-4 h-4 text-indigo-500',
        散热器: 'w-4 h-4 text-cyan-500',
        风扇: 'w-4 h-4 text-teal-500',
    };
    return classMap[componentName] || 'w-4 h-4 text-gray-500';
};
// 加载电脑装机数据
var loadPCData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                isLoading.value = true;
                return [4 /*yield*/, pcAPI.getPCData()
                    // 更新数据
                ];
            case 1:
                response = _a.sent();
                // 更新数据
                if (response) {
                    if (response.configurations) {
                        configurations.value = response.configurations;
                    }
                    if (response.rankings) {
                        rankings.value = response.rankings;
                    }
                }
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                console.error('加载电脑装机数据失败:', error_1);
                // 清空数据，显示空状态或错误提示
                configurations.value = [];
                rankings.value = {};
                return [3 /*break*/, 4];
            case 3:
                isLoading.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
onMounted(function () {
    loadPCData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['config-card']} */ ;
/** @type {__VLS_StyleScopedClasses['config-card']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['component-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['configs-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['rankings-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-header']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-info']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['compare-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['compare-select']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-grid']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "pc-page" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "page-title" }));
var __VLS_0 = {}.MonitorIcon;
/** @type {[typeof __VLS_components.MonitorIcon, ]} */ ;
// @ts-ignore
MonitorIcon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ size: (24) }, { class: "title-icon" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ size: (24) }, { class: "title-icon" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "page-description" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "configs-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "configs-grid" }));
var _loop_1 = function (config) {
    // @ts-ignore
    [configurations,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.selectConfig(config.id);
            // @ts-ignore
            [selectConfig,];
        } }, { key: (config.id) }), { class: "config-card" }), { class: ({ active: __VLS_ctx.selectedConfig === config.id }) }));
    // @ts-ignore
    [selectedConfig,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "config-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "config-name" }));
    (config.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "config-category" }));
    (config.category);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "config-performance" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "performance-bar" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "performance-fill" }, { style: ({ width: config.performance + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "performance-text" }));
    (config.performance);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "config-description" }));
    (config.description);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "config-components" }));
    for (var _t = 0, _u = __VLS_getVForSourceType((config.components)); _t < _u.length; _t++) {
        var component = _u[_t][0];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (component.type) }, { class: "component-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "component-icon" }));
        var __VLS_5 = ((__VLS_ctx.getComponentIcon(component.type)));
        // @ts-ignore
        var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            size: (16),
        }));
        var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
                size: (16),
            }], __VLS_functionalComponentArgsRest(__VLS_6), false));
        // @ts-ignore
        [getComponentIcon,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "component-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "component-name" }));
        (component.type);
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "component-model" }));
        (component.model);
    }
};
for (var _i = 0, _c = __VLS_getVForSourceType((__VLS_ctx.configurations)); _i < _c.length; _i++) {
    var config = _c[_i][0];
    _loop_1(config);
}
if (__VLS_ctx.selectedConfig) {
    // @ts-ignore
    [selectedConfig,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "config-detail-panel" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "detail-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    ((_a = __VLS_ctx.getSelectedConfig()) === null || _a === void 0 ? void 0 : _a.name);
    // @ts-ignore
    [getSelectedConfig,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.selectedConfig))
                return;
            __VLS_ctx.selectedConfig = null;
            // @ts-ignore
            [selectedConfig,];
        } }, { class: "close-btn" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "detail-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "components-list" }));
    for (var _d = 0, _e = __VLS_getVForSourceType(((_b = __VLS_ctx.getSelectedConfig()) === null || _b === void 0 ? void 0 : _b.components)); _d < _e.length; _d++) {
        var component = _e[_d][0];
        // @ts-ignore
        [getSelectedConfig,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (component.type) }, { class: "component-detail" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "component-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "component-name" }));
        (component.type);
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "component-model" }));
        (component.model);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "rankings-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "rankings-grid" }));
if (__VLS_ctx.rankings['intel-cpu'] && __VLS_ctx.rankings['intel-cpu'].length > 0) {
    // @ts-ignore
    [rankings, rankings,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-icon" }));
    var __VLS_10 = {}.Cpu;
    /** @type {[typeof __VLS_components.Cpu, ]} */ ;
    // @ts-ignore
    Cpu;
    // @ts-ignore
    var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        size: (24),
    }));
    var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
            size: (24),
        }], __VLS_functionalComponentArgsRest(__VLS_11), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "ranking-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-content" }));
    for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.rankings['intel-cpu'])); _f < _g.length; _f++) {
        var _h = _g[_f], ranking = _h[0], index = _h[1];
        // @ts-ignore
        [rankings,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (ranking.model) }, { class: "ranking-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-rank" }));
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-model" }));
        (ranking.model);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar-container" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-fill" }, { style: ({ width: ranking.score + '%' }) }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "score-value" }));
        (ranking.score);
    }
}
if (__VLS_ctx.rankings['amd-cpu'] && __VLS_ctx.rankings['amd-cpu'].length > 0) {
    // @ts-ignore
    [rankings, rankings,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-icon" }));
    var __VLS_15 = {}.Cpu;
    /** @type {[typeof __VLS_components.Cpu, ]} */ ;
    // @ts-ignore
    Cpu;
    // @ts-ignore
    var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        size: (24),
    }));
    var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
            size: (24),
        }], __VLS_functionalComponentArgsRest(__VLS_16), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "ranking-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-content" }));
    for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.rankings['amd-cpu'])); _j < _k.length; _j++) {
        var _l = _k[_j], ranking = _l[0], index = _l[1];
        // @ts-ignore
        [rankings,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (ranking.model) }, { class: "ranking-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-rank" }));
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-model" }));
        (ranking.model);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar-container" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-fill" }, { style: ({ width: ranking.score + '%' }) }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "score-value" }));
        (ranking.score);
    }
}
if (__VLS_ctx.rankings['nvidia-gpu'] && __VLS_ctx.rankings['nvidia-gpu'].length > 0) {
    // @ts-ignore
    [rankings, rankings,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-icon" }));
    var __VLS_20 = {}.MonitorIcon;
    /** @type {[typeof __VLS_components.MonitorIcon, ]} */ ;
    // @ts-ignore
    MonitorIcon;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        size: (24),
    }));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
            size: (24),
        }], __VLS_functionalComponentArgsRest(__VLS_21), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "ranking-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-content" }));
    for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.rankings['nvidia-gpu'])); _m < _o.length; _m++) {
        var _p = _o[_m], ranking = _p[0], index = _p[1];
        // @ts-ignore
        [rankings,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (ranking.model) }, { class: "ranking-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-rank" }));
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-model" }));
        (ranking.model);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar-container" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-fill" }, { style: ({ width: ranking.score + '%' }) }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "score-value" }));
        (ranking.score);
    }
}
if (__VLS_ctx.rankings['amd-gpu'] && __VLS_ctx.rankings['amd-gpu'].length > 0) {
    // @ts-ignore
    [rankings, rankings,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-icon" }));
    var __VLS_25 = {}.MonitorIcon;
    /** @type {[typeof __VLS_components.MonitorIcon, ]} */ ;
    // @ts-ignore
    MonitorIcon;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        size: (24),
    }));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
            size: (24),
        }], __VLS_functionalComponentArgsRest(__VLS_26), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "ranking-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-content" }));
    for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.rankings['amd-gpu'])); _q < _r.length; _q++) {
        var _s = _r[_q], ranking = _s[0], index = _s[1];
        // @ts-ignore
        [rankings,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (ranking.model) }, { class: "ranking-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-rank" }));
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ranking-model" }));
        (ranking.model);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar-container" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-bar" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "score-fill" }, { style: ({ width: ranking.score + '%' }) }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "score-value" }));
        (ranking.score);
    }
}
/** @type {__VLS_StyleScopedClasses['pc-page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['title-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['page-description']} */ ;
/** @type {__VLS_StyleScopedClasses['configs-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['configs-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['config-card']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['config-header']} */ ;
/** @type {__VLS_StyleScopedClasses['config-name']} */ ;
/** @type {__VLS_StyleScopedClasses['config-category']} */ ;
/** @type {__VLS_StyleScopedClasses['config-performance']} */ ;
/** @type {__VLS_StyleScopedClasses['performance-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['performance-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['performance-text']} */ ;
/** @type {__VLS_StyleScopedClasses['config-description']} */ ;
/** @type {__VLS_StyleScopedClasses['config-components']} */ ;
/** @type {__VLS_StyleScopedClasses['component-item']} */ ;
/** @type {__VLS_StyleScopedClasses['component-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['component-info']} */ ;
/** @type {__VLS_StyleScopedClasses['component-name']} */ ;
/** @type {__VLS_StyleScopedClasses['component-model']} */ ;
/** @type {__VLS_StyleScopedClasses['config-detail-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-content']} */ ;
/** @type {__VLS_StyleScopedClasses['components-list']} */ ;
/** @type {__VLS_StyleScopedClasses['component-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['component-info']} */ ;
/** @type {__VLS_StyleScopedClasses['component-name']} */ ;
/** @type {__VLS_StyleScopedClasses['component-model']} */ ;
/** @type {__VLS_StyleScopedClasses['rankings-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['rankings-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-header']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-model']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['score-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['score-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-header']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-model']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['score-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['score-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-header']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-model']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['score-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['score-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-header']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-model']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['score-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['score-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['score-value']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
