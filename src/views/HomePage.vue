<template>
  <div class="home-page">
    <!-- Banner轮播区域 -->
    <section class="banner-section">
      <div class="banner-container">
        <div class="banner-slider">
          <div
            v-for="(image, index) in bannerImages"
            :key="index"
            :class="['banner-slide', { active: currentSlide === index }]"
          >
            <div class="banner-image" :style="{ backgroundImage: `url(${image.src})` }"></div>
            <div class="banner-content">
              <h1 class="banner-title">{{ image.title }}</h1>
              <p class="banner-description">{{ image.description }}</p>
            </div>
          </div>
        </div>

        <!-- Banner指示器 -->
        <div class="banner-indicators">
          <button
            v-for="(_, index) in bannerImages"
            :key="index"
            :class="['indicator', { active: currentSlide === index }]"
            @click="goToSlide(index)"
          ></button>
        </div>

        <!-- Banner导航按钮 -->
        <button class="banner-nav prev" @click="prevSlide">‹</button>
        <button class="banner-nav next" @click="nextSlide">›</button>
      </div>
    </section>
    <!-- GitHub状态展示区域 -->
    <section class="github-status-section">
      <div class="container">
        <h2 class="section-title">My Status</h2>

        <!-- GitHub统计表格 -->
        <div class="github-stats-grid">
          <div class="stats-card">
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcset="
                  https://github-readme-stats.vercel.app/api?username=avidermin&show_icons=true&theme=tokyonight&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800
                "
              />
              <source
                media="(prefers-color-scheme: light)"
                srcset="
                  https://github-readme-stats.vercel.app/api?username=avidermin&show_icons=true&theme=default&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800
                "
              />
              <img
                alt="GitHub Stats"
                src="https://github-readme-stats.vercel.app/api?username=avidermin&show_icons=true&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800"
                class="stats-image"
              />
            </picture>
          </div>

          <div class="stats-card">
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcset="
                  https://github-readme-stats.vercel.app/api/top-langs/?username=avidermin&layout=compact&theme=tokyonight&card_width=400&hide_border=true
                "
              />
              <source
                media="(prefers-color-scheme: light)"
                srcset="
                  https://github-readme-stats.vercel.app/api/top-langs/?username=avidermin&layout=compact&card_width=400&hide_border=true
                "
              />
              <img
                alt="Top Languages"
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=avidermin&layout=compact&card_width=400&hide_border=true"
                class="stats-image"
              />
            </picture>
          </div>
        </div>

        <!-- GitHub活动图 -->
        <div class="activity-graph">
          <picture>
            <source
              srcset="
                https://github-readme-activity-graph.vercel.app/graph?username=avidermin&theme=github-compact&hide_border=true&bg_color=transparent
              "
            />
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=avidermin&theme=github-compact&hide_border=true&bg_color=transparent"
              alt="Activity Graph"
              class="activity-image"
            />
          </picture>
        </div>

        <!-- 技术栈展示 -->
        <div class="tech-stacks">
          <div class="tech-category">
            <h3 class="tech-title">Using Now</h3>
            <div class="tech-badges">
              <img
                height="26"
                src="https://img.shields.io/badge/Vue.js-42b883?style=flat-square&logo=vuedotjs&logoColor=white"
                alt="Vue.js"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/Shell-black?style=flat-square&logo=gnu-bash&logoColor=white"
                alt="Shell"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/HTML-orange?style=flat-square&logo=html5&logoColor=white"
                alt="HTML"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/CSS-blue?style=flat-square&logo=css&logoColor=white"
                alt="CSS"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/JavaScript-yellow?style=flat-square&logo=javascript&logoColor=black"
                alt="JavaScript"
              />
            </div>
          </div>

          <div class="tech-category">
            <h3 class="tech-title">Learning Now</h3>
            <div class="tech-badges">
              <img
                height="26"
                src="https://img.shields.io/badge/C-blue?style=flat-square&logo=c&logoColor=white"
                alt="C"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/Python-blue?style=flat-square&logo=python&logoColor=white"
                alt="Python"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/Java-red?style=flat-square&logo=openjdk&logoColor=white"
                alt="Java"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white"
                alt="Rust"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white"
                alt="TypeScript"
              />
            </div>
          </div>

          <div class="tech-category">
            <h3 class="tech-title">My Devices</h3>
            <div class="tech-badges">
              <img
                height="26"
                src="https://img.shields.io/badge/REDMI%20Note%2012%20Turbo-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff"
                alt="REDMI Note 12 Turbo"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/REDMI%20K40S-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff"
                alt="REDMI K40S"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/Xiaomi%20Pad%205-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff"
                alt="Xiaomi Pad 5"
              />
            </div>
          </div>

          <div class="tech-category">
            <h3 class="tech-title">Development Environment</h3>
            <div class="tech-badges">
              <img
                height="26"
                src="https://img.shields.io/badge/Windows%2011%2025H2-00adef?style=flat-square&logo=windows&logoColor=ffffff"
                alt="Windows11 25H2"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/Android%2015-3ddc84?style=flat-square&logo=android&logoColor=ffffff"
                alt="Android 15"
              />
              <img
                height="26"
                src="https://img.shields.io/badge/WSL%20Ubuntu%2024.04.1-orange?style=flat-square&logo=ubuntu&logoColor=white"
                alt="WSL Ubuntu 24.04.1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { homeAPI } from '@/services/api'

