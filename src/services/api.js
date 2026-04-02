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
import axios from 'axios';
// 创建axios实例
var api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
// 请求拦截器
api.interceptors.request.use(function (config) {
    var _a;
    // 可以在这里添加认证token等
    console.log("API Request: ".concat((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(), " ").concat(config.url));
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
api.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    var _a;
    console.error('API Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
    return Promise.reject(error);
});
// 首页相关API
export var homeAPI = {
    // 获取首页数据
    getHomeData: function () { return api.get('/home'); },
    // 更新首页数据
    updateHomeData: function (data) { return api.put('/home', data); },
    // 获取首页统计数据
    getHomeStats: function () { return api.get('/home/stats'); },
    // 获取首页推荐内容
    getHomeRecommendations: function () { return api.get('/home/recommendations'); }
};
// 安卓刷机相关API
export var androidAPI = {
    // 获取所有设备列表
    getDevices: function () { return api.get('/android/devices'); },
    // 获取单个设备详情
    getDevice: function (deviceId) { return api.get("/android/devices/".concat(deviceId)); },
    // 下载文件
    downloadFile: function (fileId) { return api.get("/android/download/".concat(fileId)); },
    // 记录下载统计
    recordDownload: function (fileId) { return api.post("/download/".concat(fileId)); },
    // 获取下载统计
    getDownloadStats: function () { return api.get('/download-stats'); },
    // 获取安卓数据
    getAndroidData: function () { return api.get('/android'); },
    // 获取教程数据
    getTutorials: function () { return api.get('/tutorials'); }
};
// 电脑装机相关API
export var pcAPI = {
    // 获取配置单列表
    getConfigurations: function () { return api.get('/pc/configurations'); },
    // 获取硬件排行榜
    getRankings: function (type) { return api.get("/pc/rankings/".concat(type)); },
    // 获取配置对比数据
    getComparison: function (config1, config2) {
        return api.get("/pc/compare?config1=".concat(config1, "&config2=").concat(config2));
    },
    // 获取PC数据
    getPCData: function () { return api.get('/pc'); }
};
// 音乐播放器相关API
export var musicAPI = {
    // 获取播放列表
    getPlaylist: function () { return api.get('/music/playlist'); },
    // 添加歌曲到播放列表
    addToPlaylist: function (song) { return api.post('/music/playlist', song); },
    // 从播放列表移除歌曲
    removeFromPlaylist: function (songId) { return api.delete("/music/playlist/".concat(songId)); },
    // 清空播放列表
    clearPlaylist: function () { return api.delete('/music/playlist'); },
    // 上传音乐文件
    uploadMusic: function (formData) { return api.post('/music/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }); },
    // 获取音乐数据
    getMusicData: function () { return api.get('/music'); }
};
// 工具箱相关API
export var toolsAPI = {
    // 获取工具列表
    getTools: function () { return api.get('/tools'); },
    // 获取工具分类
    getCategories: function () { return api.get('/tools/categories'); },
    // 获取工具详情
    getTool: function (toolId) { return api.get("/tools/".concat(toolId)); },
    // 启动工具
    launchTool: function (toolId) { return api.post("/tools/".concat(toolId, "/launch")); },
    // 获取工具数据
    getToolsData: function () { return api.get('/tools/data'); }
};
// 通用下载功能
export var downloadFile = function (url, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var response, blob, downloadUrl, link, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios({
                        url: url,
                        method: 'GET',
                        responseType: 'blob'
                    })
                    // 创建下载链接
                ];
            case 1:
                response = _a.sent();
                blob = new Blob([response.data]);
                downloadUrl = window.URL.createObjectURL(blob);
                link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
                return [2 /*return*/, true];
            case 2:
                error_1 = _a.sent();
                console.error('Download failed:', error_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
// 文件上传辅助函数
export var uploadFile = function (file, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = new FormData();
                formData.append('file', file);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios.post('/api/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function (progressEvent) {
                            if (onProgress && progressEvent.total) {
                                var progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                onProgress(progress);
                            }
                        }
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_2 = _a.sent();
                console.error('Upload failed:', error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
export default api;
