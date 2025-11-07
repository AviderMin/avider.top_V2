<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(true)

onMounted(() => {
  // 模拟加载延迟
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div id="app" class="app">
    <!-- 加载动画 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <!-- 主布局 -->
    <div v-else class="app-layout">
      <!-- 顶部导航 -->
      <header class="app-header">
        <div class="container">
          <nav class="navbar">
            <div class="navbar-brand">
              <router-link to="/" class="brand-link">
                <span class="brand-icon">🚀</span>
                <span class="brand-text">Avider.top</span>
              </router-link>
            </div>

            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link" :class="{ active: route.path === '/' }">
                  <span class="nav-icon"><HomeIcon size="18" /></span>
                  <span class="nav-text">首页</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/android"
                  class="nav-link"
                  :class="{ active: route.path === '/android' }"
                >
                  <span class="nav-icon"><SmartphoneIcon size="18" /></span>
                  <span class="nav-text">安卓刷机</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pc" class="nav-link" :class="{ active: route.path === '/pc' }">
                  <span class="nav-icon"><MonitorIcon size="18" /></span>
                  <span class="nav-text">电脑装机</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/music"
                  class="nav-link"
                  :class="{ active: route.path === '/music' }"
                >
                  <span class="nav-icon"><MusicIcon size="18" /></span>
                  <span class="nav-text">音乐播放器</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/tools"
                  class="nav-link"
                  :class="{ active: route.path === '/tools' }"
                >
                  <span class="nav-icon"><WrenchIcon size="18" /></span>
                  <span class="nav-text">工具箱</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <!-- 主内容区域 -->
      <main class="app-main">
        <router-view />
      </main>

      <!-- 页脚 -->
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <p>&copy; 2025 Avider.top - 个人综合性Web网站</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 加载动画 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--background-tertiary);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 顶部导航样式 */
.app-header {
  background: var(--background-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: var(--spacing-sm) 0;
}

.navbar-brand {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-primary);
  text-decoration: none;
}

.brand-icon {
  font-size: var(--font-size-xxl);
}

.navbar-nav {
  display: flex;
  list-style: none;
  gap: var(--spacing-lg);
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-weight: var(--font-weight-medium);
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  background: var(--background-secondary);
}

.nav-icon {
  font-size: var(--font-size-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  font-size: var(--font-size-md);
  display: flex;
  align-items: center;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.theme-toggle {
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  background: var(--background-secondary);
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--background-tertiary);
  transform: scale(1.05);
}

/* 主内容区域 */
.app-main {
  flex: 1;
  min-height: calc(100vh - var(--header-height) - 100px);
}

/* 页脚样式 */
.app-footer {
  background: var(--background-secondary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
}

.footer-content {
  text-align: center;
  color: var(--text-secondary);
}

.footer-content p {
  margin: var(--spacing-xs) 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    height: auto;
    gap: var(--spacing-md);
  }

  .navbar-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-sm);
  }

  .nav-text {
    display: none;
  }

  .nav-link {
    padding: var(--spacing-sm);
  }
}
</style>
