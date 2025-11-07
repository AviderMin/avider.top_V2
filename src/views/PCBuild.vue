<template>
  <div class="pc-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><MonitorIcon :size="24" /> 电脑装机配置</h1>
        <p class="page-description">6个主流价位配置单，Intel/AMD CPU和NVIDIA/AMD GPU性能排行榜</p>
      </div>
    </section>

    <!-- 配置单展示区域 -->
    <section class="configs-section">
      <div class="container">
        <h2 class="section-title">配置单推荐</h2>
        <div class="configs-grid">
          <div
            v-for="config in configurations"
            :key="config.id"
            class="config-card"
            :class="{ active: selectedConfig === config.id }"
            @click="selectConfig(config.id)"
          >
            <div class="config-header">
              <h3 class="config-name">{{ config.name }}</h3>
            </div>

            <div class="config-category">{{ config.category }}</div>

            <div class="config-performance">
              <div class="performance-bar">
                <div class="performance-fill" :style="{ width: config.performance + '%' }"></div>
              </div>
              <span class="performance-text">性能评分: {{ config.performance }}/100</span>
            </div>

            <p class="config-description">{{ config.description }}</p>

            <div class="config-components">
              <div
                v-for="component in config.components"
                :key="component.type"
                class="component-item"
              >
                <div class="component-icon">
                  <component :is="getComponentIcon(component.type)" :size="16" />
                </div>
                <div class="component-info">
                  <span class="component-name">{{ component.type }}</span>
                  <span class="component-model">{{ component.model }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 配置详情面板 -->
        <div v-if="selectedConfig" class="config-detail-panel">
          <div class="detail-header">
            <h3>{{ getSelectedConfig()?.name }} 详细配置</h3>
            <button class="close-btn" @click="selectedConfig = null">×</button>
          </div>

          <div class="detail-content">
            <div class="components-list">
              <div
                v-for="component in getSelectedConfig()?.components"
                :key="component.type"
                class="component-detail"
              >
                <div class="component-info">
                  <span class="component-name">{{ component.type }}</span>
                  <span class="component-model">{{ component.model }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 硬件性能排行榜 -->
    <section class="rankings-section">
      <div class="container">
        <h2 class="section-title">硬件性能排行榜</h2>

        <div class="rankings-grid">
          <!-- Intel CPU 排行榜卡片 -->
          <div class="ranking-card" v-if="rankings['intel-cpu'] && rankings['intel-cpu'].length > 0">
            <div class="ranking-header">
              <div class="ranking-icon">
                <Cpu :size="24" />
              </div>
              <h3 class="ranking-title">Intel CPU 排行榜</h3>
            </div>

            <div class="ranking-content">
              <div
                v-for="(ranking, index) in rankings['intel-cpu']"
                :key="ranking.model"
                class="ranking-item"
              >
                <div class="ranking-rank">#{{ index + 1 }}</div>
                <div class="ranking-info">
                  <div class="ranking-model">{{ ranking.model }}</div>
                  <div class="score-bar-container">
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: ranking.score + '%' }"></div>
                    </div>
                  </div>
                </div>
                <span class="score-value">{{ ranking.score }}</span>
              </div>
            </div>
          </div>

          <!-- AMD CPU 排行榜卡片 -->
          <div class="ranking-card" v-if="rankings['amd-cpu'] && rankings['amd-cpu'].length > 0">
            <div class="ranking-header">
              <div class="ranking-icon">
                <Cpu :size="24" />
              </div>
              <h3 class="ranking-title">AMD CPU 排行榜</h3>
            </div>

            <div class="ranking-content">
              <div
                v-for="(ranking, index) in rankings['amd-cpu']"
                :key="ranking.model"
                class="ranking-item"
              >
                <div class="ranking-rank">#{{ index + 1 }}</div>
                <div class="ranking-info">
                  <div class="ranking-model">{{ ranking.model }}</div>
                  <div class="score-bar-container">
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: ranking.score + '%' }"></div>
                    </div>
                  </div>
                </div>
                <span class="score-value">{{ ranking.score }}</span>
              </div>
            </div>
          </div>

          <!-- NVIDIA GPU 排行榜卡片 -->
          <div
            class="ranking-card"
            v-if="rankings['nvidia-gpu'] && rankings['nvidia-gpu'].length > 0"
          >
            <div class="ranking-header">
              <div class="ranking-icon">
                <MonitorIcon :size="24" />
              </div>
              <h3 class="ranking-title">NVIDIA GPU 排行榜</h3>
            </div>

            <div class="ranking-content">
              <div
                v-for="(ranking, index) in rankings['nvidia-gpu']"
                :key="ranking.model"
                class="ranking-item"
              >
                <div class="ranking-rank">#{{ index + 1 }}</div>
                <div class="ranking-info">
                  <div class="ranking-model">{{ ranking.model }}</div>
                  <div class="score-bar-container">
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: ranking.score + '%' }"></div>
                    </div>
                  </div>
                </div>
                <span class="score-value">{{ ranking.score }}</span>
              </div>
            </div>
          </div>

          <!-- AMD GPU 排行榜卡片 -->
          <div class="ranking-card" v-if="rankings['amd-gpu'] && rankings['amd-gpu'].length > 0">
            <div class="ranking-header">
              <div class="ranking-icon">
                <MonitorIcon :size="24" />
              </div>
              <h3 class="ranking-title">AMD GPU 排行榜</h3>
            </div>

            <div class="ranking-content">
              <div
                v-for="(ranking, index) in rankings['amd-gpu']"
                :key="ranking.model"
                class="ranking-item"
              >
                <div class="ranking-rank">#{{ index + 1 }}</div>
                <div class="ranking-info">
                  <div class="ranking-model">{{ ranking.model }}</div>
                  <div class="score-bar-container">
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: ranking.score + '%' }"></div>
                    </div>
                  </div>
                </div>
                <span class="score-value">{{ ranking.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { pcAPI } from '@/services/api'
import { 
  Monitor, Cpu, HardDrive, Monitor as Display, 
  Zap
} from 'lucide-vue-next'

// 配置数据
const configurations = ref([])

// 排行榜数据
const rankings = ref({})

// 状态管理
const selectedConfig = ref<string | null>(null)
const compareConfig1 = ref('')
const compareConfig2 = ref('')
const showComparison = ref(false)
const isLoading = ref(true)

// 方法
const selectConfig = (configId: string) => {
  selectedConfig.value = configId
}

const getSelectedConfig = () => {
  return configurations.value.find((config) => config.id === selectedConfig.value)
}

const getConfigById = (id: string) => {
  return configurations.value.find((config) => config.id === id)
}

// 获取硬件图标
const getComponentIcon = (type: string) => {
  const iconMap: { [key: string]: any } = {
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
  }
  return iconMap[type] || Cpu
}

// 获取硬件图标类名（基于WindowsDevices.vue的实现风格）
const getComponentIconClass = (componentName: string) => {
  // 根据组件类型返回对应的Tailwind CSS类名
  const classMap: Record<string, string> = {
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
  }
  
  return classMap[componentName] || 'w-4 h-4 text-gray-500'
}

// 加载电脑装机数据
const loadPCData = async () => {
  try {
    isLoading.value = true
    const response = await pcAPI.getPCData()

    // 更新数据
    if (response) {
      if ((response as any).configurations) {
        configurations.value = (response as any).configurations
      }
      if ((response as any).rankings) {
        rankings.value = (response as any).rankings
      }
    }
  } catch (error) {
    console.error('加载电脑装机数据失败:', error)
    // 清空数据，显示空状态或错误提示
    configurations.value = []
    rankings.value = {}
    
    // 可以在这里添加错误状态管理
    // 例如：errorMessage.value = '数据加载失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPCData()
})
</script>

<style scoped>
.pc-page {
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
}

.page-description {
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
}

/* 配置单区域 */
.configs-section {
  padding: var(--spacing-xxl) 0;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

.configs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.config-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.config-card:hover,
.config-card.active {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.config-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.config-recommendation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.config-category {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--background-secondary);
  color: var(--text-secondary);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
}

.config-performance {
  margin-bottom: var(--spacing-lg);
}

.performance-bar {
  width: 100%;
  height: 8px;
  background: var(--background-tertiary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.performance-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  transition: width 0.3s ease;
}

.performance-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.config-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.config-components {
  display: grid;
  gap: var(--spacing-sm);
}

.component-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) 0;
  font-size: var(--font-size-sm);
}

.component-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--background-secondary);
  border-radius: var(--border-radius-sm);
  flex-shrink: 0;
  color: var(--primary-color);
}

