<template>
  <div class="hoster-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <div class="avatar-container">
            <div class="avatar">
              <img :src="getAvatarPath()" alt="AviderMin" />
            </div>
          </div>
          <h1 class="page-title">AviderMin</h1>
          <p class="page-description">热爱技术的开发者，专注于开源项目和技术分享</p>
        </div>
      </div>
    </section>

    <!-- 个人简介 -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-content">
          <h2 class="section-title">关于我</h2>
          <p class="intro-text">
            你好，我是 AviderMin，一名热爱技术的开发者。我喜欢探索各种开源项目，
            分享技术知识，并且致力于创建实用的工具和资源。
            这里是我的个人主页，你可以通过下方的社交媒体链接找到我，
            也可以访问我的资源站获取更多内容。
          </p>
        </div>
      </div>
    </section>

    <!-- 社交媒体链接 -->
    <section class="social-section">
      <div class="container">
        <h2 class="section-title">社交媒体</h2>
        <div class="social-grid">
          <a href="https://github.com/AviderMin" target="_blank" class="social-card github">
            <div class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </div>
            <h3 class="social-title">GitHub</h3>
            <p class="social-description">开源项目和代码分享</p>
          </a>

          <a href="https://space.bilibili.com/486681130" target="_blank" class="social-card bilibili">
            <div class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 class="social-title">Bilibili</h3>
            <p class="social-description">视频内容和技术分享</p>
          </a>

          <a href="http://www.coolapk.com/u/3517613" target="_blank" class="social-card coolapk">
            <div class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3 class="social-title">酷安</h3>
            <p class="social-description">Android应用和社区</p>
          </a>

          <a href="https://gitee.com/AviderMin" target="_blank" class="social-card gitee">
            <div class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 class="social-title">Gitee</h3>
            <p class="social-description">国内代码托管平台</p>
          </a>

          <a href="https://olist.avider.top/" target="_blank" class="social-card resource">
            <div class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 class="social-title">资源站</h3>
            <p class="social-description">实用资源和工具集合</p>
          </a>

          <a href="https://bot.avider.top/" target="_blank" class="social-card bot">
            <div class="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 class="social-title">AstrBot</h3>
            <p class="social-description">智能机器人仪表盘</p>
          </a>
        </div>
      </div>
    </section>

    <!-- 技能和兴趣 -->
    <section class="skills-section">
      <div class="container">
        <h2 class="section-title">技能与兴趣</h2>
        <div class="skills-content">
          <div class="skills-category">
            <h3 class="category-title">技术栈</h3>
            <div class="skills-list">
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Linux</span>
              <span class="skill-tag">OpenWrt</span>
            </div>
          </div>
          <div class="skills-category">
            <h3 class="category-title">兴趣爱好</h3>
            <div class="skills-list">
              <span class="skill-tag">开源项目</span>
              <span class="skill-tag">技术分享</span>
              <span class="skill-tag">网络技术</span>
              <span class="skill-tag">移动开发</span>
              <span class="skill-tag">硬件折腾</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { electronEnv } from '@/services/api'

// 计算头像图片路径
const getAvatarPath = () => {
  const avatarPath = '/images/hoster/hoster.png'
  return electronEnv ? `http://localhost:3000${avatarPath}` : avatarPath
}
</script>

<style scoped>
.hoster-page {
  min-height: 100vh;
  background: var(--background-secondary);
}

/* 页面标题区域 */
.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  padding: var(--spacing-xxl) 0;
  text-align: center;
  color: white;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.avatar-container {
  margin-bottom: var(--spacing-xl);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
}

.page-description {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  max-width: 400px;
  margin: 0 auto;
}

/* 通用部分样式 */
.intro-section,
.social-section,
.skills-section,
.logo-section {
  padding: var(--spacing-xxl) 0;
}

.section-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

/* 个人简介区域 */
.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-text {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: var(--text-secondary);
}

/* 社交媒体链接区域 */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.social-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  text-decoration: none;
}

.social-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.social-card.github:hover {
  border-color: #333;
  background: rgba(51, 51, 51, 0.05);
}

.social-card.bilibili:hover {
  border-color: #FB7299;
  background: rgba(251, 114, 153, 0.05);
}

.social-card.coolapk:hover {
  border-color: #00C16E;
  background: rgba(0, 193, 110, 0.05);
}

.social-card.gitee:hover {
  border-color: #C71D23;
  background: rgba(199, 29, 35, 0.05);
}

.social-card.resource:hover {
  border-color: var(--primary-color);
  background: rgba(0, 123, 255, 0.05);
}

.social-card.bot:hover {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.05);
}

.social-card.bot .social-icon {
  color: #4CAF50;
}

.social-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-card.github .social-icon {
  color: #333;
}

.social-card.bilibili .social-icon {
  color: #FB7299;
}

.social-card.coolapk .social-icon {
  color: #00C16E;
}

.social-card.gitee .social-icon {
  color: #C71D23;
}

.social-card.resource .social-icon {
  color: var(--primary-color);
}

.social-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
}

.social-description {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* 技能和兴趣区域 */
.skills-content {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.skills-category {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.category-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  text-align: center;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.skill-tag {
  background: var(--background-secondary);
  color: var(--text-primary);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--border-color);
}

/* 网站图标区域 */
.logo-container {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-xl);
}

.logo-box {
  width: 200px;
  height: 200px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 页脚 */
.page-footer {
  background: var(--background-primary);
  padding: var(--spacing-xl) 0;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer-text {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: var(--spacing-xl) 0;
  }

  .page-title {
    font-size: var(--font-size-xxl);
  }

  .social-grid {
    grid-template-columns: 1fr;
  }

  .skills-content {
    grid-template-columns: 1fr;
  }

  .logo-box {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .avatar {
    width: 100px;
    height: 100px;
  }

  .page-title {
    font-size: var(--font-size-xl);
  }

  .page-description {
    font-size: var(--font-size-md);
  }

  .social-card {
    padding: var(--spacing-lg);
  }

  .social-icon {
    font-size: 2.5rem;
  }
}
</style>