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
import { ref, onMounted, onUnmounted } from 'vue';
import { homeAPI } from '@/services/api';
// Banner数据
var bannerImages = ref([]);
// 个人介绍数据
var introData = ref({});
// 功能特性数据
var features = ref([]);
// 快速导航数据
var quickNav = ref([]);
// Banner轮播逻辑
var currentSlide = ref(0);
var slideInterval;
var isLoading = ref(true);
var nextSlide = function () {
    currentSlide.value = (currentSlide.value + 1) % bannerImages.value.length;
};
var prevSlide = function () {
    currentSlide.value =
        (currentSlide.value - 1 + bannerImages.value.length) % bannerImages.value.length;
};
var goToSlide = function (index) {
    currentSlide.value = index;
};
var startAutoPlay = function () {
    slideInterval = setInterval(nextSlide, 5000);
};
var stopAutoPlay = function () {
    clearInterval(slideInterval);
};
// 加载首页数据
var loadHomeData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                isLoading.value = true;
                return [4 /*yield*/, homeAPI.getHomeData()
                    // 更新数据（如果后端有提供）
                ];
            case 1:
                response = _a.sent();
                // 更新数据（如果后端有提供）
                if (response && response.data) {
                    if (response.data.banner && response.data.banner.images) {
                        bannerImages.value = response.data.banner.images;
                    }
                    if (response.data.introData) {
                        introData.value = response.data.introData;
                    }
                    if (response.data.features) {
                        features.value = response.data.features;
                    }
                    if (response.data.quickNav) {
                        quickNav.value = response.data.quickNav;
                    }
                }
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                console.error('加载首页数据失败:', error_1);
                // 使用默认数据继续显示
                bannerImages.value = [
                    {
                        src: '/images/banner1.jpg',
                        alt: '个人网站Banner1',
                        title: '欢迎来到我的个人网站',
                        description: '技术分享与资源下载的综合平台',
                    },
                    {
                        src: '/images/banner2.jpg',
                        alt: '个人网站Banner2',
                        title: '技术分享与资源下载',
                        description: '提供安卓刷机、电脑装机等实用资源',
                    },
                ];
                introData.value = {
                    title: '关于我',
                    content: '这里将展示个人介绍信息，待后续提供具体文本内容。欢迎访问我的个人综合性网站，这里汇集了技术分享、资源下载和实用工具。',
                };
                features.value = [
                    {
                        id: 1,
                        icon: 'robot',
                        title: '安卓刷机',
                        description: '提供红米Note12 Turbo、K40S、小米Pad5等设备的刷机资源',
                    },
                    {
                        id: 2,
                        icon: 'desktop',
                        title: '电脑装机',
                        description: '6个主流价位配置单和硬件性能排行榜',
                    },
                    {
                        id: 3,
                        icon: 'music',
                        title: '音乐播放',
                        description: '在线音乐播放器，支持多种播放模式',
                    },
                    {
                        id: 4,
                        icon: 'tools',
                        title: '实用工具',
                        description: '多种在线工具，满足日常使用需求',
                    },
                ];
                quickNav.value = [
                    {
                        path: '/android',
                        icon: 'robot',
                        title: '安卓刷机',
                        description: '内核和Recovery下载',
                    },
                    {
                        path: '/pc',
                        icon: 'desktop',
                        title: '电脑装机',
                        description: '配置单和硬件排行',
                    },
                    {
                        path: '/music',
                        icon: 'music',
                        title: '音乐播放器',
                        description: '在线音乐播放',
                    },
                    {
                        path: '/tools',
                        icon: 'tools',
                        title: '工具箱',
                        description: '实用工具集合',
                    },
                ];
                return [3 /*break*/, 4];
            case 3:
                isLoading.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
onMounted(function () {
    loadHomeData();
    startAutoPlay();
});
onUnmounted(function () {
    stopAutoPlay();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['banner-slide']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-nav-card']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-nav-card']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-section']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['prev']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['next']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-nav-section']} */ ;