// Banner数据
const bannerImages = ref([])

// 个人介绍数据
const introData = ref({})

// 功能特性数据
const features = ref([])

// 快速导航数据
const quickNav = ref([])

// Banner轮播逻辑
const currentSlide = ref(0)
let slideInterval: NodeJS.Timeout
const isLoading = ref(true)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerImages.value.length
}

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + bannerImages.value.length) % bannerImages.value.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  slideInterval = setInterval(nextSlide, 5000)
}

const stopAutoPlay = () => {
  clearInterval(slideInterval)
}

// 加载首页数据
const loadHomeData = async () => {
  try {
    isLoading.value = true
    const response = await homeAPI.getHomeData()

    // 更新数据（如果后端有提供）
    if (response && response.data) {
      if (response.data.banner && response.data.banner.images) {
        bannerImages.value = response.data.banner.images
      }
      if (response.data.introData) {
        introData.value = response.data.introData
      }
      if (response.data.features) {
        features.value = response.data.features
      }
      if (response.data.quickNav) {
        quickNav.value = response.data.quickNav
      }
    }
  } catch (error) {
    console.error('加载首页数据失败:', error)
    // 使用默认数据继续显示
    bannerImages.value = [
      {
        src: '/images/banner1.jpg',
        alt: '个人网站Banner1',
        title: '欢迎来到我的个人网站',
        description: '技术分享与资源下载的综合平台',
      },
      {
        src: '/images/banner2.jpg',
        alt: '个人网站Banner2',
        title: '技术分享与资源下载',
        description: '提供安卓刷机、电脑装机等实用资源',
      },
    ]
    introData.value = {
      title: '关于我',
      content:
        '这里将展示个人介绍信息，待后续提供具体文本内容。欢迎访问我的个人综合性网站，这里汇集了技术分享、资源下载和实用工具。',
    }
    features.value = [
      {
        id: 1,
        icon: 'robot',
        title: '安卓刷机',
        description: '提供红米Note12 Turbo、K40S、小米Pad5等设备的刷机资源',
      },
      {
        id: 2,
        icon: 'desktop',
        title: '电脑装机',
        description: '6个主流价位配置单和硬件性能排行榜',
      },
      {
        id: 3,
        icon: 'music',
        title: '音乐播放',
        description: '在线音乐播放器，支持多种播放模式',
      },
      {
        id: 4,
        icon: 'tools',
        title: '实用工具',
        description: '多种在线工具，满足日常使用需求',
      },
    ]
    quickNav.value = [
      {
        path: '/android',
        icon: 'robot',
        title: '安卓刷机',
        description: '内核和Recovery下载',
      },
      {
        path: '/pc',
        icon: 'desktop',
        title: '电脑装机',
        description: '配置单和硬件排行',
      },
      {
        path: '/music',
        icon: 'music',
        title: '音乐播放器',
        description: '在线音乐播放',
      },
      {
        path: '/tools',
        icon: 'tools',
        title: '工具箱',
        description: '实用工具集合',
      },
    ]
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadHomeData()
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Banner区域样式 */
.banner-section {
  position: relative;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
}

.banner-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.banner-slider {
  position: relative;
  height: 100%;
  width: 100%;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.banner-slide.active {
  opacity: 1;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.7);
}

.banner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 var(--spacing-xl);
}

.banner-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-description {
  font-size: clamp(1rem, 3vw, 1.5rem);
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.banner-indicators {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-sm);
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

.banner-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 3;
  transition: all var(--transition-fast);
}

.banner-nav:hover {
  background: rgba(0, 0, 0, 0.6);
}

.banner-nav.prev {
  left: var(--spacing-lg);
}

.banner-nav.next {
  right: var(--spacing-lg);
}

/* 个人介绍区域 */
.intro-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-secondary);
}

