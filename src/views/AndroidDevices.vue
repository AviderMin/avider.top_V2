<template>
  <div class="android-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><BotIcon size="24" /> 安卓刷机工具</h1>
        <p class="page-description">提供红米Note12 Turbo、K40S、小米Pad5等设备的刷机资源下载</p>
      </div>
    </section>

    <!-- 设备卡片展示 -->
    <section class="devices-section">
      <div class="container">
        <div class="devices-grid">
          <div
            v-for="device in devices"
            :key="device.id"
            class="device-card"
          >
            <!-- 设备图片 -->
            <div class="device-image-container">
              <img
                :src="getDeviceImage(device)"
                :alt="device.name"
                class="device-image"
                loading="lazy"
                @error="handleImageError"
              />
            </div>

            <!-- 设备信息 -->
            <div class="device-content">
              <h3 class="device-name">{{ device.name }}</h3>
              <p class="device-codename">{{ device.id }}</p>
              <p class="device-description">{{ device.description }}</p>

              <!-- 资源统计 -->
              <div class="resource-stats">
                <span class="stat-item">
                  <FontAwesomeIcon icon="microchip" class="stat-icon" />
                  {{ device.kernels.length }} 个内核
                </span>
                <span class="stat-item">
                  <FontAwesomeIcon icon="tools" class="stat-icon" />
                  {{ device.recoveries.length }} 个Recovery
                </span>
              </div>
            </div>

            <!-- 资源下载按钮 -->
            <div class="resource-buttons">
              <button
                v-for="kernel in device.kernels"
                :key="kernel.id"
                class="resource-btn kernel-btn"
                @click="goToResourceDetail(device.id, 'kernel', kernel.id)"
              >
                内核 {{ kernel.version }}
              </button>
              <button
                v-for="recovery in device.recoveries"
                :key="recovery.id"
                class="resource-btn recovery-btn"
                @click="goToResourceDetail(device.id, 'recovery', recovery.id)"
              >
                橙狐 {{ recovery.version }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { androidAPI } from '@/services/api'

const router = useRouter()

// 设备数据（从后端API动态获取）
const devices = ref<any[]>([])

// 数据加载状态
const isLoading = ref(true)
const errorMessage = ref('')

// 从后端API加载设备数据
const loadDevices = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    // 调用后端API获取安卓设备数据
    const response = await androidAPI.getAndroidData()

    // 直接使用响应数据，因为axios拦截器已经返回了data
    if (response && (response as any).devices) {
      devices.value = (response as any).devices
    } else {
      throw new Error('设备数据格式错误')
    }
  } catch (error: any) {
    console.error('加载设备数据失败:', error)
    errorMessage.value = error.message || '加载设备数据失败，请检查后端服务是否正常运行'

    // 如果后端服务不可用，使用空数组
    devices.value = []
  } finally {
    isLoading.value = false
  }
}

// 下载统计
const downloadStats = ref<Record<string, number>>({})

// 计算属性
const totalDownloads = computed(() => {
  return Object.values(downloadStats.value).reduce((sum, count) => sum + count, 0)
})

const totalFiles = computed(() => {
  return devices.value.reduce((sum, device) => {
    return sum + device.kernels.length + device.recoveries.length
  }, 0)
})

// 方法
const getDownloadCount = (fileId: string) => {
  return downloadStats.value[fileId] || 0
}

// 跳转到资源详情页面
const goToResourceDetail = (deviceId: string, resourceType: string, resourceId: string) => {
  router.push(`/android/${deviceId}/${resourceType}/${resourceId}`)
}

// 获取设备图片路径
const getDeviceImage = (device: any) => {
  // 后端返回的路径是相对路径，直接使用即可
  // Vite会自动处理public目录下的静态资源
  if (device.image) {
    console.log('设备图片路径:', device.id)
    return device.image
  }
  // 默认图片路径
  return `/images/android/devices/${device.id}.png`
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // 设置默认图片
  img.src = '/images/android/default-device.png'
  console.warn(`设备图片加载失败: ${img.alt}`)
}

// 组件挂载时加载数据
onMounted(async () => {
  await loadDevices()

  // 加载下载统计
  try {
    const stats = await androidAPI.getDownloadStats()
    downloadStats.value = stats ? (stats as unknown as Record<string, number>) : {}
  } catch (error) {
    console.error('加载下载统计失败:', error)
    downloadStats.value = {}
  }
})
</script>

<style scoped>
.android-page {
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

/* 设备卡片展示区域 */
.devices-section {
  padding: var(--spacing-xxl) 0;
}

.devices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.device-card {
  background: var(--background-primary);
  border-radius: 16px;
  border: 1px solid #e9ecef;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  margin: 8px;
  position: relative;
}

.device-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(255, 215, 0, 0.15), 0 0 25px rgba(255, 240, 200, 0.5);
  border-color: #FFD700;
}

.device-image-container {
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.device-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: all 0.3s ease;
  padding: 16px;
}

.device-card:hover .device-image {
  transform: scale(1.03);
  filter: brightness(1.05);
}

.device-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.device-name {
  font-family: '黑体', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.device-codename {
  font-size: 13px;
  font-weight: 500;
  color: #6c757d;
  margin: 0;
  font-style: italic;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  align-self: flex-start;
}

.device-description {
  font-size: 14px;
  color: #495057;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.resource-stats {
  display: flex;
  gap: 20px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f1f3f4;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6c757d;
  font-weight: 500;
}

.stat-icon {
  font-size: 14px;
  color: #FFD700;
}

/* 资源按钮样式 */
.resource-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 20px 20px 20px;
}

.resource-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-align: center;
  flex: 1;
  position: relative;
  overflow: hidden;
}

.resource-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.resource-btn:hover::before {
  left: 100%;
}

.kernel-btn {
  background: linear-gradient(135deg, #FFD700, #FFE55C);
  color: #1a1a1a;
  box-shadow: 0 2px 12px rgba(255, 215, 0, 0.4);
}

.kernel-btn:hover {
  background: linear-gradient(135deg, #FFD700, #FFE55C, #FFF0C8);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.6), 0 0 25px rgba(255, 240, 200, 0.8);
}

.recovery-btn {
  background: linear-gradient(135deg, #FFD700, #FFE55C);
  color: #1a1a1a;
  box-shadow: 0 2px 12px rgba(255, 215, 0, 0.4);
}

.recovery-btn:hover {
  background: linear-gradient(135deg, #FFD700, #FFE55C, #FFF0C8);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.6), 0 0 25px rgba(255, 240, 200, 0.8);
}

/* 响应式设计 */

/* 统计区域 */
.stats-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-primary);
}

.section-title {
  text-align: center;
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background: var(--background-secondary);
  border-radius: var(--border-radius-lg);
  text-align: center;
}

.stat-icon {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
  color: var(--primary-color);
}

.stat-label {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .devices-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 var(--spacing-md);
  }

  .device-card {
    margin: 4px;
  }

  .device-image-container {
    height: 180px;
  }

  .device-content {
    padding: 16px;
  }

  .resource-stats {
    flex-direction: column;
    gap: 8px;
  }

  .resource-buttons {
    margin: 0 16px 16px 16px;
  }

  .resource-btn {
    padding: 12px 16px;
    font-size: 14px;
  }

  .modal-overlay {
    padding: var(--spacing-md);
  }

  .modal-content {
    max-height: 90vh;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-body {
    padding: 16px;
  }

  .download-item {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-lg);
  }

  .download-actions {
    flex-direction: row;
    justify-content: space-between;
    min-width: auto;
  }

  .tutorial-links {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    justify-content: center;
  }
}
</style>
