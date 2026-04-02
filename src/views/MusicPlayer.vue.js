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
var _a, _b, _c, _d, _e, _f;
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { musicAPI } from '@/services/api';
import { MusicIcon, SearchIcon, HeartIcon, RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, PlayIcon, PauseIcon, Volume2Icon, VolumeXIcon } from 'lucide-vue-next';
// 播放列表数据
var playlist = ref([
    {
        id: '1',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: '÷ (Divide)',
        albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
        duration: 233,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: '2',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        albumArt: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&h=300&fit=crop',
        duration: 200,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
        id: '3',
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
        duration: 233,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
        id: '4',
        title: 'Save Your Tears',
        artist: 'The Weeknd',
        album: 'After Hours',
        albumArt: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=300&h=300&fit=crop',
        duration: 215,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
        id: '5',
        title: 'Good 4 U',
        artist: 'Olivia Rodrigo',
        album: 'Sour',
        albumArt: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        duration: 178,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
        id: '6',
        title: 'Dynamite',
        artist: 'BTS',
        album: 'BE',
        albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
        duration: 199,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    {
        id: '7',
        title: 'Montero (Call Me By Your Name)',
        artist: 'Lil Nas X',
        album: 'Montero',
        albumArt: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&h=300&fit=crop',
        duration: 138,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    },
    {
        id: '8',
        title: 'Peaches',
        artist: 'Justin Bieber',
        album: 'Justice',
        albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
        duration: 198,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
]);
// 播放器状态
var currentSongIndex = ref(-1);
var isPlaying = ref(false);
var currentTime = ref(0);
var volume = ref(0.7);
var isMuted = ref(false);
var isShuffle = ref(false);
var isRepeat = ref(false);
var repeatMode = ref('all');
var isLoading = ref(true);
var searchQuery = ref('');
var showLyrics = ref(false);
// 音频元素引用
var audioElement = ref();
// 音频上下文和分析器
var audioContext = ref(null);
var audioAnalyser = ref(null);
var audioSource = ref(null);
// 频谱数据
var frequencyData = ref(null);
// DOM 引用
var fileInput = ref();
var canvasRef = ref();
var canvasContext = ref(null);
// 计算属性
var currentSong = computed(function () {
    return currentSongIndex.value >= 0 ? playlist.value[currentSongIndex.value] : null;
});
var progressPercentage = computed(function () {
    if (!currentSong.value)
        return 0;
    return (currentTime.value / currentSong.value.duration) * 100;
});
var volumeIcon = computed(function () {
    if (isMuted.value || volume.value === 0)
        return 'volume-x';
    if (volume.value < 0.3)
        return 'volume-2';
    return 'volume-2';
});
var filteredPlaylist = computed(function () {
    if (!searchQuery.value.trim()) {
        return playlist.value;
    }
    var query = searchQuery.value.toLowerCase();
    return playlist.value.filter(function (song) {
        return song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.album.toLowerCase().includes(query);
    });
});
// 方法
var formatTime = function (seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
};
var formatTotalDuration = function () {
    var totalSeconds = playlist.value.reduce(function (sum, song) { return sum + song.duration; }, 0);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
        return "".concat(hours, "\u5C0F\u65F6").concat(minutes, "\u5206\u949F");
    }
    return "".concat(minutes, "\u5206\u949F");
};
var initAudioContext = function () {
    if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
        audioAnalyser.value = audioContext.value.createAnalyser();
        audioAnalyser.value.fftSize = 256;
        var buffer = new ArrayBuffer(audioAnalyser.value.frequencyBinCount);
        frequencyData.value = new Uint8Array(buffer);
    }
};
var connectAudioSource = function () {
    if (audioElement.value && audioContext.value && audioAnalyser.value) {
        audioSource.value = audioContext.value.createMediaElementSource(audioElement.value);
        audioSource.value.connect(audioAnalyser.value);
        audioAnalyser.value.connect(audioContext.value.destination);
    }
};
var playSong = function (index) {
    if (!audioElement.value)
        return;
    currentSongIndex.value = index;
    var song = playlist.value[index];
    if (song.url) {
        audioElement.value.src = song.url;
    }
    else if (song.file) {
        audioElement.value.src = URL.createObjectURL(song.file);
    }
    audioElement.value.play().then(function () {
        isPlaying.value = true;
        initAudioContext();
        connectAudioSource();
        startVisualization();
    }).catch(function (error) {
        console.error('播放失败:', error);
    });
};
var togglePlay = function () {
    if (!audioElement.value)
        return;
    if (currentSongIndex.value === -1 && playlist.value.length > 0) {
        playSong(0);
        return;
    }
    if (isPlaying.value) {
        audioElement.value.pause();
        isPlaying.value = false;
        stopVisualization();
    }
    else {
        audioElement.value.play().then(function () {
            isPlaying.value = true;
            initAudioContext();
            connectAudioSource();
            startVisualization();
        }).catch(function (error) {
            console.error('播放失败:', error);
        });
    }
};
var previousSong = function () {
    if (playlist.value.length === 0)
        return;
    var newIndex;
    if (isShuffle.value) {
        newIndex = Math.floor(Math.random() * playlist.value.length);
    }
    else {
        newIndex = currentSongIndex.value - 1;
        if (newIndex < 0)
            newIndex = playlist.value.length - 1;
    }
    playSong(newIndex);
};
var nextSong = function () {
    if (playlist.value.length === 0)
        return;
    var newIndex;
    if (isShuffle.value) {
        newIndex = Math.floor(Math.random() * playlist.value.length);
    }
    else {
        newIndex = currentSongIndex.value + 1;
        if (newIndex >= playlist.value.length)
            newIndex = 0;
    }
    playSong(newIndex);
};
var toggleShuffle = function () {
    isShuffle.value = !isShuffle.value;
};
var toggleRepeat = function () {
    if (!isRepeat.value) {
        isRepeat.value = true;
        repeatMode.value = 'all';
        if (audioElement.value) {
            audioElement.value.loop = false;
        }
    }
    else if (repeatMode.value === 'all') {
        repeatMode.value = 'one';
        if (audioElement.value) {
            audioElement.value.loop = true;
        }
    }
    else {
        isRepeat.value = false;
        repeatMode.value = 'all';
        if (audioElement.value) {
            audioElement.value.loop = false;
        }
    }
};
var toggleMute = function () {
    if (!audioElement.value)
        return;
    isMuted.value = !isMuted.value;
    audioElement.value.muted = isMuted.value;
};
var setVolume = function (event) {
    if (!audioElement.value)
        return;
    var volumeBar = event.currentTarget;
    var rect = volumeBar.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    volume.value = newVolume;
    audioElement.value.volume = newVolume;
    isMuted.value = newVolume === 0;
};
var seekToPosition = function (event) {
    if (!audioElement.value || !currentSong.value)
        return;
    var progressBar = event.currentTarget;
    var rect = progressBar.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var percentage = Math.max(0, Math.min(1, clickX / rect.width));
    var newTime = currentSong.value.duration * percentage;
    audioElement.value.currentTime = newTime;
    currentTime.value = newTime;
};
var removeFromPlaylist = function (index) {
    if (!audioElement.value)
        return;
    if (index === currentSongIndex.value) {
        audioElement.value.pause();
        currentSongIndex.value = -1;
        isPlaying.value = false;
        stopVisualization();
    }
    else if (index < currentSongIndex.value) {
        currentSongIndex.value--;
    }
    playlist.value.splice(index, 1);
};
var clearPlaylist = function () {
    if (!audioElement.value)
        return;
    audioElement.value.pause();
    playlist.value = [];
    currentSongIndex.value = -1;
    isPlaying.value = false;
    stopVisualization();
};
var shufflePlaylist = function () {
    var _a;
    // Fisher-Yates 洗牌算法
    for (var i = playlist.value.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = playlist.value[i];
        if (temp && playlist.value[j]) {
            playlist.value[i] = playlist.value[j];
            playlist.value[j] = temp;
        }
    }
    // 如果正在播放，更新当前歌曲索引
    if (currentSongIndex.value >= 0) {
        var currentSongId_1 = (_a = currentSong.value) === null || _a === void 0 ? void 0 : _a.id;
        if (currentSongId_1) {
            currentSongIndex.value = playlist.value.findIndex(function (song) { return song && song.id === currentSongId_1; });
        }
    }
};
var toggleFavorite = function (index) {
    playlist.value[index].isFavorite = !playlist.value[index].isFavorite;
};
var triggerFileUpload = function () {
    var _a;
    (_a = fileInput.value) === null || _a === void 0 ? void 0 : _a.click();
};
var handleFileUpload = function (event) {
    var input = event.target;
    var files = input.files;
    if (!files)
        return;
    Array.from(files).forEach(function (file) {
        if (file.type.startsWith('audio/')) {
            var newSong = {
                id: Date.now().toString(),
                title: file.name.replace(/\.[^/.]+$/, ''),
                artist: '未知艺术家',
                album: '未知专辑',
                albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
                duration: 180, // 默认时长，实际应该解析音频文件
                file: file,
            };
            playlist.value.push(newSong);
        }
    });
    input.value = '';
};
// 音频事件处理
var handleTimeUpdate = function () {
    if (audioElement.value) {
        currentTime.value = audioElement.value.currentTime;
    }
};
var handleEnded = function () {
    if (repeatMode.value === 'one') {
        if (audioElement.value) {
            audioElement.value.currentTime = 0;
            audioElement.value.play();
        }
    }
    else {
        nextSong();
    }
};
// 音频可视化
var animationFrameId = null;
var initCanvas = function () {
    if (canvasRef.value) {
        canvasContext.value = canvasRef.value.getContext('2d');
        if (canvasContext.value) {
            canvasRef.value.width = 400;
            canvasRef.value.height = 100;
        }
    }
};
var drawVisualization = function () {
    if (!canvasContext.value || !audioAnalyser.value || !frequencyData.value)
        return;
    audioAnalyser.value.getByteFrequencyData(frequencyData.value);
    canvasContext.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    var barWidth = (canvasRef.value.width / frequencyData.value.length) * 2.5;
    var x = 0;
    for (var i = 0; i < frequencyData.value.length; i++) {
        var barHeight = (frequencyData.value[i] / 255) * canvasRef.value.height;
        canvasContext.value.fillStyle = "rgb(".concat(Math.floor(255 - frequencyData.value[i]), ", ").concat(Math.floor(frequencyData.value[i]), ", 200)");
        canvasContext.value.fillRect(x, canvasRef.value.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
    animationFrameId = requestAnimationFrame(drawVisualization);
};
var startVisualization = function () {
    if (!animationFrameId) {
        drawVisualization();
    }
};
var stopVisualization = function () {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
};
// 加载音乐数据
var loadMusicData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                isLoading.value = true;
                return [4 /*yield*/, musicAPI.getMusicData()
                    // 更新数据（如果后端有提供）
                ];
            case 1:
                response = _a.sent();
                // 更新数据（如果后端有提供）
                if (response && response.data && response.data.playlist) {
                    playlist.value = response.data.playlist;
                }
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                console.error('加载音乐数据失败:', error_1);
                return [3 /*break*/, 4];
            case 3:
                isLoading.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 生命周期
onMounted(function () {
    loadMusicData();
    initCanvas();
    // 初始化播放器
    if (playlist.value.length > 0) {
        currentSongIndex.value = 0;
    }
});
onUnmounted(function () {
    if (audioElement.value) {
        audioElement.value.pause();
        audioElement.value.src = '';
    }
    stopVisualization();
    if (audioContext.value) {
        audioContext.value.close();
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['album-art']} */ ;
/** @type {__VLS_StyleScopedClasses['album-art']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['playing']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['playing']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-handle']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['play-pause-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['volume-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['playing']} */ ;
/** @type {__VLS_StyleScopedClasses['item-art']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-art']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['favorite-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-playlist']} */ ;
/** @type {__VLS_StyleScopedClasses['source-info']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['now-playing']} */ ;
/** @type {__VLS_StyleScopedClasses['album-art']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-container']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-canvas']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-left']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-info']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-duration']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['play-pause-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['album-art']} */ ;
/** @type {__VLS_StyleScopedClasses['song-title']} */ ;
/** @type {__VLS_StyleScopedClasses['song-artist']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-canvas']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "music-page" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "page-title" }));
var __VLS_0 = {}.MusicIcon;
/** @type {[typeof __VLS_components.MusicIcon, ]} */ ;
// @ts-ignore
MusicIcon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (24),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        size: (24),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "page-description" }));
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "player-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "player-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "now-playing" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "album-art" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: ((_a = __VLS_ctx.currentSong) === null || _a === void 0 ? void 0 : _a.albumArt),
    alt: ((_b = __VLS_ctx.currentSong) === null || _b === void 0 ? void 0 : _b.title),
});
// @ts-ignore
[currentSong, currentSong,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "playing-indicator" }, { class: ({ playing: __VLS_ctx.isPlaying }) }));
// @ts-ignore
[isPlaying,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "song-info" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "song-title" }));
(((_c = __VLS_ctx.currentSong) === null || _c === void 0 ? void 0 : _c.title) || '选择歌曲开始播放');
// @ts-ignore
[currentSong,];
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "song-artist" }));
((_d = __VLS_ctx.currentSong) === null || _d === void 0 ? void 0 : _d.artist);
// @ts-ignore
[currentSong,];
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "song-album" }));
((_e = __VLS_ctx.currentSong) === null || _e === void 0 ? void 0 : _e.album);
// @ts-ignore
[currentSong,];
if (__VLS_ctx.isPlaying) {
    // @ts-ignore
    [isPlaying,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "visualization-container" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.canvas, __VLS_intrinsics.canvas)(__assign({ ref: "canvasRef" }, { class: "visualization-canvas" }));
    /** @type {typeof __VLS_ctx.canvasRef} */ ;
    // @ts-ignore
    [canvasRef,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "player-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "progress-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "time-display" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "current-time" }));