.section-title {
  text-align: center;
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
}

.intro-text {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  line-height: 1.8;
  color: var(--text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.feature-card {
  background: var(--background-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* GitHub状态展示区域 */
.github-status-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-secondary);
}

.github-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stats-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);
  display: flex;
  justify-content: center;
  align-items: center;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.stats-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: var(--border-radius-md);
}

.activity-graph {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
}

.activity-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: var(--border-radius-md);
}

.tech-stacks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.tech-category {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);
}

.tech-category:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.tech-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  text-align: center;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: var(--spacing-sm);
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;
}

.tech-badges img {
  transition: transform var(--transition-fast);
}

.tech-badges img:hover {
  transform: scale(1.1);
}

/* 快速导航区域 */
.quick-nav-section {
  padding: var(--spacing-xxl) 0;
  background: var(--background-primary);
}

.quick-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.quick-nav-card {
  display: block;
  background: var(--background-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-normal);
  border: 1px solid transparent;
  position: relative;
}

.quick-nav-card:hover {
  background: var(--background-primary);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nav-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.nav-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.nav-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.nav-arrow {
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform var(--transition-fast);
}

.quick-nav-card:hover .nav-arrow {
  transform: translateX(5px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner-section {
    height: 50vh;
    min-height: 300px;
  }

  .banner-nav {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .banner-nav.prev {
    left: var(--spacing-sm);
  }

  .banner-nav.next {
    right: var(--spacing-sm);
  }

  .intro-section,
  .quick-nav-section,
  .github-status-section {
    padding: var(--spacing-xl) 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .quick-nav-grid {
    grid-template-columns: 1fr;
  }

  .github-stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .stats-card {
    padding: var(--spacing-md);
  }

  .stats-image {
    max-width: 100%;
  }

  .activity-graph {
    padding: var(--spacing-md);
  }

  .activity-image {
    max-width: 100%;
  }

  .tech-stacks {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .tech-category {
    padding: var(--spacing-md);
  }

  .tech-badges {
    gap: var(--spacing-xs);
  }

  .tech-badges img {
    height: 22px;
  }
}

@media (max-width: 480px) {
  .github-stats-grid {
    grid-template-columns: 1fr;
  }

  .stats-card {
    padding: var(--spacing-sm);
  }

  .tech-badges {
    flex-direction: column;
    align-items: center;
  }

  .tech-badges img {
    height: 20px;
  }
}
</style>
