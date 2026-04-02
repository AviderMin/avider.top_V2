<template>
  <div class="music-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><MusicIcon :size="24" /> 网页音乐播放器</h1>
        <p class="page-description">在线音乐播放，支持播放列表管理和音量控制</p>
      </div>
    </section>

    <!-- 播放器主界面 -->
    <section class="player-section">
      <div class="container">
        <div class="player-container">
          <!-- 当前播放信息 -->
          <div class="now-playing">
            <div class="album-art">
              <img :src="currentSong?.albumArt" :alt="currentSong?.title" />
              <div class="playing-indicator" :class="{ playing: isPlaying }">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div class="song-info">
              <h3 class="song-title">{{ currentSong?.title || '选择歌曲开始播放' }}</h3>
              <p class="song-artist">{{ currentSong?.artist }}</p>
              <p class="song-album">{{ currentSong?.album }}</p>
            </div>
          </div>

          <!-- 音频可视化 -->
          <div class="visualization-container" v-if="isPlaying">
            <canvas ref="canvasRef" class="visualization-canvas"></canvas>
          </div>

          <!-- 播放控制区域 -->
          <div class="player-controls">
            <!-- 进度条 -->
            <div class="progress-section">
              <div class="time-display">
                <span class="current-time">{{ formatTime(currentTime) }}</span>
                <span class="duration">{{ formatTime(currentSong?.duration || 0) }}</span>
              </div>

              <div class="progress-bar" @click="seekToPosition">
                <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
                <div class="progress-handle" :style="{ left: progressPercentage + '%' }"></div>
              </div>
            </div>

            <!-- 控制按钮 -->
            <div class="control-buttons">
              <button
                class="control-btn"
                :class="{ active: isShuffle }"
                @click="toggleShuffle"
                title="随机播放"
              >
                <ShuffleIcon :size="20" />
              </button>

              <button class="control-btn prev-btn" @click="previousSong" title="上一曲">
                <SkipBackIcon :size="24" />
              </button>

              <button
                class="play-pause-btn"
                @click="togglePlay"
                :title="isPlaying ? '暂停' : '播放'"
              >
                <PauseIcon v-if="isPlaying" :size="32" />
                <PlayIcon v-else :size="32" />
              </button>

              <button class="control-btn next-btn" @click="nextSong" title="下一曲">
                <SkipForwardIcon :size="24" />
              </button>

              <button
                class="control-btn"
                :class="{ active: isRepeat }"
                @click="toggleRepeat"
                :title="repeatMode === 'one' ? '单曲循环' : '列表循环'"
              >
                <RepeatIcon :size="20" />
              </button>
            </div>

            <!-- 音量控制 -->
            <div class="volume-control">
              <button class="volume-btn" @click="toggleMute" :title="isMuted ? '取消静音' : '静音'">
                <VolumeXIcon v-if="isMuted" :size="20" />
                <Volume2Icon v-else :size="20" />
              </button>

              <div class="volume-bar" @click="setVolume">
                <div
                  class="volume-fill"
                  :style="{ width: (isMuted ? 0 : volume) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 播放列表 -->
    <section class="playlist-section">
      <div class="container">
        <div class="playlist-header">
          <div class="header-left">
            <h2 class="section-title">播放列表</h2>
            <div class="playlist-info">
              <span>{{ filteredPlaylist.length }} 首歌曲</span>
              <span>{{ formatTotalDuration() }}</span>
            </div>
          </div>
          
          <!-- 搜索功能 -->
          <div class="search-container">
            <div class="search-box">
              <SearchIcon :size="18" class="search-icon" />
              <input
                type="text"
                v-model="searchQuery"
                placeholder="搜索歌曲、艺术家或专辑..."
                class="search-input"
              />
            </div>
          </div>
        </div>

        <div class="playlist-container">
          <div
            v-for="(song, index) in filteredPlaylist"
            :key="song.id"
            :class="[
              'playlist-item',
              {
                active: currentSongIndex === playlist.indexOf(song),
                playing: currentSongIndex === playlist.indexOf(song) && isPlaying,
              },
            ]"
            @click="playSong(playlist.indexOf(song))"
          >
            <div class="item-number">
              <span v-if="currentSongIndex === playlist.indexOf(song) && isPlaying" class="playing-icon">
                <MusicIcon :size="16" />
              </span>
              <span v-else>
                {{ filteredPlaylist.indexOf(song) + 1 }}
              </span>
            </div>

            <div class="item-art">
              <img :src="song.albumArt" :alt="song.title" />
            </div>

            <div class="item-info">
              <div class="item-title">{{ song.title }}</div>
              <div class="item-artist">{{ song.artist }}</div>
            </div>

            <div class="item-duration">{{ formatTime(song.duration) }}</div>

            <div class="item-actions">
              <button
                class="action-btn favorite-btn"
                @click.stop="toggleFavorite(playlist.indexOf(song))"
                :class="{ active: song.isFavorite }"
                title="收藏"
              >
                <HeartIcon :size="16" />
              </button>
              <button
                class="action-btn"
                @click.stop="removeFromPlaylist(playlist.indexOf(song))"
                title="从播放列表移除"
              >
                ❌
              </button>
            </div>
          </div>
          
          <!-- 搜索结果为空时显示 -->
          <div v-if="filteredPlaylist.length === 0" class="empty-playlist">
            <p>没有找到匹配的歌曲</p>
          </div>
        </div>

        <!-- 播放列表控制 -->
        <div class="playlist-controls">
          <button
            class="btn btn-secondary"
            @click="clearPlaylist"
            :disabled="playlist.length === 0"
          >
            清空列表
          </button>

          <button
            class="btn btn-primary"
            @click="shufflePlaylist"
            :disabled="playlist.length === 0"
          >
            随机排序
          </button>
        </div>
      </div>
    </section>

    <!-- 音乐源管理 -->
    <section class="music-source-section">
      <div class="container">
        <h2 class="section-title">音乐源管理</h2>

        <div class="source-controls">
          <div class="source-upload">
            <input
              type="file"
              ref="fileInput"
              accept="audio/*"
              multiple
              @change="handleFileUpload"
              style="display: none"
            />
            <button class="btn btn-primary" @click="triggerFileUpload">上传本地音乐</button>
          </div>

          <div class="source-info">
            <p>支持上传 MP3、WAV、FLAC 等音频格式</p>
            <p>最大文件大小: 50MB</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 音频元素 -->
    <audio
      ref="audioElement"
      @timeupdate="handleTimeUpdate"
      @ended="handleEnded"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { musicAPI } from '@/services/api'