(__VLS_ctx.formatTime(__VLS_ctx.currentTime));
// @ts-ignore
[formatTime, currentTime,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "duration" }));
(__VLS_ctx.formatTime(((_f = __VLS_ctx.currentSong) === null || _f === void 0 ? void 0 : _f.duration) || 0));
// @ts-ignore
[currentSong, formatTime,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.seekToPosition) }, { class: "progress-bar" }));
// @ts-ignore
[seekToPosition,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "progress-fill" }, { style: ({ width: __VLS_ctx.progressPercentage + '%' }) }));
// @ts-ignore
[progressPercentage,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "progress-handle" }, { style: ({ left: __VLS_ctx.progressPercentage + '%' }) }));
// @ts-ignore
[progressPercentage,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "control-buttons" }));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign({ onClick: (__VLS_ctx.toggleShuffle) }, { class: "control-btn" }), { class: ({ active: __VLS_ctx.isShuffle }) }), { title: "随机播放" }));
// @ts-ignore
[toggleShuffle, isShuffle,];
var __VLS_5 = {}.ShuffleIcon;
/** @type {[typeof __VLS_components.ShuffleIcon, ]} */ ;
// @ts-ignore
ShuffleIcon;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    size: (20),
}));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
        size: (20),
    }], __VLS_functionalComponentArgsRest(__VLS_6), false));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.previousSong) }, { class: "control-btn prev-btn" }), { title: "上一曲" }));
