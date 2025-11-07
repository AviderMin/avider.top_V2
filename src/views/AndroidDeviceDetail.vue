<template>
  <div class="device-detail-page">
    <!-- 页面头部 -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <button class="back-btn" @click="goBack">
            <FontAwesomeIcon icon="arrow-left" /> 返回设备列表
          </button>
          <h1 class="page-title">{{ device?.name }}</h1>
          <p class="page-subtitle">{{ device?.codename }}</p>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- 左侧区域：设备图片和介绍 -->
          <div class="left-panel">
            <div class="device-image-section">
              <img
                :src="getDeviceImage(device)"
                :alt="device?.name"
                class="device-image"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
            
            <div class="device-info-section">
              <h3 class="section-title">设备信息</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">品牌：</span>
                  <span class="info-value">{{ device?.brand }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">型号：</span>
                  <span class="info-value">{{ device?.model }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">处理器：</span>
                  <span class="info-value">{{ device?.processor }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">分区类型：</span>
                  <span class="info-value">{{ getPartitionType() }}</span>
                </div>
              </div>
              
              <div class="device-description">
                <h4 class="description-title">设备介绍</h4>
                <p class="description-text">{{ device?.description }}</p>
              </div>
            </div>
          </div>

          <!-- 右侧区域：资源信息、更新日志和下载 -->
          <div class="right-panel">
            <!-- 资源详情页面 -->
            <div v-if="isResourceDetailPage" class="resource-detail-section">
              <div v-if="currentResource" class="resource-detail">
                <h3 class="section-title">
                  {{ resourceType === 'kernel' ? '内核文件' : '橙狐Recovery' }}详情
                </h3>
                <div class="resource-detail-content">
                  <div class="resource-header">
                    <h4 class="resource-name">
                      {{ resourceType === 'kernel' ? currentResource.version : currentResource.name + ' ' + currentResource.version }}
                    </h4>
                    <div class="resource-meta">
                      <span class="resource-date">{{ currentResource.date }}</span>
                      <span class="resource-size">{{ currentResource.size }}{{ currentResource.sizeUnit ? '' : 'MB' }}</span>
                    </div>
                  </div>
                  
                  <div class="resource-description">
                    <h5>资源描述</h5>
                    <p>{{ currentResource.description }}</p>
                  </div>
                  
                  <div v-if="currentResource.changelog && currentResource.changelog.length > 0" class="changelog-section">
                    <h5>更新日志</h5>
                    <ul class="changelog-list">
                      <li v-for="(log, index) in getChangelogArray(currentResource.changelog)" :key="index" style="white-space: normal; word-break: normal;">{{ log }}</li>
                    </ul>
                  </div>
                  
                  <div class="download-section">
                    <button
                      class="download-btn primary"
                      @click="handleDownload(currentResource.downloadUrl, currentResource.id)"
                    >
                      立即下载
                    </button>
                    <span class="download-count">{{ getDownloadCount(currentResource.id) }} 次下载</span>
                  </div>
                </div>
              </div>
              <div v-else class="no-resource">
                <p>资源未找到</p>
              </div>
            </div>
            
            <!-- 设备详情页面（显示所有资源） -->
            <div v-else>
              <!-- 内核资源 -->
              <div class="resource-section">
                <h3 class="section-title">内核文件</h3>
                <div class="resource-list">
                  <div v-for="kernel in device?.kernels" :key="kernel.id" class="resource-item">
                    <div class="resource-info">
                      <h4 class="resource-name">{{ kernel.version }}</h4>
                      <p class="resource-meta">
                        <span class="resource-date">{{ kernel.date }}</span>
                        <span class="resource-size">{{ kernel.size }}{{ kernel.sizeUnit || 'MB' }}</span>
                      </p>
                      <p class="resource-description">{{ kernel.description }}</p>
                      <div class="changelog" v-if="kernel.changelog">
                        <h5 class="changelog-title">更新日志：</h5>
                        <ul class="changelog-list">
                          <li v-for="(log, index) in getChangelogArray(kernel.changelog)" :key="index">{{ log }}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="download-section">
                      <button
                        class="download-btn"
                        @click="handleDownload(kernel.downloadUrl, kernel.id)"
                      >
                        下载内核
                      </button>
                      <span class="download-count">{{ getDownloadCount(kernel.id) }} 次下载</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recovery资源 -->
              <div class="resource-section">
                <h3 class="section-title">橙狐Recovery</h3>
                <div class="resource-list">
                  <div v-for="recovery in device?.recoveries" :key="recovery.id" class="resource-item">
                    <div class="resource-info">
                      <h4 class="resource-name">{{ recovery.name }} {{ recovery.version }}</h4>
                      <p class="resource-meta">
                        <span class="resource-date">{{ recovery.date }}</span>
                        <span class="resource-size">{{ recovery.size }}{{ recovery.sizeUnit || 'MB' }}</span>
                      </p>
                      <p class="resource-description">{{ recovery.description }}</p>
                      <div class="changelog" v-if="recovery.changelog">
                        <h5 class="changelog-title">更新日志：</h5>
                        <ul class="changelog-list">
                          <li v-for="(log, index) in getChangelogArray(recovery.changelog)" :key="index">{{ log }}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="download-section">
                      <button
                        class="download-btn"
                        @click="handleDownload(recovery.downloadUrl, recovery.id)"
                      >
                        下载Recovery
                      </button>
                      <span class="download-count">{{ getDownloadCount(recovery.id) }} 次下载</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部区域：刷机教程 -->
        <div class="tutorial-section">
          <h3 class="section-title">刷机教程</h3>
          <div class="tutorial-content">
            <div v-if="tutorial" class="tutorial-detail">
              <div class="tutorial-header">
                <h4 class="tutorial-title">{{ tutorial.title }}</h4>
                <div class="tutorial-meta">
                  <span class="difficulty">难度：{{ tutorial.difficulty }}</span>
                  <span class="duration">时长：{{ tutorial.duration }}</span>
                </div>
              </div>
              
              <div class="requirements">
                <h5>所需工具：</h5>
                <ul class="requirements-list">
                  <li v-for="(req, index) in tutorial.requirements" :key="index">{{ req }}</li>
                </ul>
              </div>
              
              <div class="tutorial-steps">
                <h5>刷机步骤：</h5>
                <div v-for="step in tutorial.steps" :key="step.step" class="step-item">
                  <div class="step-header">
                    <span class="step-number">步骤 {{ step.step }}</span>
                    <h6 class="step-title">{{ step.title }}</h6>
                  </div>
                  <p class="step-content">{{ step.content }}</p>
                  <div v-if="step.warning" class="step-warning">
                    <FontAwesomeIcon icon="exclamation-triangle" /> {{ step.warning }}
                  </div>
                  <div v-if="step.note" class="step-note">
                    <FontAwesomeIcon icon="info-circle" /> {{ step.note }}
                  </div>
                  <div v-if="step.partition" class="step-partition">
                    <strong>分区：</strong>{{ step.partition }}
                  </div>
                </div>
              </div>
              
              <div v-if="tutorial.videoUrl" class="video-link">
                <a :href="tutorial.videoUrl" target="_blank" class="video-btn">
                  <FontAwesomeIcon icon="play-circle" /> 观看视频教程
                </a>
              </div>
            </div>
            
            <div v-else class="no-tutorial">
              <p>暂无该设备的刷机教程</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { androidAPI } from '@/services/api'

const route = useRoute()
const router = useRouter()

// 设备数据
const device = ref<any>(null)
const tutorial = ref<any>(null)

// 下载统计
const downloadStats = ref<Record<string, number>>({})

// 当前显示的资源
const currentResource = ref<any>(null)
const resourceType = ref<string>('')

// 获取路由参数
const deviceId = computed(() => route.params.id as string || route.params.deviceId as string)
const routeResourceType = computed(() => route.params.resourceType as string)
const routeResourceId = computed(() => route.params.resourceId as string)

// 判断是否为资源详情页面
const isResourceDetailPage = computed(() => {
  return routeResourceType.value && routeResourceId.value
})

// 获取分区类型
const getPartitionType = () => {
  if (deviceId.value === 'marble') {
    return 'vab_rec'
  }
  return 'vab'
}

// 获取设备图片路径
const getDeviceImage = (device: any) => {
  if (device?.image) {
    return device.image
  }
  return `/images/android/devices/${deviceId.value}.png`
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/android/default-device.png'
}

// 获取下载次数
const getDownloadCount = (resourceId: string) => {
  return downloadStats.value[resourceId] || 0
}

// 处理changelog数据，支持数组和字符串格式
const getChangelogArray = (changelog: any) => {
  if (Array.isArray(changelog)) {
    return changelog
  }
  
  if (typeof changelog === 'string') {
    // 如果是字符串，尝试按换行符分割
    return changelog.split('\n').filter(item => item.trim() !== '')
  }
  
  return []
}

// 处理下载
const handleDownload = async (downloadUrl: string, fileId: string) => {
  try {
    // 记录下载统计
    await androidAPI.recordDownload(fileId)

    // 更新本地下载统计
    downloadStats.value[fileId] = (downloadStats.value[fileId] || 0) + 1

    // 创建下载链接
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = downloadUrl.split('/').pop() || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('下载失败:', error)
    // 如果API调用失败，只更新本地统计
    downloadStats.value[fileId] = (downloadStats.value[fileId] || 0) + 1
  }
}

// 返回设备列表
const goBack = () => {
  router.push('/android')
}

// 加载设备数据
const loadDeviceData = async () => {
  try {
    // 加载设备列表
    const response = await androidAPI.getAndroidData()
    if (response && (response as any).devices) {
      const devices = (response as any).devices
      device.value = devices.find((d: any) => d.id === deviceId.value)
      
      if (!device.value) {
        console.error('设备未找到:', deviceId.value)
        return
      }

      // 加载教程数据
      const tutorialsResponse = await androidAPI.getTutorials()
      if (tutorialsResponse && (tutorialsResponse as any).tutorials) {
        const tutorials = (tutorialsResponse as any).tutorials
        tutorial.value = tutorials.find((t: any) => t.deviceId === deviceId.value)
      }

      // 加载下载统计
      const stats = await androidAPI.getDownloadStats()
      downloadStats.value = stats ? (stats as unknown as Record<string, number>) : {}
    }
  } catch (error) {
    console.error('加载设备数据失败:', error)
  }
}

// 监听路由参数变化，设置当前资源
watch([routeResourceType, routeResourceId, device], ([type, id, deviceData]) => {
  if (type && id && deviceData) {
    resourceType.value = type
    
    // 根据资源类型查找对应的资源
    if (type === 'kernel') {
      currentResource.value = deviceData.kernels?.find((k: any) => k.id === id)
    } else if (type === 'recovery') {
      currentResource.value = deviceData.recoveries?.find((r: any) => r.id === id)
    }
  } else {
    currentResource.value = null
  }
}, { immediate: true })

// 组件挂载时加载数据
onMounted(async () => {
  await loadDeviceData()
})
</script>

<style scoped>
.device-detail-page {
  min-height: 100vh;
  background: var(--background-secondary);
}

/* 页面头部 */
.page-header {
  background: var(--background-primary);
  padding: var(--spacing-xl) 0;
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  color: white;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-sm);
}

.back-btn:hover {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin: 0;
  font-style: italic;
}

/* 主要内容区域 */
.main-content {
  padding: var(--spacing-xxl) 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-xxl);
  margin-bottom: var(--spacing-xxl);
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.device-image-section {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  border: 1px solid var(--border-color);
}

.device-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.device-info-section {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  padding-left: var(--spacing-sm);
  border-left: 4px solid var(--primary-color);
}

.info-grid {
  display: grid;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.info-label {
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
}

.info-value {
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.device-description {
  margin-top: var(--spacing-lg);
}

.description-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.description-text {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.resource-section {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-lg);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.resource-item:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.resource-detail-section {
  width: 100%;
}

.resource-detail {
  background: var(--background-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.resource-detail-content {
  max-width: 800px;
}

.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.resource-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.resource-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.resource-description {
  margin: var(--spacing-xl) 0;
}

.resource-description h5 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.resource-description p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.changelog-section {
  margin: var(--spacing-xl) 0;
}

.changelog-section h5 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.changelog {
  margin-top: var(--spacing-md);
}

.changelog-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.changelog-list {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  padding-left: var(--spacing-lg);
}

.changelog-list li {
  margin-bottom: var(--spacing-xs);
}

.download-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  min-width: 120px;
}

.download-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.download-btn.primary {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-md);
  background: linear-gradient(135deg, var(--success-color), var(--success-dark));
}

.download-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.download-btn.primary:hover {
  background: linear-gradient(135deg, var(--success-dark), var(--success-darker));
}

.download-count {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.no-resource {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.resource-info {
  flex: 1;
}

.resource-info .resource-name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.resource-info .resource-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.resource-info .resource-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

/* 教程区域 */
.tutorial-section {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
}

.tutorial-content {
  margin-top: var(--spacing-lg);
}

.tutorial-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.tutorial-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.tutorial-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.requirements {
  margin-bottom: var(--spacing-lg);
}

.requirements h5 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.requirements-list {
  margin: 0;
  padding-left: var(--spacing-lg);
}

.requirements-list li {
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
}

.tutorial-steps {
  margin-bottom: var(--spacing-lg);
}

.tutorial-steps h5 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.step-item {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--primary-color);
}

.step-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.step-number {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.step-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.step-content {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.step-warning {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.step-note {
  background: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.step-partition {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  background: var(--background-tertiary);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

.video-link {
  text-align: center;
  margin-top: var(--spacing-lg);
}

.video-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.video-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.no-tutorial {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-lg) 0;
  }
  
  .content-grid {
    gap: var(--spacing-lg);
  }
  
  .device-image-section,
  .device-info-section,
  .resource-section,
  .tutorial-section {
    padding: var(--spacing-lg);
  }
  
  .resource-item {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-lg);
  }
  
  .download-section {
    flex-direction: row;
    justify-content: space-between;
    min-width: auto;
  }
  
  .tutorial-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
}
</style>