import { MusicIcon, SearchIcon, HeartIcon, DownloadIcon, RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, PlayIcon, PauseIcon, Volume2Icon, VolumeXIcon } from 'lucide-vue-next'

// 歌曲接口定义
interface Song {
  id: string
  title: string
  artist: string
  album: string
  albumArt: string
  duration: number // 秒
  url?: string
  file?: File
  isFavorite?: boolean
}

// 播放列表数据
const playlist = ref<Song[]>([
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
])

// 播放器状态
const currentSongIndex = ref<number>(-1)
const isPlaying = ref(false)
const currentTime = ref(0)
const volume = ref(0.7)
const isMuted = ref(false)
const isShuffle = ref(false)
const isRepeat = ref(false)
const repeatMode = ref<'all' | 'one'>('all')
const isLoading = ref(true)
const searchQuery = ref('')
const showLyrics = ref(false)

// 音频元素引用
const audioElement = ref<HTMLAudioElement>()
// 音频上下文和分析器
const audioContext = ref<AudioContext | null>(null)
const audioAnalyser = ref<AnalyserNode | null>(null)
const audioSource = ref<MediaElementAudioSourceNode | null>(null)
// 频谱数据
const frequencyData = ref<Uint8Array<ArrayBuffer> | null>(null)

// DOM 引用
const fileInput = ref<HTMLInputElement>()
const canvasRef = ref<HTMLCanvasElement>()
const canvasContext = ref<CanvasRenderingContext2D | null>(null)

// 计算属性
const currentSong = computed(() => {
  return currentSongIndex.value >= 0 ? playlist.value[currentSongIndex.value] : null
})

const progressPercentage = computed(() => {
  if (!currentSong.value) return 0
  return (currentTime.value / currentSong.value.duration) * 100
})

const volumeIcon = computed(() => {
  if (isMuted.value || volume.value === 0) return 'volume-x'
  if (volume.value < 0.3) return 'volume-2'
  return 'volume-2'
})

const filteredPlaylist = computed(() => {
  if (!searchQuery.value.trim()) {
    return playlist.value
  }
  const query = searchQuery.value.toLowerCase()
  return playlist.value.filter(song => 
    song.title.toLowerCase().includes(query) || 
    song.artist.toLowerCase().includes(query) ||
    song.album.toLowerCase().includes(query)
  )
})