.component-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.component-name {
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  margin-bottom: 2px;
}

.component-model {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.more-components {
  text-align: center;
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
}

/* 配置详情面板 */
.config-detail-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.detail-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: var(--spacing-xs);
}

.close-btn:hover {
  color: var(--text-primary);
}

.detail-content {
  padding: var(--spacing-lg);
}

.components-list {
  display: grid;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.component-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
}

.component-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* 排行榜区域 */
.rankings-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-secondary);
}

.rankings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);
}

.ranking-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);
}

.ranking-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.ranking-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.ranking-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
  color: var(--primary-color);
  flex-shrink: 0;
}

.ranking-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.ranking-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.ranking-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.ranking-item:hover {
  background: var(--background-tertiary);
}

.ranking-rank {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  background: var(--background-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  min-width: 40px;
  text-align: center;
}

.ranking-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.ranking-model {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.score-bar-container {
  width: 100%;
}

.score-bar {
  width: 100%;
  height: 6px;
  background: var(--background-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  transition: width 0.3s ease;
}

.score-value {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  min-width: 40px;
  text-align: center;
}

/* 对比区域 */
.compare-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-secondary);
}

.compare-controls {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xl);
}

.compare-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background: var(--background-primary);
  min-width: 200px;
}

.comparison-panel {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.comparison-content {
  padding: var(--spacing-lg);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
}

.comparison-col h4 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.comparison-details {
  display: grid;
  gap: var(--spacing-md);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .configs-grid {
    grid-template-columns: 1fr;
  }

  .rankings-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .ranking-card {
    padding: var(--spacing-lg);
  }

  .ranking-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .ranking-item {
    grid-template-columns: auto 1fr auto;
    gap: var(--spacing-sm);
  }

  .ranking-info {
    gap: var(--spacing-xs);
  }

  .score-bar-container {
    width: 100%;
  }

  .compare-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .compare-select {
    min-width: auto;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>