// @ts-ignore
[previousSong,];
var __VLS_10 = {}.SkipBackIcon;
/** @type {[typeof __VLS_components.SkipBackIcon, ]} */ ;
// @ts-ignore
SkipBackIcon;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    size: (24),
}));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
        size: (24),
    }], __VLS_functionalComponentArgsRest(__VLS_11), false));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.togglePlay) }, { class: "play-pause-btn" }), { title: (__VLS_ctx.isPlaying ? '暂停' : '播放') }));
// @ts-ignore
[isPlaying, togglePlay,];
if (__VLS_ctx.isPlaying) {
    // @ts-ignore
    [isPlaying,];
    var __VLS_15 = {}.PauseIcon;
    /** @type {[typeof __VLS_components.PauseIcon, ]} */ ;
    // @ts-ignore
    PauseIcon;
    // @ts-ignore
    var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        size: (32),
    }));
    var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
            size: (32),
        }], __VLS_functionalComponentArgsRest(__VLS_16), false));
}
else {
    var __VLS_20 = {}.PlayIcon;
    /** @type {[typeof __VLS_components.PlayIcon, ]} */ ;
    // @ts-ignore
    PlayIcon;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        size: (32),
    }));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
            size: (32),
        }], __VLS_functionalComponentArgsRest(__VLS_21), false));
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.nextSong) }, { class: "control-btn next-btn" }), { title: "下一曲" }));
// @ts-ignore
[nextSong,];
var __VLS_25 = {}.SkipForwardIcon;
/** @type {[typeof __VLS_components.SkipForwardIcon, ]} */ ;
// @ts-ignore
SkipForwardIcon;
// @ts-ignore
var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    size: (24),
}));
var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
        size: (24),
    }], __VLS_functionalComponentArgsRest(__VLS_26), false));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign({ onClick: (__VLS_ctx.toggleRepeat) }, { class: "control-btn" }), { class: ({ active: __VLS_ctx.isRepeat }) }), { title: (__VLS_ctx.repeatMode === 'one' ? '单曲循环' : '列表循环') }));