// 方法
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatTotalDuration = (): string => {
  const totalSeconds = playlist.value.reduce((sum, song) => sum + song.duration, 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}

const initAudioContext = () => {
  if (!audioContext.value) {
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioAnalyser.value = audioContext.value.createAnalyser()
    audioAnalyser.value.fftSize = 256
    const buffer = new ArrayBuffer(audioAnalyser.value.frequencyBinCount)
    frequencyData.value = new Uint8Array(buffer)
  }
}

const connectAudioSource = () => {
  if (audioElement.value && audioContext.value && audioAnalyser.value) {
    audioSource.value = audioContext.value.createMediaElementSource(audioElement.value)
    audioSource.value.connect(audioAnalyser.value)
    audioAnalyser.value.connect(audioContext.value.destination)
  }
}

const playSong = (index: number) => {
  if (!audioElement.value) return
  
  currentSongIndex.value = index
  const song = playlist.value[index]
  
  if (song.url) {
    audioElement.value.src = song.url
  } else if (song.file) {
    audioElement.value.src = URL.createObjectURL(song.file)
  }
  
  audioElement.value.play().then(() => {
    isPlaying.value = true
    initAudioContext()
    connectAudioSource()
    startVisualization()
  }).catch(error => {
    console.error('播放失败:', error)
  })
}

const togglePlay = () => {
  if (!audioElement.value) return
  
  if (currentSongIndex.value === -1 && playlist.value.length > 0) {
    playSong(0)
    return
  }

  if (isPlaying.value) {
    audioElement.value.pause()
    isPlaying.value = false
    stopVisualization()
  } else {
    audioElement.value.play().then(() => {
      isPlaying.value = true
      initAudioContext()
      connectAudioSource()
      startVisualization()
    }).catch(error => {
      console.error('播放失败:', error)
    })
  }
}

const previousSong = () => {
  if (playlist.value.length === 0) return

  let newIndex: number
  if (isShuffle.value) {
    newIndex = Math.floor(Math.random() * playlist.value.length)
  } else {
    newIndex = currentSongIndex.value - 1
    if (newIndex < 0) newIndex = playlist.value.length - 1
  }

  playSong(newIndex)
}

const nextSong = () => {
  if (playlist.value.length === 0) return

  let newIndex: number
  if (isShuffle.value) {
    newIndex = Math.floor(Math.random() * playlist.value.length)
  } else {
    newIndex = currentSongIndex.value + 1
    if (newIndex >= playlist.value.length) newIndex = 0
  }

  playSong(newIndex)
}

const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

const toggleRepeat = () => {
  if (!isRepeat.value) {
    isRepeat.value = true
    repeatMode.value = 'all'
    if (audioElement.value) {
      audioElement.value.loop = false
    }
  } else if (repeatMode.value === 'all') {
    repeatMode.value = 'one'
    if (audioElement.value) {
      audioElement.value.loop = true
    }
  } else {
    isRepeat.value = false
    repeatMode.value = 'all'
    if (audioElement.value) {
      audioElement.value.loop = false
    }
  }
}

const toggleMute = () => {
  if (!audioElement.value) return
  
  isMuted.value = !isMuted.value
  audioElement.value.muted = isMuted.value
}

const setVolume = (event: MouseEvent) => {
  if (!audioElement.value) return
  
  const volumeBar = event.currentTarget as HTMLElement
  const rect = volumeBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const newVolume = Math.max(0, Math.min(1, clickX / rect.width))

  volume.value = newVolume
  audioElement.value.volume = newVolume
  isMuted.value = newVolume === 0
}

const seekToPosition = (event: MouseEvent) => {
  if (!audioElement.value || !currentSong.value) return

  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, clickX / rect.width))

  const newTime = currentSong.value.duration * percentage
  audioElement.value.currentTime = newTime
  currentTime.value = newTime
}

const removeFromPlaylist = (index: number) => {
  if (!audioElement.value) return
  
  if (index === currentSongIndex.value) {
    audioElement.value.pause()
    currentSongIndex.value = -1
    isPlaying.value = false
    stopVisualization()
  } else if (index < currentSongIndex.value) {
    currentSongIndex.value--
  }

  playlist.value.splice(index, 1)
}

const clearPlaylist = () => {
  if (!audioElement.value) return
  
  audioElement.value.pause()
  playlist.value = []
  currentSongIndex.value = -1
  isPlaying.value = false
  stopVisualization()
}

const shufflePlaylist = () => {
  // Fisher-Yates 洗牌算法
  for (let i = playlist.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = playlist.value[i]
    if (temp && playlist.value[j]) {
      playlist.value[i] = playlist.value[j]
      playlist.value[j] = temp
    }
  }

  // 如果正在播放，更新当前歌曲索引
  if (currentSongIndex.value >= 0) {
    const currentSongId = currentSong.value?.id
    if (currentSongId) {
      currentSongIndex.value = playlist.value.findIndex((song) => song && song.id === currentSongId)
    }
  }
}

