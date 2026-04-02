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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
var route = useRoute();
var isLoading = ref(true);
onMounted(function () {
    // 模拟加载延迟
    setTimeout(function () {
        isLoading.value = false;
    }, 500);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ id: "app" }, { class: "app" }));
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "loading-overlay" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "loading-spinner" }));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "app-layout" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)(__assign({ class: "app-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.nav, __VLS_intrinsics.nav)(__assign({ class: "navbar" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "navbar-brand" }));
    var __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ to: "/" }, { class: "brand-link" })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ to: "/" }, { class: "brand-link" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_4 = __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "brand-icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "brand-text" }));
    var __VLS_3;
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)(__assign({ class: "navbar-nav" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "nav-item" }));
    var __VLS_5 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign(__assign({ to: "/" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/' }) })));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign(__assign({ to: "/" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/' }) })], __VLS_functionalComponentArgsRest(__VLS_6), false));
    var __VLS_9 = __VLS_8.slots.default;
    // @ts-ignore
    [route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-icon" }));
    var __VLS_10 = {}.HomeIcon;
    /** @type {[typeof __VLS_components.HomeIcon, ]} */ ;
    // @ts-ignore
    HomeIcon;
    // @ts-ignore
    var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        size: "18",
    }));
    var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
            size: "18",
        }], __VLS_functionalComponentArgsRest(__VLS_11), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-text" }));
    var __VLS_8;
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "nav-item" }));
    var __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(__assign(__assign({ to: "/android" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/android' }) })));
    var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([__assign(__assign({ to: "/android" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/android' }) })], __VLS_functionalComponentArgsRest(__VLS_16), false));
    var __VLS_19 = __VLS_18.slots.default;
    // @ts-ignore
    [route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-icon" }));
    var __VLS_20 = {}.SmartphoneIcon;
    /** @type {[typeof __VLS_components.SmartphoneIcon, ]} */ ;
    // @ts-ignore
    SmartphoneIcon;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        size: "18",
    }));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
            size: "18",
        }], __VLS_functionalComponentArgsRest(__VLS_21), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-text" }));
    var __VLS_18;
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "nav-item" }));
    var __VLS_25 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25(__assign(__assign({ to: "/pc" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/pc' }) })));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([__assign(__assign({ to: "/pc" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/pc' }) })], __VLS_functionalComponentArgsRest(__VLS_26), false));
    var __VLS_29 = __VLS_28.slots.default;
    // @ts-ignore
    [route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-icon" }));
    var __VLS_30 = {}.MonitorIcon;
    /** @type {[typeof __VLS_components.MonitorIcon, ]} */ ;
    // @ts-ignore
    MonitorIcon;
    // @ts-ignore
    var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        size: "18",
    }));
    var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{
            size: "18",
        }], __VLS_functionalComponentArgsRest(__VLS_31), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-text" }));
    var __VLS_28;
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "nav-item" }));
    var __VLS_35 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35(__assign(__assign({ to: "/music" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/music' }) })));
    var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([__assign(__assign({ to: "/music" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/music' }) })], __VLS_functionalComponentArgsRest(__VLS_36), false));
    var __VLS_39 = __VLS_38.slots.default;
    // @ts-ignore
    [route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-icon" }));
    var __VLS_40 = {}.MusicIcon;
    /** @type {[typeof __VLS_components.MusicIcon, ]} */ ;
    // @ts-ignore
    MusicIcon;
    // @ts-ignore
    var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        size: "18",
    }));
    var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
            size: "18",
        }], __VLS_functionalComponentArgsRest(__VLS_41), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-text" }));
    var __VLS_38;
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "nav-item" }));
    var __VLS_45 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45(__assign(__assign({ to: "/tools" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/tools' }) })));
    var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([__assign(__assign({ to: "/tools" }, { class: "nav-link" }), { class: ({ active: __VLS_ctx.route.path === '/tools' }) })], __VLS_functionalComponentArgsRest(__VLS_46), false));
    var __VLS_49 = __VLS_48.slots.default;
    // @ts-ignore
    [route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-icon" }));
    var __VLS_50 = {}.WrenchIcon;
    /** @type {[typeof __VLS_components.WrenchIcon, ]} */ ;
    // @ts-ignore
    WrenchIcon;
    // @ts-ignore
    var __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        size: "18",
    }));
    var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
            size: "18",
        }], __VLS_functionalComponentArgsRest(__VLS_51), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-text" }));
    var __VLS_48;
    __VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)(__assign({ class: "app-main" }));
    var __VLS_55 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    RouterView;
    // @ts-ignore
    var __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
    var __VLS_57 = __VLS_56.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_56), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.footer, __VLS_intrinsics.footer)(__assign({ class: "app-footer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "footer-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
/** @type {__VLS_StyleScopedClasses['app']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['app-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['app-header']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-link']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-text']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['app-main']} */ ;
/** @type {__VLS_StyleScopedClasses['app-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