// @ts-ignore
[toggleRepeat, isRepeat, repeatMode,];
var __VLS_30 = {}.RepeatIcon;
/** @type {[typeof __VLS_components.RepeatIcon, ]} */ ;
// @ts-ignore
RepeatIcon;
// @ts-ignore
var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    size: (20),
}));
var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{
        size: (20),
    }], __VLS_functionalComponentArgsRest(__VLS_31), false));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "volume-control" }));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.toggleMute) }, { class: "volume-btn" }), { title: (__VLS_ctx.isMuted ? '取消静音' : '静音') }));
// @ts-ignore
[toggleMute, isMuted,];
if (__VLS_ctx.isMuted) {
    // @ts-ignore
    [isMuted,];
    var __VLS_35 = {}.VolumeXIcon;
    /** @type {[typeof __VLS_components.VolumeXIcon, ]} */ ;
    // @ts-ignore
    VolumeXIcon;
    // @ts-ignore
    var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        size: (20),
    }));
    var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([{
            size: (20),
        }], __VLS_functionalComponentArgsRest(__VLS_36), false));
}
else {
    var __VLS_40 = {}.Volume2Icon;
    /** @type {[typeof __VLS_components.Volume2Icon, ]} */ ;
    // @ts-ignore
    Volume2Icon;
    // @ts-ignore
    var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        size: (20),
    }));
    var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
            size: (20),
        }], __VLS_functionalComponentArgsRest(__VLS_41), false));
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.setVolume) }, { class: "volume-bar" }));
// @ts-ignore
[setVolume,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "volume-fill" }, { style: ({ width: (__VLS_ctx.isMuted ? 0 : __VLS_ctx.volume) * 100 + '%' }) }));
// @ts-ignore
[isMuted, volume,];
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "playlist-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "playlist-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-left" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "playlist-info" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.filteredPlaylist.length);
// @ts-ignore
[filteredPlaylist,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.formatTotalDuration());
// @ts-ignore
[formatTotalDuration,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "search-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "search-box" }));
var __VLS_45 = {}.SearchIcon;
/** @type {[typeof __VLS_components.SearchIcon, ]} */ ;
// @ts-ignore
SearchIcon;
// @ts-ignore
var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45(__assign({ size: (18) }, { class: "search-icon" })));
var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([__assign({ size: (18) }, { class: "search-icon" })], __VLS_functionalComponentArgsRest(__VLS_46), false));
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ type: "text", value: (__VLS_ctx.searchQuery), placeholder: "搜索歌曲、艺术家或专辑..." }, { class: "search-input" }));
// @ts-ignore
[searchQuery,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "playlist-container" }));
var _loop_1 = function (song, index) {
    // @ts-ignore
    [filteredPlaylist,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.playSong(__VLS_ctx.playlist.indexOf(song));
            // @ts-ignore
            [playSong, playlist,];
        } }, { key: (song.id) }), { class: ([
            'playlist-item',
            {
                active: __VLS_ctx.currentSongIndex === __VLS_ctx.playlist.indexOf(song),
                playing: __VLS_ctx.currentSongIndex === __VLS_ctx.playlist.indexOf(song) && __VLS_ctx.isPlaying,
            },
        ]) }));
    // @ts-ignore
    [isPlaying, playlist, playlist, currentSongIndex, currentSongIndex,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-number" }));
    if (__VLS_ctx.currentSongIndex === __VLS_ctx.playlist.indexOf(song) && __VLS_ctx.isPlaying) {
        // @ts-ignore
        [isPlaying, playlist, currentSongIndex,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "playing-icon" }));
        var __VLS_50 = {}.MusicIcon;
        /** @type {[typeof __VLS_components.MusicIcon, ]} */ ;
        // @ts-ignore
        MusicIcon;
        // @ts-ignore
        var __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
            size: (16),
        }));
        var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
                size: (16),
            }], __VLS_functionalComponentArgsRest(__VLS_51), false));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.filteredPlaylist.indexOf(song) + 1);
        // @ts-ignore
        [filteredPlaylist,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-art" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (song.albumArt),
        alt: (song.title),
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-title" }));
    (song.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-artist" }));
    (song.artist);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-duration" }));
    (__VLS_ctx.formatTime(song.duration));
    // @ts-ignore
    [formatTime,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "item-actions" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.toggleFavorite(__VLS_ctx.playlist.indexOf(song));
            // @ts-ignore
            [playlist, toggleFavorite,];
        } }, { class: "action-btn favorite-btn" }), { class: ({ active: song.isFavorite }) }), { title: "收藏" }));
    var __VLS_55 = {}.HeartIcon;
    /** @type {[typeof __VLS_components.HeartIcon, ]} */ ;
    // @ts-ignore
    HeartIcon;
    // @ts-ignore
    var __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        size: (16),
    }));
    var __VLS_57 = __VLS_56.apply(void 0, __spreadArray([{
            size: (16),
        }], __VLS_functionalComponentArgsRest(__VLS_56), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.removeFromPlaylist(__VLS_ctx.playlist.indexOf(song));
            // @ts-ignore
            [playlist, removeFromPlaylist,];
        } }, { class: "action-btn" }), { title: "从播放列表移除" }));
};
for (var _i = 0, _g = __VLS_getVForSourceType((__VLS_ctx.filteredPlaylist)); _i < _g.length; _i++) {
    var _h = _g[_i], song = _h[0], index = _h[1];
    _loop_1(song, index);
}
if (__VLS_ctx.filteredPlaylist.length === 0) {
    // @ts-ignore
    [filteredPlaylist,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "empty-playlist" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "playlist-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.clearPlaylist) }, { class: "btn btn-secondary" }), { disabled: (__VLS_ctx.playlist.length === 0) }));
// @ts-ignore
[playlist, clearPlaylist,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.shufflePlaylist) }, { class: "btn btn-primary" }), { disabled: (__VLS_ctx.playlist.length === 0) }));
// @ts-ignore
[playlist, shufflePlaylist,];
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "music-source-section" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "source-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "source-upload" }));
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign(__assign({ onChange: (__VLS_ctx.handleFileUpload) }, { type: "file", ref: "fileInput", accept: "audio/*", multiple: true }), { style: {} }));
/** @type {typeof __VLS_ctx.fileInput} */ ;
// @ts-ignore
[handleFileUpload, fileInput,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.triggerFileUpload) }, { class: "btn btn-primary" }));
// @ts-ignore
[triggerFileUpload,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "source-info" }));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.audio)(__assign(__assign(__assign({ onTimeupdate: (__VLS_ctx.handleTimeUpdate) }, { onEnded: (__VLS_ctx.handleEnded) }), { ref: "audioElement" }), { style: {} }));
/** @type {typeof __VLS_ctx.audioElement} */ ;
// @ts-ignore
[handleTimeUpdate, handleEnded, audioElement,];
/** @type {__VLS_StyleScopedClasses['music-page']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['page-description']} */ ;
/** @type {__VLS_StyleScopedClasses['player-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['player-container']} */ ;
/** @type {__VLS_StyleScopedClasses['now-playing']} */ ;
/** @type {__VLS_StyleScopedClasses['album-art']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['playing']} */ ;
/** @type {__VLS_StyleScopedClasses['song-info']} */ ;
/** @type {__VLS_StyleScopedClasses['song-title']} */ ;
/** @type {__VLS_StyleScopedClasses['song-artist']} */ ;
/** @type {__VLS_StyleScopedClasses['song-album']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-container']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-canvas']} */ ;
/** @type {__VLS_StyleScopedClasses['player-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-section']} */ ;
/** @type {__VLS_StyleScopedClasses['time-display']} */ ;
/** @type {__VLS_StyleScopedClasses['current-time']} */ ;
/** @type {__VLS_StyleScopedClasses['duration']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-handle']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['prev-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['play-pause-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['next-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['control-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['volume-control']} */ ;
/** @type {__VLS_StyleScopedClasses['volume-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['volume-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['volume-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-left']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-info']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-container']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['playing']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-number']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['item-art']} */ ;
/** @type {__VLS_StyleScopedClasses['item-info']} */ ;
/** @type {__VLS_StyleScopedClasses['item-title']} */ ;
/** @type {__VLS_StyleScopedClasses['item-artist']} */ ;
/** @type {__VLS_StyleScopedClasses['item-duration']} */ ;
/** @type {__VLS_StyleScopedClasses['item-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['favorite-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-playlist']} */ ;
/** @type {__VLS_StyleScopedClasses['playlist-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['music-source-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['source-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['source-upload']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['source-info']} */ ;
var __VLS_export = (await import('vue')).defineComponent({});
export default {};
