<template>
  <div class="pc-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><MonitorIcon size="24" /> 电脑装机配置</h1>
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
              <div class="config-price">¥{{ config.price.toLocaleString() }}</div>
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
                v-for="component in config.components.slice(0, 3)"
                :key="component.name"
                class="component-item"
              >
                <span class="component-name">{{ component.name }}:</span>
                <span class="component-model">{{ component.model }}</span>
              </div>
              <div class="more-components">+{{ config.components.length - 3 }} 更多组件</div>
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
                :key="component.name"
                class="component-detail"
              >
                <div class="component-info">
                  <span class="component-name">{{ component.name }}</span>
                  <span class="component-model">{{ component.model }}</span>
                </div>
                <div class="component-price">¥{{ component.price.toLocaleString() }}</div>
              </div>
            </div>

            <div class="total-price">总价: ¥{{ getSelectedConfig()?.price.toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 硬件排行榜区域 -->
    <section class="rankings-section">
      <div class="container">
        <h2 class="section-title">硬件性能排行榜</h2>

        <div class="rankings-tabs">
          <button
            v-for="tab in rankingTabs"
            :key="tab.key"
            :class="['tab-btn', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="rankings-content">
          <div v-for="ranking in getCurrentRankings()" :key="ranking.model" class="ranking-item">
            <div class="ranking-info">
              <div class="ranking-model">{{ ranking.model }}</div>
              <div class="ranking-score">
                <div class="score-bar">
                  <div class="score-fill" :style="{ width: ranking.score + '%' }"></div>
                </div>
                <span class="score-text">{{ ranking.score }}</span>
              </div>
            </div>

            <div class="ranking-details">
              <div class="ranking-price">¥{{ ranking.price.toLocaleString() }}</div>
              <div class="ranking-recommendation">
                <div class="recommendation-stars">
                  <span
                    v-for="n in 10"
                    :key="n"
                    :class="['star', { active: n <= ranking.recommendation }]"
                    >★</span
                  >
                </div>
                <span class="recommendation-text">{{ ranking.recommendation }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 配置对比功能 -->
    <section class="compare-section">
      <div class="container">
        <h2 class="section-title">配置对比</h2>

        <div class="compare-controls">
          <select v-model="compareConfig1" class="compare-select">
            <option value="">选择第一个配置</option>
            <option v-for="config in configurations" :key="config.id" :value="config.id">
              {{ config.name }}
            </option>
          </select>

          <select v-model="compareConfig2" class="compare-select">
            <option value="">选择第二个配置</option>
            <option v-for="config in configurations" :key="config.id" :value="config.id">
              {{ config.name }}
            </option>
          </select>

          <button
            class="btn btn-primary"
            :disabled="!compareConfig1 || !compareConfig2"
            @click="showComparison = true"
          >
            开始对比
          </button>
        </div>

        <!-- 对比结果面板 -->
        <div v-if="showComparison && compareConfig1 && compareConfig2" class="comparison-panel">
          <div class="comparison-header">
            <h3>配置对比结果</h3>
            <button class="close-btn" @click="showComparison = false">×</button>
          </div>

          <div class="comparison-content">
            <div class="comparison-grid">
              <div class="comparison-col">
                <h4>{{ getConfigById(compareConfig1)?.name }}</h4>
                <div class="comparison-details">
                  <div class="detail-item">
                    <span>价格:</span>
                    <strong>¥{{ getConfigById(compareConfig1)?.price.toLocaleString() }}</strong>
                  </div>
                  <div class="detail-item">
                    <span>性能评分:</span>
                    <strong>{{ getConfigById(compareConfig1)?.performance }}/100</strong>
                  </div>
                  <div class="detail-item">
                    <span>类别:</span>
                    <span>{{ getConfigById(compareConfig1)?.category }}</span>
                  </div>
                </div>
              </div>

              <div class="comparison-col">
                <h4>{{ getConfigById(compareConfig2)?.name }}</h4>
                <div class="comparison-details">
                  <div class="detail-item">
                    <span>价格:</span>
                    <strong>¥{{ getConfigById(compareConfig2)?.price.toLocaleString() }}</strong>
                  </div>
                  <div class="detail-item">
                    <span>性能评分:</span>
                    <strong>{{ getConfigById(compareConfig2)?.performance }}/100</strong>
                  </div>
                  <div class="detail-item">
                    <span>类别:</span>
                    <span>{{ getConfigById(compareConfig2)?.category }}</span>
                  </div>
                </div>
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

// 配置数据
const configurations = ref([
  {
    id: 'budget-3000',
    name: '3000元入门配置',
    price: 2999,
    category: '入门级',
    performance: 65,
    description: '适合日常办公、学习使用的经济型配置',
    components: [
      { name: 'CPU', model: 'Intel i3-12100F', price: 699 },
      { name: '主板', model: 'H610M', price: 499 },
      { name: '内存', model: '16GB DDR4 3200MHz', price: 299 },
      { name: '显卡', model: '集成显卡', price: 0 },
      { name: '硬盘', model: '512GB NVMe SSD', price: 299 },
      { name: '电源', model: '500W 80Plus', price: 249 },
      { name: '机箱', model: 'MATX机箱', price: 199 },
      { name: '显示器', model: '23.8英寸 1080P', price: 599 },
    ],
  },
  {
    id: 'mid-5000',
    name: '5000元主流配置',
    price: 4999,
    category: '主流级',
    performance: 78,
    description: '平衡性能与价格，适合游戏和创作',
    components: [
      { name: 'CPU', model: 'AMD Ryzen 5 5600X', price: 1199 },
      { name: '主板', model: 'B550M', price: 699 },
      { name: '内存', model: '16GB DDR4 3600MHz', price: 399 },
      { name: '显卡', model: 'NVIDIA RTX 3060 12GB', price: 2299 },
      { name: '硬盘', model: '1TB NVMe SSD', price: 499 },
      { name: '电源', model: '650W 80Plus Bronze', price: 399 },
      { name: '机箱', model: 'ATX中塔机箱', price: 299 },
      { name: '显示器', model: '27英寸 2K IPS', price: 1299 },
    ],
  },
  {
    id: 'high-8000',
    name: '8000元高性能配置',
    price: 7999,
    category: '高性能',
    performance: 85,
    description: '畅玩3A大作，满足专业创作需求',
    components: [
      { name: 'CPU', model: 'Intel i5-13600KF', price: 1999 },
      { name: '主板', model: 'B760M', price: 999 },
      { name: '内存', model: '32GB DDR5 5600MHz', price: 899 },
      { name: '显卡', model: 'NVIDIA RTX 4060 Ti 8GB', price: 3299 },
      { name: '硬盘', model: '1TB NVMe PCIe 4.0 SSD', price: 599 },
      { name: '电源', model: '750W 80Plus Gold', price: 599 },
      { name: '机箱', model: 'ATX电竞机箱', price: 399 },
      { name: '显示器', model: '27英寸 2K 165Hz', price: 1499 },
    ],
  },
  {
    id: 'enthusiast-12000',
    name: '12000元发烧配置',
    price: 11999,
    category: '发烧级',
    performance: 92,
    description: '顶级性能，满足4K游戏和专业工作',
    components: [
      { name: 'CPU', model: 'AMD Ryzen 7 7800X3D', price: 2999 },
      { name: '主板', model: 'X670E', price: 1999 },
      { name: '内存', model: '32GB DDR5 6000MHz', price: 1199 },
      { name: '显卡', model: 'NVIDIA RTX 4070 12GB', price: 4499 },
      { name: '硬盘', model: '2TB NVMe PCIe 4.0 SSD', price: 999 },
      { name: '电源', model: '850W 80Plus Platinum', price: 899 },
      { name: '机箱', model: '全塔机箱', price: 699 },
      { name: '显示器', model: '32英寸 4K 144Hz', price: 2999 },
    ],
  },
  {
    id: 'workstation-20000',
    name: '20000元工作站配置',
    price: 19999,
    category: '工作站',
    performance: 96,
    description: '专业级配置，适合视频剪辑、3D渲染',
    components: [
      { name: 'CPU', model: 'Intel i9-14900K', price: 4499 },
      { name: '主板', model: 'Z790', price: 2499 },
      { name: '内存', model: '64GB DDR5 6400MHz', price: 2199 },
      { name: '显卡', model: 'NVIDIA RTX 4080 16GB', price: 8499 },
      { name: '硬盘', model: '2TB NVMe PCIe 5.0 SSD', price: 1499 },
      { name: '电源', model: '1000W 80Plus Titanium', price: 1499 },
      { name: '机箱', model: '全塔静音机箱', price: 999 },
      { name: '显示器', model: '34英寸 5K2K曲面', price: 3999 },
    ],
  },
  {
    id: 'ultimate-30000',
    name: '30000元终极配置',
    price: 29999,
    category: '终极',
    performance: 99,
    description: '无与伦比的性能，顶级游戏和创作体验',
    components: [
      { name: 'CPU', model: 'AMD Ryzen 9 7950X3D', price: 5999 },
      { name: '主板', model: 'X670E Extreme', price: 3999 },
      { name: '内存', model: '128GB DDR5 6000MHz', price: 3999 },
      { name: '显卡', model: 'NVIDIA RTX 4090 24GB', price: 12999 },
      { name: '硬盘', model: '4TB NVMe PCIe 5.0 SSD', price: 2999 },
      { name: '电源', model: '1200W 80Plus Titanium', price: 1999 },
      { name: '机箱', model: '全塔定制机箱', price: 1999 },
      { name: '显示器', model: '49英寸 5K超宽曲面', price: 6999 },
    ],
  },
])

// 排行榜数据
const rankings = ref({
  'intel-cpu': [
    { model: 'Intel i9-14900K', score: 98, price: 4499, recommendation: 9 },
    { model: 'Intel i7-14700K', score: 95, price: 3499, recommendation: 8 },
    { model: 'Intel i5-14600K', score: 88, price: 2499, recommendation: 9 },
    { model: 'Intel i3-14100', score: 75, price: 1299, recommendation: 7 },
    { model: 'Intel Core i9-13900K', score: 96, price: 3999, recommendation: 8 },
  ],
  'amd-cpu': [
    { model: 'AMD Ryzen 9 7950X3D', score: 97, price: 5999, recommendation: 9 },
    { model: 'AMD Ryzen 7 7800X3D', score: 95, price: 2999, recommendation: 10 },
    { model: 'AMD Ryzen 5 7600X', score: 85, price: 1999, recommendation: 8 },
    { model: 'AMD Ryzen 9 7900X', score: 92, price: 3999, recommendation: 7 },
    { model: 'AMD Ryzen 5 5600X', score: 80, price: 1199, recommendation: 9 },
  ],
  'nvidia-gpu': [
    { model: 'NVIDIA RTX 4090', score: 100, price: 12999, recommendation: 8 },
    { model: 'NVIDIA RTX 4080', score: 95, price: 8499, recommendation: 7 },
    { model: 'NVIDIA RTX 4070 Ti', score: 90, price: 5999, recommendation: 8 },
    { model: 'NVIDIA RTX 4060 Ti', score: 85, price: 3299, recommendation: 9 },
    { model: 'NVIDIA RTX 4060', score: 80, price: 2499, recommendation: 9 },
  ],
  'amd-gpu': [
    { model: 'AMD RX 7900 XTX', score: 96, price: 7999, recommendation: 9 },
    { model: 'AMD RX 7900 XT', score: 92, price: 5999, recommendation: 8 },
    { model: 'AMD RX 7800 XT', score: 88, price: 3999, recommendation: 9 },
    { model: 'AMD RX 7700 XT', score: 82, price: 3499, recommendation: 7 },
    { model: 'AMD RX 7600', score: 75, price: 2299, recommendation: 8 },
  ],
})

// 状态管理
const selectedConfig = ref<string | null>(null)
const activeTab = ref('intel-cpu')
const compareConfig1 = ref('')
const compareConfig2 = ref('')
const showComparison = ref(false)
const isLoading = ref(true)

// 标签页配置
const rankingTabs = [
  { key: 'intel-cpu', label: 'Intel CPU' },
  { key: 'amd-cpu', label: 'AMD CPU' },
  { key: 'nvidia-gpu', label: 'NVIDIA GPU' },
  { key: 'amd-gpu', label: 'AMD GPU' },
]

// 方法
const selectConfig = (configId: string) => {
  selectedConfig.value = configId
}

const getSelectedConfig = () => {
  return configurations.value.find((config) => config.id === selectedConfig.value)
}

const getCurrentRankings = () => {
  return rankings.value[activeTab.value as keyof typeof rankings.value] || []
}

const getConfigById = (id: string) => {
  return configurations.value.find((config) => config.id === id)
}

// 加载电脑装机数据
const loadPCData = async () => {
  try {
    isLoading.value = true
    const response = await pcAPI.getPCData()

    // 更新数据（如果后端有提供）
    if (response && response.data) {
      if (response.data.configurations) {
        configurations.value = response.data.configurations
      }
      if (response.data.rankings) {
        rankings.value = response.data.rankings
      }
    }
  } catch (error) {
    console.error('加载电脑装机数据失败:', error)
    // 使用默认数据继续显示
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

.config-price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
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
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.component-name {
  color: var(--text-secondary);
}

.component-model {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
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

.component-price {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.total-price {
  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  padding: var(--spacing-lg);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
}

/* 排行榜区域 */
.rankings-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-primary);
}

.rankings-tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--background-secondary);
  border: none;
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
}

.rankings-content {
  display: grid;
  gap: var(--spacing-md);
  max-width: 600px;
  margin: 0 auto;
}

.ranking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
}

.ranking-info {
  flex: 1;
}

.ranking-model {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.ranking-score {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.score-bar {
  flex: 1;
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

.score-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  min-width: 30px;
}

.ranking-details {
  text-align: right;
}

.ranking-price {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.ranking-recommendation {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.recommendation-stars {
  display: flex;
}

.star {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
}

.star.active {
  color: #ffd700;
}

.recommendation-text {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
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

  .rankings-tabs {
    justify-content: stretch;
  }

  .tab-btn {
    flex: 1;
    text-align: center;
  }

  .ranking-item {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-md);
  }

  .ranking-score {
    justify-content: space-between;
  }

  .compare-controls {
    flex-direction: column;
  }

  .compare-select {
    width: 100%;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
