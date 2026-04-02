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
import { toolsAPI } from '@/services/api';
// 工具分类数据
var categories = ref([
    {
        id: 'all',
        name: '全部工具',
        icon: 'cubes',
        description: '所有可用工具',
    },
    {
        id: 'system',
        name: '系统工具',
        icon: 'desktop',
        description: '系统相关实用工具',
    },
    {
        id: 'network',
        name: '网络工具',
        icon: 'globe',
        description: '网络检测和分析工具',
    },
    {
        id: 'development',
        name: '开发工具',
        icon: 'cog',
        description: '编程和开发辅助工具',
    },
    {
        id: 'media',
        name: '媒体工具',
        icon: 'palette',
        description: '图片、音频、视频处理工具',
    },
    {
        id: 'utilities',
        name: '实用工具',
        icon: 'wrench',
        description: '日常使用的便捷工具',
    },
]);
// 工具数据
var tools = ref([
    {
        id: 'file-converter',
        title: '文件格式转换器',
        description: '支持多种文件格式的在线转换工具',
        icon: 'file',
        category: 'utilities',
        available: true,
        badge: '热门',
        version: '1.0.0',
    },
    {
        id: 'password-generator',
        title: '密码生成器',
        description: '生成安全可靠的随机密码',
        icon: 'key',
        category: 'utilities',
        available: true,
        version: '1.0.0',
    },
    {
        id: 'color-picker',
        title: '颜色选择器',
        description: '在线颜色选择和格式转换工具',
        icon: 'palette',
        category: 'media',
        available: true,
        version: '1.0.0',
    },
    {
        id: 'qr-code-generator',
        title: '二维码生成器',
        description: '快速生成自定义二维码',
        icon: 'mobile',
        category: 'utilities',
        available: true,
        version: '1.0.0',
    },
    {
        id: 'system-info',
        title: '系统信息检测',
        description: '检测浏览器和系统环境信息',
        icon: 'info-circle',
        category: 'system',
        available: false,
        badge: '即将上线',
    },
    {
        id: 'network-speed',
        title: '网络速度测试',
        description: '测试网络连接速度和延迟',
        icon: 'network-wired',
        category: 'network',
        available: false,
    },
    {
        id: 'code-formatter',
        title: '代码格式化工具',
        description: '多种编程语言的代码格式化',
        icon: 'code',
        category: 'development',
        available: false,
    },
    {
        id: 'image-compressor',
        title: '图片压缩工具',
        description: '在线压缩图片文件大小',
        icon: 'image',
        category: 'media',
        available: false,
    },
]);
// 即将上线的工具
var upcomingTools = ref([
    {
        id: 'unit-converter',
        title: '单位换算器',
        description: '长度、重量、温度等单位换算',
        icon: 'ruler',
        category: 'utilities',
        available: false,
    },
    {
        id: 'currency-converter',
        title: '货币汇率换算',
        description: '实时货币汇率换算工具',
        icon: 'money-bill',
        category: 'utilities',
        available: false,
    },
    {
        id: 'text-editor',
        title: '在线文本编辑器',
        description: '支持多种格式的文本编辑',
        icon: 'edit',
        category: 'development',
        available: false,
    },
]);
// 状态管理
var activeCategory = ref('all');
var selectedTool = ref(null);
var isLoading = ref(true);
// 计算属性
var filteredTools = computed(function () {
    if (activeCategory.value === 'all') {
        return tools.value;
    }
    return tools.value.filter(function (tool) { return tool.category === activeCategory.value; });
});
// 方法
var setActiveCategory = function (categoryId) {
    activeCategory.value = categoryId;
};
var getCategoryName = function (categoryId) {
    var category = categories.value.find(function (cat) { return cat.id === categoryId; });
    return category ? category.name : '未知分类';
};
var openTool = function (tool) {
    selectedTool.value = tool;
};
var closeToolModal = function () {
    selectedTool.value = null;
};
var launchTool = function (tool) {
    if (!tool.available)
        return;
    // 这里应该启动具体的工具功能
    // 目前只是显示提示信息
    alert("\u6B63\u5728\u542F\u52A8 ".concat(tool.title, "...\n\u529F\u80FD\u6B63\u5728\u5F00\u53D1\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01"));
    closeToolModal();
};
// 加载工具数据
var loadToolsData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                isLoading.value = true;
                return [4 /*yield*/, toolsAPI.getToolsData()
                    // 更新工具数据
                ];
            case 1:
                response = _a.sent();
                // 更新工具数据
                if (response.data && response.data.tools) {
                    tools.value = response.data.tools;
                }
                // 更新分类数据
                if (response.data && response.data.categories) {
                    categories.value = response.data.categories;
                }
                // 更新即将上线的工具数据
                if (response.data && response.data.upcomingTools) {
                    upcomingTools.value = response.data.upcomingTools;
                }
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                console.error('加载工具数据失败:', error_1);
                return [3 /*break*/, 4];
            case 3:
                isLoading.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 组件挂载时加载数据