/** @type {__VLS_StyleScopedClasses['github-status-section']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-nav-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['github-stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-image']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-graph']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-image']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-stacks']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['github-stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-page" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "banner-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "banner-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "banner-slider" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.bannerImages)); _i < _a.length; _i++) {
    var _b = _a[_i], image = _b[0], index = _b[1];
    // @ts-ignore
    [bannerImages,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (index) }, { class: (['banner-slide', { active: __VLS_ctx.currentSlide === index }]) }));
    // @ts-ignore
    [currentSlide,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "banner-image" }, { style: ({ backgroundImage: "url(".concat(image.src, ")") }) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "banner-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "banner-title" }));
    (image.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "banner-description" }));
    (image.description);
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "banner-indicators" }));
var _loop_1 = function (_, index) {
    // @ts-ignore
    [bannerImages,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.goToSlide(index);
            // @ts-ignore
            [goToSlide,];
        } }, { key: (index) }), { class: (['indicator', { active: __VLS_ctx.currentSlide === index }]) }));
    // @ts-ignore
    [currentSlide,];
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.bannerImages)); _c < _d.length; _c++) {
    var _e = _d[_c], _ = _e[0], index = _e[1];
    _loop_1(_, index);
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.prevSlide) }, { class: "banner-nav prev" }));
// @ts-ignore
[prevSlide,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.nextSlide) }, { class: "banner-nav next" }));
// @ts-ignore
[nextSlide,];
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "github-status-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "github-stats-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stats-card" }));
__VLS_asFunctionalElement(__VLS_intrinsics.picture, __VLS_intrinsics.picture)({});
__VLS_asFunctionalElement(__VLS_intrinsics.source)({
    media: "(prefers-color-scheme: dark)",
    srcset: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0067\u0069\u0074\u0068\u0075\u0062\u002d\u0072\u0065\u0061\u0064\u006d\u0065\u002d\u0073\u0074\u0061\u0074\u0073\u002d\u0062\u0065\u0074\u0061\u002d\u006f\u006e\u0065\u002d\u0033\u0035\u002e\u0076\u0065\u0072\u0063\u0065\u006c\u002e\u0061\u0070\u0070\u002f\u0061\u0070\u0069\u003f\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065\u003d\u0061\u0076\u0069\u0064\u0065\u0072\u006d\u0069\u006e\u0026\u0073\u0068\u006f\u0077\u005f\u0069\u0063\u006f\u006e\u0073\u003d\u0074\u0072\u0075\u0065\u0026\u0074\u0068\u0065\u006d\u0065\u003d\u0074\u006f\u006b\u0079\u006f\u006e\u0069\u0067\u0068\u0074\u0026\u0063\u0061\u0072\u0064\u005f\u0077\u0069\u0064\u0074\u0068\u003d\u0034\u0030\u0030\u0026\u0068\u0069\u0064\u0065\u005f\u0062\u006f\u0072\u0064\u0065\u0072\u003d\u0074\u0072\u0075\u0065\u0026\u0063\u006f\u0075\u006e\u0074\u005f\u0070\u0072\u0069\u0076\u0061\u0074\u0065\u003d\u0074\u0072\u0075\u0065\u0026\u0069\u006e\u0063\u006c\u0075\u0064\u0065\u005f\u0061\u006c\u006c\u005f\u0063\u006f\u006d\u006d\u0069\u0074\u0073\u003d\u0074\u0072\u0075\u0065\u0026\u0063\u0061\u0063\u0068\u0065\u005f\u0073\u0065\u0063\u006f\u006e\u0064\u0073\u003d\u0031\u0038\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020",
});
__VLS_asFunctionalElement(__VLS_intrinsics.source)({
    media: "(prefers-color-scheme: light)",
    srcset: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0067\u0069\u0074\u0068\u0075\u0062\u002d\u0072\u0065\u0061\u0064\u006d\u0065\u002d\u0073\u0074\u0061\u0074\u0073\u002d\u0062\u0065\u0074\u0061\u002d\u006f\u006e\u0065\u002d\u0033\u0035\u002e\u0076\u0065\u0072\u0063\u0065\u006c\u002e\u0061\u0070\u0070\u002f\u0061\u0070\u0069\u003f\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065\u003d\u0061\u0076\u0069\u0064\u0065\u0072\u006d\u0069\u006e\u0026\u0073\u0068\u006f\u0077\u005f\u0069\u0063\u006f\u006e\u0073\u003d\u0074\u0072\u0075\u0065\u0026\u0074\u0068\u0065\u006d\u0065\u003d\u0064\u0065\u0066\u0061\u0075\u006c\u0074\u0026\u0063\u0061\u0072\u0064\u005f\u0077\u0069\u0064\u0074\u0068\u003d\u0034\u0030\u0030\u0026\u0068\u0069\u0064\u0065\u005f\u0062\u006f\u0072\u0064\u0065\u0072\u003d\u0074\u0072\u0075\u0065\u0026\u0063\u006f\u0075\u006e\u0074\u005f\u0070\u0072\u0069\u0076\u0061\u0074\u0065\u003d\u0074\u0072\u0075\u0065\u0026\u0069\u006e\u0063\u006c\u0075\u0064\u0065\u005f\u0061\u006c\u006c\u005f\u0063\u006f\u006d\u006d\u0069\u0074\u0073\u003d\u0074\u0072\u0075\u0065\u0026\u0063\u0061\u0063\u0068\u0065\u005f\u0073\u0065\u0063\u006f\u006e\u0064\u0073\u003d\u0031\u0038\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ alt: "GitHub Stats", src: "https://github-readme-stats-beta-one-35.vercel.app/api?username=avidermin&show_icons=true&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800" }, { class: "stats-image" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stats-card" }));
__VLS_asFunctionalElement(__VLS_intrinsics.picture, __VLS_intrinsics.picture)({});
__VLS_asFunctionalElement(__VLS_intrinsics.source)({
    media: "(prefers-color-scheme: dark)",
    srcset: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0067\u0069\u0074\u0068\u0075\u0062\u002d\u0072\u0065\u0061\u0064\u006d\u0065\u002d\u0073\u0074\u0061\u0074\u0073\u002d\u0062\u0065\u0074\u0061\u002d\u006f\u006e\u0065\u002d\u0033\u0035\u002e\u0076\u0065\u0072\u0063\u0065\u006c\u002e\u0061\u0070\u0070\u002f\u0061\u0070\u0069\u002f\u0074\u006f\u0070\u002d\u006c\u0061\u006e\u0067\u0073\u002f\u003f\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065\u003d\u0061\u0076\u0069\u0064\u0065\u0072\u006d\u0069\u006e\u0026\u006c\u0061\u0079\u006f\u0075\u0074\u003d\u0063\u006f\u006d\u0070\u0061\u0063\u0074\u0026\u0074\u0068\u0065\u006d\u0065\u003d\u0074\u006f\u006b\u0079\u006f\u006e\u0069\u0067\u0068\u0074\u0026\u0063\u0061\u0072\u0064\u005f\u0077\u0069\u0064\u0074\u0068\u003d\u0034\u0030\u0030\u0026\u0068\u0069\u0064\u0065\u005f\u0062\u006f\u0072\u0064\u0065\u0072\u003d\u0074\u0072\u0075\u0065\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020",
});
__VLS_asFunctionalElement(__VLS_intrinsics.source)({
    media: "(prefers-color-scheme: light)",
    srcset: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0067\u0069\u0074\u0068\u0075\u0062\u002d\u0072\u0065\u0061\u0064\u006d\u0065\u002d\u0073\u0074\u0061\u0074\u0073\u002d\u0062\u0065\u0074\u0061\u002d\u006f\u006e\u0065\u002d\u0033\u0035\u002e\u0076\u0065\u0072\u0063\u0065\u006c\u002e\u0061\u0070\u0070\u002f\u0061\u0070\u0069\u002f\u0074\u006f\u0070\u002d\u006c\u0061\u006e\u0067\u0073\u002f\u003f\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065\u003d\u0061\u0076\u0069\u0064\u0065\u0072\u006d\u0069\u006e\u0026\u006c\u0061\u0079\u006f\u0075\u0074\u003d\u0063\u006f\u006d\u0070\u0061\u0063\u0074\u0026\u0063\u0061\u0072\u0064\u005f\u0077\u0069\u0064\u0074\u0068\u003d\u0034\u0030\u0030\u0026\u0068\u0069\u0064\u0065\u005f\u0062\u006f\u0072\u0064\u0065\u0072\u003d\u0074\u0072\u0075\u0065\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ alt: "Top Languages", src: "https://github-readme-stats-beta-one-35.vercel.app/api/top-langs/?username=avidermin&layout=compact&card_width=400&hide_border=true" }, { class: "stats-image" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "activity-graph" }));
__VLS_asFunctionalElement(__VLS_intrinsics.picture, __VLS_intrinsics.picture)({});
__VLS_asFunctionalElement(__VLS_intrinsics.source)({
    srcset: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0067\u0069\u0074\u0068\u0075\u0062\u002d\u0072\u0065\u0061\u0064\u006d\u0065\u002d\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002d\u0067\u0072\u0061\u0070\u0068\u002e\u0076\u0065\u0072\u0063\u0065\u006c\u002e\u0061\u0070\u0070\u002f\u0067\u0072\u0061\u0070\u0068\u003f\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065\u003d\u0061\u0076\u0069\u0064\u0065\u0072\u006d\u0069\u006e\u0026\u0074\u0068\u0065\u006d\u0065\u003d\u0067\u0069\u0074\u0068\u0075\u0062\u002d\u0063\u006f\u006d\u0070\u0061\u0063\u0074\u0026\u0068\u0069\u0064\u0065\u005f\u0062\u006f\u0072\u0064\u0065\u0072\u003d\u0074\u0072\u0075\u0065\u0026\u0062\u0067\u005f\u0063\u006f\u006c\u006f\u0072\u003d\u0074\u0072\u0061\u006e\u0073\u0070\u0061\u0072\u0065\u006e\u0074\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ src: "https://github-readme-activity-graph.vercel.app/graph?username=avidermin&theme=github-compact&hide_border=true&bg_color=transparent", alt: "Activity Graph" }, { class: "activity-image" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-stacks" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-category" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "tech-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-badges" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Vue.js-42b883?style=flat-square&logo=vuedotjs&logoColor=white",
    alt: "Vue.js",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Shell-black?style=flat-square&logo=gnu-bash&logoColor=white",
    alt: "Shell",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/HTML-orange?style=flat-square&logo=html5&logoColor=white",
    alt: "HTML",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/CSS-blue?style=flat-square&logo=css&logoColor=white",
    alt: "CSS",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/JavaScript-yellow?style=flat-square&logo=javascript&logoColor=black",
    alt: "JavaScript",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-category" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "tech-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-badges" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/C-blue?style=flat-square&logo=c&logoColor=white",
    alt: "C",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Python-blue?style=flat-square&logo=python&logoColor=white",
    alt: "Python",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Java-red?style=flat-square&logo=openjdk&logoColor=white",
    alt: "Java",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white",
    alt: "Rust",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white",
    alt: "TypeScript",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-category" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "tech-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-badges" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/REDMI%20Note%2012%20Turbo-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff",
    alt: "REDMI Note 12 Turbo",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/REDMI%20K40S-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff",
    alt: "REDMI K40S",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Xiaomi%20Pad%205-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff",
    alt: "Xiaomi Pad 5",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-category" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "tech-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tech-badges" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Windows%2011%2026H1-00adef?style=flat-square&logo=windows&logoColor=ffffff",
    alt: "Windows11 26H1",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/Android%2016-3ddc84?style=flat-square&logo=android&logoColor=ffffff",
    alt: "Android 16",
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    height: "26",
    src: "https://img.shields.io/badge/WSL%20Ubuntu%2024.04.1-orange?style=flat-square&logo=ubuntu&logoColor=white",
    alt: "WSL Ubuntu 24.04.1",
});
/** @type {__VLS_StyleScopedClasses['home-page']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-section']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-container']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-slide']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-image']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-content']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-title']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-description']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-indicators']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['prev']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['next']} */ ;
/** @type {__VLS_StyleScopedClasses['github-status-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['github-stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-image']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-image']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-graph']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-image']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-stacks']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-badges']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