const toggleFavorite = (index: number) => {
  playlist.value[index].isFavorite = !playlist.value[index].isFavorite
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files

  if (!files) return

  Array.from(files).forEach((file) => {
    if (file.type.startsWith('audio/')) {
      const newSong: Song = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: '未知艺术家',
        album: '未知专辑',
        albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 180, // 默认时长，实际应该解析音频文件
        file: file,
      }

      playlist.value.push(newSong)
    }
  })

  input.value = ''
}

// 音频事件处理
const handleTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

const handleEnded = () => {
  if (repeatMode.value === 'one') {
    if (audioElement.value) {
      audioElement.value.currentTime = 0
      audioElement.value.play()
    }
  } else {
    nextSong()
  }
}

// 音频可视化
let animationFrameId: number | null = null

const initCanvas = () => {
  if (canvasRef.value) {
    canvasContext.value = canvasRef.value.getContext('2d')
    if (canvasContext.value) {
      canvasRef.value.width = 400
      canvasRef.value.height = 100
    }
  }
}

const drawVisualization = () => {
  if (!canvasContext.value || !audioAnalyser.value || !frequencyData.value) return
  
  audioAnalyser.value.getByteFrequencyData(frequencyData.value)
  
  canvasContext.value.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
  
  const barWidth = (canvasRef.value!.width / frequencyData.value.length) * 2.5
  let x = 0
  
  for (let i = 0; i < frequencyData.value.length; i++) {
    const barHeight = (frequencyData.value[i] / 255) * canvasRef.value!.height
    
    canvasContext.value.fillStyle = `rgb(${Math.floor(255 - frequencyData.value[i])}, ${Math.floor(frequencyData.value[i])}, 200)`
    canvasContext.value.fillRect(x, canvasRef.value!.height - barHeight, barWidth, barHeight)
    
    x += barWidth + 1
  }
  
  animationFrameId = requestAnimationFrame(drawVisualization)
}

const startVisualization = () => {
  if (!animationFrameId) {
    drawVisualization()
  }
}

const stopVisualization = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

// 加载音乐数据
const loadMusicData = async () => {
  try {
    isLoading.value = true
    const response = await musicAPI.getMusicData()

    // 更新数据（如果后端有提供）
    if (response && response.data && response.data.playlist) {
      playlist.value = response.data.playlist
    }
  } catch (error) {
    console.error('加载音乐数据失败:', error)
    // 使用默认数据继续显示
  } finally {
    isLoading.value = false
  }
}

// 生命周期
onMounted(() => {
  loadMusicData()
  initCanvas()

  // 初始化播放器
  if (playlist.value.length > 0) {
    currentSongIndex.value = 0
  }
})

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value.src = ''
  }
  stopVisualization()
  if (audioContext.value) {
    audioContext.value.close()
  }
})
</script>

<style scoped>
.music-page {
  min-height: 100vh;
  background: var(--background-secondary);
}

/* 页面标题区域 */
.page-header {
  background: var(--background-primary);
  padding: var(--spacing-xl) 0;
  border-bottom: 1px solid var(--border-color);
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.page-description {
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
}

/* 播放器主界面 */
.player-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-primary);
}

.player-container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--background-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.now-playing {
  display: flex;
  align-items: center;
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.album-art {
  position: relative;
  margin-right: var(--spacing-lg);
}

.album-art img {
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius-md);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-normal);
}

.album-art:hover img {
  transform: scale(1.05);
}

.playing-indicator {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
}

.playing-indicator span {
  width: 3px;
  height: 10px;
  background: white;
  border-radius: 2px;
  animation: none;
}

.playing-indicator.playing span:nth-child(1) {
  animation: soundWave 1s infinite ease-in-out;
}

.playing-indicator.playing span:nth-child(2) {
  animation: soundWave 1s infinite ease-in-out 0.2s;
}

.playing-indicator.playing span:nth-child(3) {
  animation: soundWave 1s infinite ease-in-out 0.4s;
}

@keyframes soundWave {
  0%,
  100% {
    height: 10px;
  }
  50% {
    height: 20px;
  }
}

.song-info {
  flex: 1;
}

.song-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.song-artist {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
  opacity: 0.9;
}

.song-album {
  font-size: var(--font-size-md);
  opacity: 0.8;
}