onMounted(function () {
    loadToolsData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['available']} */ ;
/** @type {__VLS_StyleScopedClasses['extension-info']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-tools']} */ ;
/** @type {__VLS_StyleScopedClasses['extension-info']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['categories-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['tools-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['extensions-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['extension-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['category-name']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-icon']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tools-page" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "page-title" }));
var __VLS_0 = {}.WrenchIcon;
/** @type {[typeof __VLS_components.WrenchIcon, ]} */ ;
// @ts-ignore
WrenchIcon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: "24",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        size: "24",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "page-description" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "categories-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "categories-nav" }));
var _loop_1 = function (category) {
    // @ts-ignore
    [categories,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.setActiveCategory(category.id);
            // @ts-ignore
            [setActiveCategory,];
        } }, { key: (category.id) }), { class: (['category-btn', { active: __VLS_ctx.activeCategory === category.id }]) }));
    // @ts-ignore
    [activeCategory,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "category-icon" }));
    if (category.icon === 'globe') {
        var __VLS_5 = {}.GlobeIcon;
        /** @type {[typeof __VLS_components.GlobeIcon, ]} */ ;
        // @ts-ignore
        GlobeIcon;
        // @ts-ignore
        var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            size: "18",
        }));
        var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_6), false));
    }
    else if (category.icon === 'cog') {
        var __VLS_10 = {}.CogIcon;
        /** @type {[typeof __VLS_components.CogIcon, ]} */ ;
        // @ts-ignore
        CogIcon;
        // @ts-ignore
        var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            size: "18",
        }));
        var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_11), false));
    }
    else if (category.icon === 'palette') {
        var __VLS_15 = {}.PaletteIcon;
        /** @type {[typeof __VLS_components.PaletteIcon, ]} */ ;
        // @ts-ignore
        PaletteIcon;
        // @ts-ignore
        var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            size: "18",
        }));
        var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_16), false));
    }
    else if (category.icon === 'wrench') {
        var __VLS_20 = {}.WrenchIcon;
        /** @type {[typeof __VLS_components.WrenchIcon, ]} */ ;
        // @ts-ignore
        WrenchIcon;
        // @ts-ignore
        var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            size: "18",
        }));
        var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_21), false));
    }
    else if (category.icon === 'file') {
        var __VLS_25 = {}.FileIcon;
        /** @type {[typeof __VLS_components.FileIcon, ]} */ ;
        // @ts-ignore
        FileIcon;
        // @ts-ignore
        var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            size: "18",
        }));
        var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_26), false));
    }
    else if (category.icon === 'key') {
        var __VLS_30 = {}.KeyIcon;
        /** @type {[typeof __VLS_components.KeyIcon, ]} */ ;
        // @ts-ignore
        KeyIcon;
        // @ts-ignore
        var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
            size: "18",
        }));
        var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_31), false));
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "category-name" }));
    (category.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.categories)); _i < _a.length; _i++) {
    var category = _a[_i][0];
    _loop_1(category);
}
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "tools-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tools-grid" }));
var _loop_2 = function (tool) {
    // @ts-ignore
    [filteredTools,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.openTool(tool);
            // @ts-ignore
            [openTool,];
        } }, { key: (tool.id) }), { class: (['tool-card', { disabled: !tool.available }]) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-icon" }));
    if (tool.icon === 'globe') {
        var __VLS_35 = {}.GlobeIcon;
        /** @type {[typeof __VLS_components.GlobeIcon, ]} */ ;
        // @ts-ignore
        GlobeIcon;
        // @ts-ignore
        var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            size: "24",
        }));
        var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_36), false));
    }
    else if (tool.icon === 'cog') {
        var __VLS_40 = {}.CogIcon;
        /** @type {[typeof __VLS_components.CogIcon, ]} */ ;
        // @ts-ignore
        CogIcon;
        // @ts-ignore
        var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            size: "24",
        }));
        var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_41), false));
    }
    else if (tool.icon === 'palette') {
        var __VLS_45 = {}.PaletteIcon;
        /** @type {[typeof __VLS_components.PaletteIcon, ]} */ ;
        // @ts-ignore
        PaletteIcon;
        // @ts-ignore
        var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            size: "24",
        }));
        var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_46), false));
    }
    else if (tool.icon === 'wrench') {
        var __VLS_50 = {}.WrenchIcon;
        /** @type {[typeof __VLS_components.WrenchIcon, ]} */ ;
        // @ts-ignore
        WrenchIcon;
        // @ts-ignore
        var __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
            size: "24",
        }));
        var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_51), false));
    }
    else if (tool.icon === 'file') {
        var __VLS_55 = {}.FileIcon;
        /** @type {[typeof __VLS_components.FileIcon, ]} */ ;
        // @ts-ignore
        FileIcon;
        // @ts-ignore
        var __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
            size: "24",
        }));
        var __VLS_57 = __VLS_56.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_56), false));
    }
    else if (tool.icon === 'key') {
        var __VLS_60 = {}.KeyIcon;
        /** @type {[typeof __VLS_components.KeyIcon, ]} */ ;
        // @ts-ignore
        KeyIcon;
        // @ts-ignore
        var __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
            size: "24",
        }));
        var __VLS_62 = __VLS_61.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_61), false));
    }
    else if (tool.icon === 'box') {
        var __VLS_65 = {}.BoxIcon;
        /** @type {[typeof __VLS_components.BoxIcon, ]} */ ;
        // @ts-ignore
        BoxIcon;
        // @ts-ignore
        var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
            size: "24",
        }));
        var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_66), false));
    }
    else if (tool.icon === 'laptop') {
        var __VLS_70 = {}.LaptopIcon;
        /** @type {[typeof __VLS_components.LaptopIcon, ]} */ ;
        // @ts-ignore
        LaptopIcon;
        // @ts-ignore
        var __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
            size: "24",
        }));
        var __VLS_72 = __VLS_71.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_71), false));
    }
    else if (tool.icon === 'info-circle') {
        var __VLS_75 = {}.InfoIcon;
        /** @type {[typeof __VLS_components.InfoIcon, ]} */ ;
        // @ts-ignore
        InfoIcon;
        // @ts-ignore
        var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
            size: "24",
        }));
        var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_76), false));
    }
    else if (tool.icon === 'network-wired') {
        var __VLS_80 = {}.NetworkIcon;
        /** @type {[typeof __VLS_components.NetworkIcon, ]} */ ;
        // @ts-ignore
        NetworkIcon;
        // @ts-ignore
        var __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
            size: "24",
        }));
        var __VLS_82 = __VLS_81.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_81), false));
    }
    else if (tool.icon === 'code') {
        var __VLS_85 = {}.CodeIcon;
        /** @type {[typeof __VLS_components.CodeIcon, ]} */ ;
        // @ts-ignore
        CodeIcon;
        // @ts-ignore
        var __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
            size: "24",
        }));
        var __VLS_87 = __VLS_86.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_86), false));
    }
    else if (tool.icon === 'image') {
        var __VLS_90 = {}.ImageIcon;
        /** @type {[typeof __VLS_components.ImageIcon, ]} */ ;
        // @ts-ignore
        ImageIcon;
        // @ts-ignore
        var __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
            size: "24",
        }));
        var __VLS_92 = __VLS_91.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_91), false));
    }
    else if (tool.icon === 'ruler') {
        var __VLS_95 = {}.RulerIcon;
        /** @type {[typeof __VLS_components.RulerIcon, ]} */ ;
        // @ts-ignore
        RulerIcon;
        // @ts-ignore
        var __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
            size: "24",
        }));
        var __VLS_97 = __VLS_96.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_96), false));
    }
    else if (tool.icon === 'money-bill') {
        var __VLS_100 = {}.DollarSignIcon;
        /** @type {[typeof __VLS_components.DollarSignIcon, ]} */ ;
        // @ts-ignore
        DollarSignIcon;
        // @ts-ignore
        var __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            size: "24",
        }));
        var __VLS_102 = __VLS_101.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_101), false));
    }
    else if (tool.icon === 'edit') {
        var __VLS_105 = {}.EditIcon;
        /** @type {[typeof __VLS_components.EditIcon, ]} */ ;
        // @ts-ignore
        EditIcon;
        // @ts-ignore
        var __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
            size: "24",
        }));
        var __VLS_107 = __VLS_106.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_106), false));
    }
    else if (tool.icon === 'cubes') {
        var __VLS_110 = {}.CubeIcon;
        /** @type {[typeof __VLS_components.CubeIcon, ]} */ ;
        // @ts-ignore
        CubeIcon;
        // @ts-ignore
        var __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
            size: "24",
        }));
        var __VLS_112 = __VLS_111.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_111), false));
    }
    if (tool.badge) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-badge" }));
        (tool.badge);
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "tool-title" }));
    (tool.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "tool-description" }));
    (tool.description);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-footer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-status" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: (['status-dot', { available: tool.available }]) }));
    (tool.available ? '可用' : '开发中');
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-actions" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.openTool(tool);
            // @ts-ignore
            [openTool,];
        } }, { class: "action-btn" }), { disabled: (!tool.available) }));
    (tool.available ? '打开' : '敬请期待');
};
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.filteredTools)); _b < _c.length; _b++) {
    var tool = _c[_b][0];
    _loop_2(tool);
}
if (__VLS_ctx.selectedTool) {
    // @ts-ignore
    [selectedTool,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.closeToolModal) }, { class: "tool-modal-overlay" }));
    // @ts-ignore
    [closeToolModal,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () { } }, { class: "tool-modal" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "modal-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "modal-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "modal-icon" }));
    if (__VLS_ctx.selectedTool.icon === 'globe') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_115 = {}.GlobeIcon;
        /** @type {[typeof __VLS_components.GlobeIcon, ]} */ ;
        // @ts-ignore
        GlobeIcon;
        // @ts-ignore
        var __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
            size: "24",
        }));
        var __VLS_117 = __VLS_116.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_116), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'cog') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_120 = {}.CogIcon;
        /** @type {[typeof __VLS_components.CogIcon, ]} */ ;
        // @ts-ignore
        CogIcon;
        // @ts-ignore
        var __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
            size: "24",
        }));
        var __VLS_122 = __VLS_121.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_121), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'palette') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_125 = {}.PaletteIcon;
        /** @type {[typeof __VLS_components.PaletteIcon, ]} */ ;
        // @ts-ignore
        PaletteIcon;
        // @ts-ignore
        var __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
            size: "24",
        }));
        var __VLS_127 = __VLS_126.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_126), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'wrench') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_130 = {}.WrenchIcon;
        /** @type {[typeof __VLS_components.WrenchIcon, ]} */ ;
        // @ts-ignore
        WrenchIcon;
        // @ts-ignore
        var __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
            size: "24",
        }));
        var __VLS_132 = __VLS_131.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_131), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'file') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_135 = {}.FileIcon;
        /** @type {[typeof __VLS_components.FileIcon, ]} */ ;
        // @ts-ignore
        FileIcon;
        // @ts-ignore
        var __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
            size: "24",
        }));
        var __VLS_137 = __VLS_136.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_136), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'key') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_140 = {}.KeyIcon;
        /** @type {[typeof __VLS_components.KeyIcon, ]} */ ;
        // @ts-ignore
        KeyIcon;
        // @ts-ignore
        var __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({
            size: "24",
        }));
        var __VLS_142 = __VLS_141.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_141), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'box') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_145 = {}.BoxIcon;
        /** @type {[typeof __VLS_components.BoxIcon, ]} */ ;
        // @ts-ignore
        BoxIcon;
        // @ts-ignore
        var __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
            size: "24",
        }));
        var __VLS_147 = __VLS_146.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_146), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'laptop') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_150 = {}.LaptopIcon;
        /** @type {[typeof __VLS_components.LaptopIcon, ]} */ ;
        // @ts-ignore
        LaptopIcon;
        // @ts-ignore
        var __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
            size: "24",
        }));
        var __VLS_152 = __VLS_151.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_151), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'info-circle') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_155 = {}.InfoIcon;
        /** @type {[typeof __VLS_components.InfoIcon, ]} */ ;
        // @ts-ignore
        InfoIcon;
        // @ts-ignore
        var __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
            size: "24",
        }));
        var __VLS_157 = __VLS_156.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_156), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'network-wired') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_160 = {}.NetworkIcon;
        /** @type {[typeof __VLS_components.NetworkIcon, ]} */ ;
        // @ts-ignore
        NetworkIcon;
        // @ts-ignore
        var __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({
            size: "24",
        }));
        var __VLS_162 = __VLS_161.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_161), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'code') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_165 = {}.CodeIcon;
        /** @type {[typeof __VLS_components.CodeIcon, ]} */ ;
        // @ts-ignore
        CodeIcon;
        // @ts-ignore
        var __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
            size: "24",
        }));
        var __VLS_167 = __VLS_166.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_166), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'image') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_170 = {}.ImageIcon;
        /** @type {[typeof __VLS_components.ImageIcon, ]} */ ;
        // @ts-ignore
        ImageIcon;
        // @ts-ignore
        var __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
            size: "24",
        }));
        var __VLS_172 = __VLS_171.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_171), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'ruler') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_175 = {}.RulerIcon;
        /** @type {[typeof __VLS_components.RulerIcon, ]} */ ;
        // @ts-ignore
        RulerIcon;
        // @ts-ignore
        var __VLS_176 = __VLS_asFunctionalComponent(__VLS_175, new __VLS_175({
            size: "24",
        }));
        var __VLS_177 = __VLS_176.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_176), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'money-bill') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_180 = {}.DollarSignIcon;
        /** @type {[typeof __VLS_components.DollarSignIcon, ]} */ ;
        // @ts-ignore
        DollarSignIcon;
        // @ts-ignore
        var __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
            size: "24",
        }));
        var __VLS_182 = __VLS_181.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_181), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'edit') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_185 = {}.EditIcon;
        /** @type {[typeof __VLS_components.EditIcon, ]} */ ;
        // @ts-ignore
        EditIcon;
        // @ts-ignore
        var __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
            size: "24",
        }));
        var __VLS_187 = __VLS_186.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_186), false));
    }
    else if (__VLS_ctx.selectedTool.icon === 'cubes') {
        // @ts-ignore
        [selectedTool,];
        var __VLS_190 = {}.CubeIcon;
        /** @type {[typeof __VLS_components.CubeIcon, ]} */ ;
        // @ts-ignore
        CubeIcon;
        // @ts-ignore
        var __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
            size: "24",
        }));
        var __VLS_192 = __VLS_191.apply(void 0, __spreadArray([{
                size: "24",
            }], __VLS_functionalComponentArgsRest(__VLS_191), false));
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.selectedTool.title);
    // @ts-ignore
    [selectedTool,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.closeToolModal) }, { class: "close-btn" }));
    // @ts-ignore
    [closeToolModal,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "modal-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "tool-description" }));
    (__VLS_ctx.selectedTool.description);
    // @ts-ignore
    [selectedTool,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-meta" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "meta-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.getCategoryName(__VLS_ctx.selectedTool.category));
    // @ts-ignore
    [selectedTool, getCategoryName,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "meta-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: (['status-text', { available: __VLS_ctx.selectedTool.available }]) }));
    // @ts-ignore
    [selectedTool,];
    (__VLS_ctx.selectedTool.available ? '可用' : '开发中');
    // @ts-ignore
    [selectedTool,];
    if (__VLS_ctx.selectedTool.version) {
        // @ts-ignore
        [selectedTool,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "meta-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_ctx.selectedTool.version);
        // @ts-ignore
        [selectedTool,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tool-preview" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "preview-placeholder" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "placeholder-icon" }));
    var __VLS_195 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    var __VLS_196 = __VLS_asFunctionalComponent(__VLS_195, new __VLS_195({
        icon: (__VLS_ctx.selectedTool.icon),
    }));
    var __VLS_197 = __VLS_196.apply(void 0, __spreadArray([{
            icon: (__VLS_ctx.selectedTool.icon),
        }], __VLS_functionalComponentArgsRest(__VLS_196), false));
    // @ts-ignore
    [selectedTool,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "placeholder-text" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "placeholder-subtext" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "modal-footer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.closeToolModal) }, { class: "btn btn-secondary" }));
    // @ts-ignore
    [closeToolModal,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.selectedTool))
                return;
            __VLS_ctx.launchTool(__VLS_ctx.selectedTool);
            // @ts-ignore
            [selectedTool, launchTool,];
        } }, { class: "btn btn-primary" }), { disabled: (!__VLS_ctx.selectedTool.available) }));
    // @ts-ignore
    [selectedTool,];
    (__VLS_ctx.selectedTool.available ? '启动工具' : '功能开发中');
    // @ts-ignore
    [selectedTool,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "extensions-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "extensions-content" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "extension-info" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "extension-actions" }));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ class: "btn btn-outline" }));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ class: "btn btn-outline" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "upcoming-tools" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "upcoming-list" }));
for (var _d = 0, _e = __VLS_getVForSourceType((__VLS_ctx.upcomingTools)); _d < _e.length; _d++) {
    var tool = _e[_d][0];
    // @ts-ignore
    [upcomingTools,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (tool.id) }, { class: "upcoming-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "upcoming-icon" }));
    if (tool.icon === 'globe') {
        var __VLS_200 = {}.GlobeIcon;
        /** @type {[typeof __VLS_components.GlobeIcon, ]} */ ;
        // @ts-ignore
        GlobeIcon;
        // @ts-ignore
        var __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({
            size: "18",
        }));
        var __VLS_202 = __VLS_201.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_201), false));
    }
    else if (tool.icon === 'cog') {
        var __VLS_205 = {}.CogIcon;
        /** @type {[typeof __VLS_components.CogIcon, ]} */ ;
        // @ts-ignore
        CogIcon;
        // @ts-ignore
        var __VLS_206 = __VLS_asFunctionalComponent(__VLS_205, new __VLS_205({
            size: "18",
        }));
        var __VLS_207 = __VLS_206.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_206), false));
    }
    else if (tool.icon === 'palette') {
        var __VLS_210 = {}.PaletteIcon;
        /** @type {[typeof __VLS_components.PaletteIcon, ]} */ ;
        // @ts-ignore
        PaletteIcon;
        // @ts-ignore
        var __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
            size: "18",
        }));
        var __VLS_212 = __VLS_211.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_211), false));
    }
    else if (tool.icon === 'wrench') {
        var __VLS_215 = {}.WrenchIcon;
        /** @type {[typeof __VLS_components.WrenchIcon, ]} */ ;
        // @ts-ignore
        WrenchIcon;
        // @ts-ignore
        var __VLS_216 = __VLS_asFunctionalComponent(__VLS_215, new __VLS_215({
            size: "18",
        }));
        var __VLS_217 = __VLS_216.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_216), false));
    }
    else if (tool.icon === 'file') {
        var __VLS_220 = {}.FileIcon;
        /** @type {[typeof __VLS_components.FileIcon, ]} */ ;
        // @ts-ignore
        FileIcon;
        // @ts-ignore
        var __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
            size: "18",
        }));
        var __VLS_222 = __VLS_221.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_221), false));
    }
    else if (tool.icon === 'key') {
        var __VLS_225 = {}.KeyIcon;
        /** @type {[typeof __VLS_components.KeyIcon, ]} */ ;
        // @ts-ignore
        KeyIcon;
        // @ts-ignore
        var __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
            size: "18",
        }));
        var __VLS_227 = __VLS_226.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_226), false));
    }
    else if (tool.icon === 'box') {
        var __VLS_230 = {}.BoxIcon;
        /** @type {[typeof __VLS_components.BoxIcon, ]} */ ;
        // @ts-ignore
        BoxIcon;
        // @ts-ignore
        var __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
            size: "18",
        }));
        var __VLS_232 = __VLS_231.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_231), false));
    }
    else if (tool.icon === 'laptop') {
        var __VLS_235 = {}.LaptopIcon;
        /** @type {[typeof __VLS_components.LaptopIcon, ]} */ ;
        // @ts-ignore
        LaptopIcon;
        // @ts-ignore
        var __VLS_236 = __VLS_asFunctionalComponent(__VLS_235, new __VLS_235({
            size: "18",
        }));
        var __VLS_237 = __VLS_236.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_236), false));
    }
    else if (tool.icon === 'info-circle') {
        var __VLS_240 = {}.InfoIcon;
        /** @type {[typeof __VLS_components.InfoIcon, ]} */ ;
        // @ts-ignore
        InfoIcon;
        // @ts-ignore
        var __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
            size: "18",
        }));
        var __VLS_242 = __VLS_241.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_241), false));
    }
    else if (tool.icon === 'network-wired') {
        var __VLS_245 = {}.NetworkIcon;
        /** @type {[typeof __VLS_components.NetworkIcon, ]} */ ;
        // @ts-ignore
        NetworkIcon;
        // @ts-ignore
        var __VLS_246 = __VLS_asFunctionalComponent(__VLS_245, new __VLS_245({
            size: "18",
        }));
        var __VLS_247 = __VLS_246.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_246), false));
    }
    else if (tool.icon === 'code') {
        var __VLS_250 = {}.CodeIcon;
        /** @type {[typeof __VLS_components.CodeIcon, ]} */ ;
        // @ts-ignore
        CodeIcon;
        // @ts-ignore
        var __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
            size: "18",
        }));
        var __VLS_252 = __VLS_251.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_251), false));
    }
    else if (tool.icon === 'image') {
        var __VLS_255 = {}.ImageIcon;
        /** @type {[typeof __VLS_components.ImageIcon, ]} */ ;
        // @ts-ignore
        ImageIcon;
        // @ts-ignore
        var __VLS_256 = __VLS_asFunctionalComponent(__VLS_255, new __VLS_255({
            size: "18",
        }));
        var __VLS_257 = __VLS_256.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_256), false));
    }
    else if (tool.icon === 'ruler') {
        var __VLS_260 = {}.RulerIcon;
        /** @type {[typeof __VLS_components.RulerIcon, ]} */ ;
        // @ts-ignore
        RulerIcon;
        // @ts-ignore
        var __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({
            size: "18",
        }));
        var __VLS_262 = __VLS_261.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_261), false));
    }
    else if (tool.icon === 'money-bill') {
        var __VLS_265 = {}.DollarSignIcon;
        /** @type {[typeof __VLS_components.DollarSignIcon, ]} */ ;
        // @ts-ignore
        DollarSignIcon;
        // @ts-ignore
        var __VLS_266 = __VLS_asFunctionalComponent(__VLS_265, new __VLS_265({
            size: "18",
        }));
        var __VLS_267 = __VLS_266.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_266), false));
    }
    else if (tool.icon === 'edit') {
        var __VLS_270 = {}.EditIcon;
        /** @type {[typeof __VLS_components.EditIcon, ]} */ ;
        // @ts-ignore
        EditIcon;
        // @ts-ignore
        var __VLS_271 = __VLS_asFunctionalComponent(__VLS_270, new __VLS_270({
            size: "18",
        }));
        var __VLS_272 = __VLS_271.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_271), false));
    }
    else if (tool.icon === 'cubes') {
        var __VLS_275 = {}.CubeIcon;
        /** @type {[typeof __VLS_components.CubeIcon, ]} */ ;
        // @ts-ignore
        CubeIcon;
        // @ts-ignore
        var __VLS_276 = __VLS_asFunctionalComponent(__VLS_275, new __VLS_275({
            size: "18",
        }));
        var __VLS_277 = __VLS_276.apply(void 0, __spreadArray([{
                size: "18",
            }], __VLS_functionalComponentArgsRest(__VLS_276), false));
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "upcoming-name" }));
    (tool.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "upcoming-status" }));
}
/** @type {__VLS_StyleScopedClasses['tools-page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['page-description']} */ ;
/** @type {__VLS_StyleScopedClasses['categories-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['categories-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['category-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['category-name']} */ ;
/** @type {__VLS_StyleScopedClasses['tools-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['tools-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-description']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-status']} */ ;
/** @type {__VLS_StyleScopedClasses['available']} */ ;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-info']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-description']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
/** @type {__VLS_StyleScopedClasses['available']} */ ;
/** @type {__VLS_StyleScopedClasses['status-text']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-text']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-subtext']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['extensions-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['extensions-content']} */ ;
/** @type {__VLS_StyleScopedClasses['extension-info']} */ ;
/** @type {__VLS_StyleScopedClasses['extension-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-tools']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-list']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-item']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-name']} */ ;
/** @type {__VLS_StyleScopedClasses['upcoming-status']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
