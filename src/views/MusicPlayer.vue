<template>
  <div class="music-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><MusicIcon size="24" /> 网页音乐播放器</h1>
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
                🔀
              </button>

              <button class="control-btn prev-btn" @click="previousSong" title="上一曲">⏮️</button>

              <button
                class="play-pause-btn"
                @click="togglePlay"
                :title="isPlaying ? '暂停' : '播放'"
              >
                {{ isPlaying ? '⏸️' : '▶️' }}
              </button>

              <button class="control-btn next-btn" @click="nextSong" title="下一曲">⏭️</button>

              <button
                class="control-btn"
                :class="{ active: isRepeat }"
                @click="toggleRepeat"
                :title="repeatMode === 'one' ? '单曲循环' : '列表循环'"
              >
                {{ repeatMode === 'one' ? '🔂' : '🔁' }}
              </button>
            </div>

            <!-- 音量控制 -->
            <div class="volume-control">
              <button class="volume-btn" @click="toggleMute" :title="isMuted ? '取消静音' : '静音'">
                {{ volumeIcon }}
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
          <h2 class="section-title">播放列表</h2>
          <div class="playlist-info">
            <span>{{ playlist.length }} 首歌曲</span>
            <span>{{ formatTotalDuration() }}</span>
          </div>
        </div>

        <div class="playlist-container">
          <div
            v-for="(song, index) in playlist"
            :key="song.id"
            :class="[
              'playlist-item',
              {
                active: currentSongIndex === index,
                playing: currentSongIndex === index && isPlaying,
              },
            ]"
            @click="playSong(index)"
          >
            <div class="item-number">
              <span v-if="currentSongIndex === index && isPlaying">
                <FontAwesomeIcon icon="music" />
              </span>
              <span v-else>
                {{ index + 1 }}
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
                class="action-btn"
                @click.stop="removeFromPlaylist(index)"
                title="从播放列表移除"
              >
                ❌
              </button>
            </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { musicAPI } from '@/services/api'

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
}

// 播放列表数据
const playlist = ref<Song[]>([
  {
    id: '1',
    title: '示例歌曲 1',
    artist: '示例艺术家',
    album: '示例专辑',
    albumArt: 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Album+1',
    duration: 180,
  },
  {
    id: '2',
    title: '示例歌曲 2',
    artist: '示例艺术家',
    album: '示例专辑',
    albumArt: 'https://via.placeholder.com/300x300/50E3C2/FFFFFF?text=Album+2',
    duration: 240,
  },
  {
    id: '3',
    title: '示例歌曲 3',
    artist: '示例艺术家',
    album: '示例专辑',
    albumArt: 'https://via.placeholder.com/300x300/B8E986/FFFFFF?text=Album+3',
    duration: 195,
  },
  {
    id: '4',
    title: '示例歌曲 4',
    artist: '示例艺术家',
    album: '示例专辑',
    albumArt: 'https://via.placeholder.com/300x300/F5A623/FFFFFF?text=Album+4',
    duration: 210,
  },
  {
    id: '5',
    title: '示例歌曲 5',
    artist: '示例艺术家',
    album: '示例专辑',
    albumArt: 'https://via.placeholder.com/300x300/9013FE/FFFFFF?text=Album+5',
    duration: 185,
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

// DOM 引用
const fileInput = ref<HTMLInputElement>()

// 计算属性
const currentSong = computed(() => {
  return currentSongIndex.value >= 0 ? playlist.value[currentSongIndex.value] : null
})

const progressPercentage = computed(() => {
  if (!currentSong.value) return 0
  return (currentTime.value / currentSong.value.duration) * 100
})

const volumeIcon = computed(() => {
  if (isMuted.value || volume.value === 0) return '🔇'
  if (volume.value < 0.3) return '🔈'
  if (volume.value < 0.7) return '🔉'
  return '🔊'
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

const playSong = (index: number) => {
  currentSongIndex.value = index
  isPlaying.value = true
  // 这里应该开始播放音频，目前是模拟播放
  startPlaybackSimulation()
}

const togglePlay = () => {
  if (currentSongIndex.value === -1 && playlist.value.length > 0) {
    playSong(0)
    return
  }

  isPlaying.value = !isPlaying.value

  if (isPlaying.value) {
    startPlaybackSimulation()
  } else {
    stopPlaybackSimulation()
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
  } else if (repeatMode.value === 'all') {
    repeatMode.value = 'one'
  } else {
    isRepeat.value = false
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

const setVolume = (event: MouseEvent) => {
  const volumeBar = event.currentTarget as HTMLElement
  const rect = volumeBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const newVolume = Math.max(0, Math.min(1, clickX / rect.width))

  volume.value = newVolume
  isMuted.value = newVolume === 0
}

const seekToPosition = (event: MouseEvent) => {
  if (!currentSong.value) return

  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, clickX / rect.width))

  currentTime.value = currentSong.value.duration * percentage
}

const removeFromPlaylist = (index: number) => {
  if (index === currentSongIndex.value) {
    stopPlaybackSimulation()
    currentSongIndex.value = -1
    isPlaying.value = false
  } else if (index < currentSongIndex.value) {
    currentSongIndex.value--
  }

  playlist.value.splice(index, 1)
}

const clearPlaylist = () => {
  stopPlaybackSimulation()
  playlist.value = []
  currentSongIndex.value = -1
  isPlaying.value = false
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
        albumArt: 'https://via.placeholder.com/300x300/666666/FFFFFF?text=Upload',
        duration: 180, // 默认时长，实际应该解析音频文件
        file: file,
      }

      playlist.value.push(newSong)
    }
  })

  input.value = ''
}

// 播放模拟
let playbackInterval: number | null = null

const startPlaybackSimulation = () => {
  if (playbackInterval) {
    clearInterval(playbackInterval)
  }

  playbackInterval = window.setInterval(() => {
    if (isPlaying.value && currentSong.value) {
      currentTime.value += 1

      if (currentTime.value >= currentSong.value.duration) {
        if (repeatMode.value === 'one') {
          currentTime.value = 0
        } else {
          nextSong()
        }
      }
    }
  }, 1000)
}

const stopPlaybackSimulation = () => {
  if (playbackInterval) {
    clearInterval(playbackInterval)
    playbackInterval = null
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

  // 初始化播放器
  if (playlist.value.length > 0) {
    currentSongIndex.value = 0
  }
})

onUnmounted(() => {
  stopPlaybackSimulation()
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
  transition: opacity 0.2s ease;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
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
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  opacity: 0.7;
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
  font-size: 2rem;
  cursor: pointer;
  padding: var(--spacing-md);
  border-radius: 50%;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
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
  font-size: 1.2rem;
  cursor: pointer;
  padding: var(--spacing-xs);
  opacity: 0.7;
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
}

.section-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.playlist-info {
  display: flex;
  gap: var(--spacing-lg);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
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
}

.action-btn:hover {
  opacity: 1;
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

  .control-buttons {
    gap: var(--spacing-md);
  }

  .playlist-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
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
    font-size: 1.2rem;
    padding: var(--spacing-xs);
  }

  .play-pause-btn {
    font-size: 1.5rem;
    padding: var(--spacing-sm);
  }
}
</style>
