<template>
  <div class="tools-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><WrenchIcon size="24" /> 工具箱</h1>
        <p class="page-description">实用工具集合，支持功能扩展和分类管理</p>
      </div>
    </section>

    <!-- 工具分类导航 -->
    <section class="categories-section">
      <div class="container">
        <div class="categories-nav">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['category-btn', { active: activeCategory === category.id }]"
            @click="setActiveCategory(category.id)"
          >
            <span class="category-icon">
              <GlobeIcon v-if="category.icon === 'globe'" size="18" />
              <CogIcon v-else-if="category.icon === 'cog'" size="18" />
              <PaletteIcon v-else-if="category.icon === 'palette'" size="18" />
              <WrenchIcon v-else-if="category.icon === 'wrench'" size="18" />
              <FileIcon v-else-if="category.icon === 'file'" size="18" />
              <KeyIcon v-else-if="category.icon === 'key'" size="18" />
            </span>
            <span class="category-name">{{ category.name }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 工具卡片展示 -->
    <section class="tools-section">
      <div class="container">
        <div class="tools-grid">
          <div
            v-for="tool in filteredTools"
            :key="tool.id"
            :class="['tool-card', { disabled: !tool.available }]"
            @click="openTool(tool)"
          >
            <div class="tool-header">
              <div class="tool-icon">
                <GlobeIcon v-if="tool.icon === 'globe'" size="24" />
                <CogIcon v-else-if="tool.icon === 'cog'" size="24" />
                <PaletteIcon v-else-if="tool.icon === 'palette'" size="24" />
                <WrenchIcon v-else-if="tool.icon === 'wrench'" size="24" />
                <FileIcon v-else-if="tool.icon === 'file'" size="24" />
                <KeyIcon v-else-if="tool.icon === 'key'" size="24" />
                <BoxIcon v-else-if="tool.icon === 'box'" size="24" />
                <LaptopIcon v-else-if="tool.icon === 'laptop'" size="24" />
                <InfoIcon v-else-if="tool.icon === 'info-circle'" size="24" />
                <NetworkIcon v-else-if="tool.icon === 'network-wired'" size="24" />
                <CodeIcon v-else-if="tool.icon === 'code'" size="24" />
                <ImageIcon v-else-if="tool.icon === 'image'" size="24" />
                <RulerIcon v-else-if="tool.icon === 'ruler'" size="24" />
                <DollarSignIcon v-else-if="tool.icon === 'money-bill'" size="24" />
                <EditIcon v-else-if="tool.icon === 'edit'" size="24" />
                <CubeIcon v-else-if="tool.icon === 'cubes'" size="24" />
              </div>
              <div class="tool-badge" v-if="tool.badge">{{ tool.badge }}</div>
            </div>

            <div class="tool-content">
              <h3 class="tool-title">{{ tool.title }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
            </div>

            <div class="tool-footer">
              <div class="tool-status">
                <span :class="['status-dot', { available: tool.available }]"></span>
                {{ tool.available ? '可用' : '开发中' }}
              </div>

              <div class="tool-actions">
                <button class="action-btn" :disabled="!tool.available" @click.stop="openTool(tool)">
                  {{ tool.available ? '打开' : '敬请期待' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工具详情模态框 -->
    <div v-if="selectedTool" class="tool-modal-overlay" @click="closeToolModal">
      <div class="tool-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <span class="modal-icon">
              <GlobeIcon v-if="selectedTool.icon === 'globe'" size="24" />
              <CogIcon v-else-if="selectedTool.icon === 'cog'" size="24" />
              <PaletteIcon v-else-if="selectedTool.icon === 'palette'" size="24" />
              <WrenchIcon v-else-if="selectedTool.icon === 'wrench'" size="24" />
              <FileIcon v-else-if="selectedTool.icon === 'file'" size="24" />
              <KeyIcon v-else-if="selectedTool.icon === 'key'" size="24" />
              <BoxIcon v-else-if="selectedTool.icon === 'box'" size="24" />
              <LaptopIcon v-else-if="selectedTool.icon === 'laptop'" size="24" />
              <InfoIcon v-else-if="selectedTool.icon === 'info-circle'" size="24" />
              <NetworkIcon v-else-if="selectedTool.icon === 'network-wired'" size="24" />
              <CodeIcon v-else-if="selectedTool.icon === 'code'" size="24" />
              <ImageIcon v-else-if="selectedTool.icon === 'image'" size="24" />
              <RulerIcon v-else-if="selectedTool.icon === 'ruler'" size="24" />
              <DollarSignIcon v-else-if="selectedTool.icon === 'money-bill'" size="24" />
              <EditIcon v-else-if="selectedTool.icon === 'edit'" size="24" />
              <CubeIcon v-else-if="selectedTool.icon === 'cubes'" size="24" />
            </span>
            <h2>{{ selectedTool.title }}</h2>
          </div>
          <button class="close-btn" @click="closeToolModal">×</button>
        </div>

        <div class="modal-content">
          <div class="tool-info">
            <p class="tool-description">{{ selectedTool.description }}</p>
            <div class="tool-meta">
              <span class="meta-item">
                <strong>分类:</strong> {{ getCategoryName(selectedTool.category) }}
              </span>
              <span class="meta-item">
                <strong>状态:</strong>
                <span :class="['status-text', { available: selectedTool.available }]">
                  {{ selectedTool.available ? '可用' : '开发中' }}
                </span>
              </span>
              <span class="meta-item" v-if="selectedTool.version">
                <strong>版本:</strong> {{ selectedTool.version }}
              </span>
            </div>
          </div>

          <div class="tool-preview">
            <div class="preview-placeholder">
              <div class="placeholder-icon">
                <FontAwesomeIcon :icon="selectedTool.icon" />
              </div>
              <p class="placeholder-text">工具预览界面</p>
              <p class="placeholder-subtext">功能正在开发中...</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeToolModal">关闭</button>
          <button
            class="btn btn-primary"
            :disabled="!selectedTool.available"
            @click="launchTool(selectedTool)"
          >
            {{ selectedTool.available ? '启动工具' : '功能开发中' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 扩展工具区域 -->
    <section class="extensions-section">
      <div class="container">
        <h2 class="section-title">工具扩展</h2>
        <div class="extensions-content">
          <div class="extension-info">
            <h3>添加新工具</h3>
            <p>工具箱支持功能扩展，您可以提交工具需求或开发新的工具模块。</p>
            <div class="extension-actions">
              <button class="btn btn-outline">提交工具需求</button>
              <button class="btn btn-outline">查看开发文档</button>
            </div>
          </div>

          <div class="upcoming-tools">
            <h3>即将上线的工具</h3>
            <div class="upcoming-list">
              <div v-for="tool in upcomingTools" :key="tool.id" class="upcoming-item">
                <span class="upcoming-icon">
                  <GlobeIcon v-if="tool.icon === 'globe'" size="18" />
                  <CogIcon v-else-if="tool.icon === 'cog'" size="18" />
                  <PaletteIcon v-else-if="tool.icon === 'palette'" size="18" />
                  <WrenchIcon v-else-if="tool.icon === 'wrench'" size="18" />
                  <FileIcon v-else-if="tool.icon === 'file'" size="18" />
                  <KeyIcon v-else-if="tool.icon === 'key'" size="18" />
                  <BoxIcon v-else-if="tool.icon === 'box'" size="18" />
                  <LaptopIcon v-else-if="tool.icon === 'laptop'" size="18" />
                  <InfoIcon v-else-if="tool.icon === 'info-circle'" size="18" />
                  <NetworkIcon v-else-if="tool.icon === 'network-wired'" size="18" />
                  <CodeIcon v-else-if="tool.icon === 'code'" size="18" />
                  <ImageIcon v-else-if="tool.icon === 'image'" size="18" />
                  <RulerIcon v-else-if="tool.icon === 'ruler'" size="18" />
                  <DollarSignIcon v-else-if="tool.icon === 'money-bill'" size="18" />
                  <EditIcon v-else-if="tool.icon === 'edit'" size="18" />
                  <CubeIcon v-else-if="tool.icon === 'cubes'" size="18" />
                </span>
                <span class="upcoming-name">{{ tool.title }}</span>
                <span class="upcoming-status">开发中</span>
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
import { toolsAPI } from '@/services/api'

// 工具分类接口
interface ToolCategory {
  id: string
  name: string
  icon: string
  description: string
}

// 工具接口
interface Tool {
  id: string
  title: string
  description: string
  icon: string
  category: string
  available: boolean
  badge?: string
  version?: string
  launchUrl?: string
}

// 工具分类数据
const categories = ref<ToolCategory[]>([
  {
    id: 'all',
    name: '全部工具',
    icon: 'cubes',
    description: '所有可用工具',
  },
  {
    id: 'system',
    name: '系统工具',
    icon: 'desktop',
    description: '系统相关实用工具',
  },
  {
    id: 'network',
    name: '网络工具',
    icon: 'globe',
    description: '网络检测和分析工具',
  },
  {
    id: 'development',
    name: '开发工具',
    icon: 'cog',
    description: '编程和开发辅助工具',
  },
  {
    id: 'media',
    name: '媒体工具',
    icon: 'palette',
    description: '图片、音频、视频处理工具',
  },
  {
    id: 'utilities',
    name: '实用工具',
    icon: 'wrench',
    description: '日常使用的便捷工具',
  },
])

// 工具数据
const tools = ref<Tool[]>([
  {
    id: 'file-converter',
    title: '文件格式转换器',
    description: '支持多种文件格式的在线转换工具',
    icon: 'file',
    category: 'utilities',
    available: true,
    badge: '热门',
    version: '1.0.0',
  },
  {
    id: 'password-generator',
    title: '密码生成器',
    description: '生成安全可靠的随机密码',
    icon: 'key',
    category: 'utilities',
    available: true,
    version: '1.0.0',
  },
  {
    id: 'color-picker',
    title: '颜色选择器',
    description: '在线颜色选择和格式转换工具',
    icon: 'palette',
    category: 'media',
    available: true,
    version: '1.0.0',
  },
  {
    id: 'qr-code-generator',
    title: '二维码生成器',
    description: '快速生成自定义二维码',
    icon: 'mobile',
    category: 'utilities',
    available: true,
    version: '1.0.0',
  },
  {
    id: 'system-info',
    title: '系统信息检测',
    description: '检测浏览器和系统环境信息',
    icon: 'info-circle',
    category: 'system',
    available: false,
    badge: '即将上线',
  },
  {
    id: 'network-speed',
    title: '网络速度测试',
    description: '测试网络连接速度和延迟',
    icon: 'network-wired',
    category: 'network',
    available: false,
  },
  {
    id: 'code-formatter',
    title: '代码格式化工具',
    description: '多种编程语言的代码格式化',
    icon: 'code',
    category: 'development',
    available: false,
  },
  {
    id: 'image-compressor',
    title: '图片压缩工具',
    description: '在线压缩图片文件大小',
    icon: 'image',
    category: 'media',
    available: false,
  },
])

// 即将上线的工具
const upcomingTools = ref<Tool[]>([
  {
    id: 'unit-converter',
    title: '单位换算器',
    description: '长度、重量、温度等单位换算',
    icon: 'ruler',
    category: 'utilities',
    available: false,
  },
  {
    id: 'currency-converter',
    title: '货币汇率换算',
    description: '实时货币汇率换算工具',
    icon: 'money-bill',
    category: 'utilities',
    available: false,
  },
  {
    id: 'text-editor',
    title: '在线文本编辑器',
    description: '支持多种格式的文本编辑',
    icon: 'edit',
    category: 'development',
    available: false,
  },
])

// 状态管理
const activeCategory = ref('all')
const selectedTool = ref<Tool | null>(null)
const isLoading = ref(true)

// 计算属性
const filteredTools = computed(() => {
  if (activeCategory.value === 'all') {
    return tools.value
  }
  return tools.value.filter((tool) => tool.category === activeCategory.value)
})

// 方法
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
}

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find((cat) => cat.id === categoryId)
  return category ? category.name : '未知分类'
}

const openTool = (tool: Tool) => {
  selectedTool.value = tool
}

const closeToolModal = () => {
  selectedTool.value = null
}

const launchTool = (tool: Tool) => {
  if (!tool.available) return

  // 这里应该启动具体的工具功能
  // 目前只是显示提示信息
  alert(`正在启动 ${tool.title}...\n功能正在开发中，敬请期待！`)
  closeToolModal()
}

// 加载工具数据
const loadToolsData = async () => {
  try {
    isLoading.value = true
    const response = await toolsAPI.getToolsData()

    // 更新工具数据
    if (response.data && response.data.tools) {
      tools.value = response.data.tools
    }

    // 更新分类数据
    if (response.data && response.data.categories) {
      categories.value = response.data.categories
    }

    // 更新即将上线的工具数据
    if (response.data && response.data.upcomingTools) {
      upcomingTools.value = response.data.upcomingTools
    }
  } catch (error) {
    console.error('加载工具数据失败:', error)
    // 可以在这里添加错误处理逻辑，比如显示错误提示
  } finally {
    isLoading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadToolsData()
})
</script>

<style scoped>
.tools-page {
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

/* 分类导航区域 */
.categories-section {
  padding: var(--spacing-xl) 0;
  background: var(--background-primary);
  border-bottom: 1px solid var(--border-color);
}

.categories-nav {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--background-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
}

.category-btn:hover {
  background: var(--background-tertiary);
  color: var(--text-primary);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-icon {
  font-size: 1.2rem;
}

.category-name {
  font-weight: var(--font-weight-medium);
}

/* 工具卡片区域 */
.tools-section {
  padding: var(--spacing-xxl) 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.tool-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.tool-card:hover:not(.disabled) {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.tool-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
}

.tool-icon {
  font-size: 3rem;
  line-height: 1;
}

.tool-badge {
  background: var(--secondary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.tool-content {
  margin-bottom: var(--spacing-lg);
}

.tool-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.tool-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--font-size-sm);
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-tertiary);
}

.status-dot.available {
  background: var(--success-color);
}

.action-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.action-btn:hover:not(:disabled) {
  background: var(--primary-color-dark);
  transform: translateY(-1px);
}

.action-btn:disabled {
  background: var(--background-tertiary);
  color: var(--text-tertiary);
  cursor: not-allowed;
  transform: none;
}

/* 工具详情模态框 */
.tool-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.tool-modal {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.modal-icon {
  font-size: 2rem;
}

.modal-title h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--spacing-xs);
  color: var(--text-secondary);
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-content {
  padding: var(--spacing-xl);
}

.tool-info {
  margin-bottom: var(--spacing-xl);
}

.tool-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
  flex-wrap: wrap;
}

.meta-item {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.status-text.available {
  color: var(--success-color);
  font-weight: var(--font-weight-bold);
}

.tool-preview {
  background: var(--background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xxl);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.preview-placeholder {
  color: var(--text-tertiary);
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.placeholder-text {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.placeholder-subtext {
  font-size: var(--font-size-sm);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  padding: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

/* 扩展工具区域 */
.extensions-section {
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

.extensions-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  max-width: 1000px;
  margin: 0 auto;
}

.extension-info,
.upcoming-tools {
  background: var(--background-secondary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
}

.extension-info h3,
.upcoming-tools h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.extension-info p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.extension-actions {
  display: flex;
  gap: var(--spacing-md);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.upcoming-list {
  display: grid;
  gap: var(--spacing-md);
}

.upcoming-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--background-primary);
  border-radius: var(--border-radius-md);
}

.upcoming-icon {
  font-size: 1.2rem;
}

.upcoming-name {
  flex: 1;
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.upcoming-status {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--background-tertiary);
  border-radius: var(--border-radius-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .categories-nav {
    justify-content: stretch;
  }

  .category-btn {
    flex: 1;
    justify-content: center;
    min-width: 120px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .extensions-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .tool-modal {
    margin: var(--spacing-md);
  }

  .modal-footer {
    flex-direction: column;
  }

  .extension-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .category-btn {
    min-width: 100px;
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .category-name {
    font-size: var(--font-size-sm);
  }

  .tool-card {
    padding: var(--spacing-lg);
  }

  .tool-icon {
    font-size: 2.5rem;
  }
}
</style>