/* 音频可视化 */
.visualization-container {
  padding: var(--spacing-lg);
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.visualization-canvas {
  width: 100%;
  max-width: 600px;
  height: 80px;
  border-radius: var(--border-radius-md);
  background: rgba(0, 0, 0, 0.2);
}

/* 播放控制区域 */
.player-controls {
  padding: var(--spacing-xl);
}

.progress-section {
  margin-bottom: var(--spacing-lg);
}

.time-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.progress-bar {
  position: relative;
  height: 6px;
  background: var(--background-tertiary);
  border-radius: 3px;
  cursor: pointer;
  overflow: visible;
  transition: height var(--transition-fast);
}

.progress-bar:hover {
  height: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  border-radius: 3px;
  transition: width 0.1s ease;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: var(--primary-color);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}

.control-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  opacity: 0.7;
  color: var(--text-primary);
}

.control-btn:hover {
  opacity: 1;
  background: var(--background-tertiary);
}

.control-btn.active {
  opacity: 1;
  color: var(--primary-color);
}

.play-pause-btn {
  background: var(--primary-color);
  border: none;
  cursor: pointer;
  padding: var(--spacing-md);
  border-radius: 50%;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-pause-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  max-width: 200px;
  margin: 0 auto;
}

.volume-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  opacity: 0.7;
  color: var(--text-primary);
}

.volume-btn:hover {
  opacity: 1;
}

.volume-bar {
  flex: 1;
  height: 4px;
  background: var(--background-tertiary);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.volume-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  transition: width 0.1s ease;
}

/* 播放列表区域 */
.playlist-section {
  padding: var(--spacing-xxl) 0;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.header-left {
  flex: 1;
}

.section-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.playlist-info {
  display: flex;
  gap: var(--spacing-lg);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* 搜索功能 */
.search-container {
  flex: 0 0 300px;
  min-width: 200px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) calc(var(--spacing-md) + 24px);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  background: var(--background-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.playlist-container {
  max-height: 400px;
  overflow-y: auto;
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
}

.playlist-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.playlist-item:hover {
  background: var(--background-secondary);
}

.playlist-item.active {
  background: var(--primary-color-light);
  border-left: 4px solid var(--primary-color);
}

.playlist-item.playing {
  background: var(--primary-color-light);
}

.item-number {
  width: 40px;
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.playing-icon {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.item-art {
  width: 40px;
  height: 40px;
  margin-right: var(--spacing-md);
}

.item-art img {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  transition: transform var(--transition-fast);
}

.playlist-item:hover .item-art img {
  transform: scale(1.1);
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-artist {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.item-duration {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 var(--spacing-md);
}

.item-actions {
  opacity: 0;
  transition: opacity var(--transition-fast);
  display: flex;
  gap: var(--spacing-xs);
}

.playlist-item:hover .item-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: var(--spacing-xs);
  opacity: 0.7;
  color: var(--text-secondary);
}

.action-btn:hover {
  opacity: 1;
}

.favorite-btn {
  color: var(--text-secondary);
}

.favorite-btn.active {
  color: #ff4757;
  opacity: 1;
}

/* 空播放列表 */
.empty-playlist {
  padding: var(--spacing-xxl);
  text-align: center;
  color: var(--text-secondary);
}

.empty-playlist p {
  font-size: var(--font-size-lg);
}

.playlist-controls {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

/* 音乐源管理区域 */
.music-source-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-primary);
}

.source-controls {
  text-align: center;
}

.source-upload {
  margin-bottom: var(--spacing-lg);
}

.source-info {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.source-info p {
  margin: var(--spacing-xs) 0;
}

/* 按钮样式 */
.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-color-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:disabled {
  background: var(--background-tertiary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background: var(--background-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--background-tertiary);
  transform: translateY(-2px);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .now-playing {
    flex-direction: column;
    text-align: center;
  }

  .album-art {
    margin-right: 0;
    margin-bottom: var(--spacing-lg);
  }

  .visualization-container {
    padding: var(--spacing-md);
  }

  .visualization-canvas {
    height: 60px;
  }

  .control-buttons {
    gap: var(--spacing-md);
  }

  .playlist-header {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-md);
  }

  .header-left {
    text-align: center;
  }

  .search-container {
    flex: 1;
    min-width: auto;
  }

  .playlist-info {
    justify-content: center;
  }

  .playlist-item {
    padding: var(--spacing-sm);
  }

  .item-duration {
    display: none;
  }
}

@media (max-width: 480px) {
  .control-buttons {
    gap: var(--spacing-sm);
  }

  .control-btn {
    padding: var(--spacing-xs);
  }

  .play-pause-btn {
    padding: var(--spacing-sm);
  }

  .album-art img {
    width: 100px;
    height: 100px;
  }

  .song-title {
    font-size: var(--font-size-lg);
  }

  .song-artist {
    font-size: var(--font-size-md);
  }

  .visualization-canvas {
    height: 50px;
  }
}
</style>
