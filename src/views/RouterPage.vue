<template>
  <div class="router-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title"><RouterIcon :size="24" /> 路由器固件介绍</h1>
        <p class="page-description">OpenWrt、ImmortalWrt和LEDE固件详解，支持设备刷机指南</p>
      </div>
    </section>

    <!-- 固件介绍区域 -->
    <section class="firmware-section">
      <div class="container">
        <h2 class="section-title"> </h2>
        
        <div class="firmware-grid">
          <!-- OpenWrt -->
          <div class="firmware-card">
            <div class="firmware-header">
              <div class="firmware-icon">🔧</div>
              <h3 class="firmware-title">OpenWrt</h3>
              <span class="firmware-badge">官方版本</span>
            </div>
            <div class="firmware-content">
              <p class="firmware-description">
                OpenWrt是一个基于Linux的开源操作系统，主要运行在路由器等嵌入式设备上。
                它提供了强大的包管理系统，用户可以自由安装各种软件包，实现高度定制化。
              </p>
              <div class="firmware-features">
                <h4>主要特性：</h4>
                <ul>
                  <li>强大的包管理系统 (opkg)</li>
                  <li>支持数千个可安装软件包</li>
                  <li>完整的网络功能栈</li>
                  <li>活跃的社区支持</li>
                  <li>持续的安全更新</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- ImmortalWrt -->
          <div class="firmware-card">
            <div class="firmware-header">
              <div class="firmware-icon">⚡</div>
              <h3 class="firmware-title">ImmortalWrt</h3>
              <span class="firmware-badge">增强版本</span>
            </div>
            <div class="firmware-content">
              <p class="firmware-description">
                ImmortalWrt是OpenWrt的一个分支，专注于为中国用户提供更好的体验。
                包含更多预编译软件包，优化了中文支持和网络性能。
              </p>
              <div class="firmware-features">
                <h4>主要特性：</h4>
                <ul>
                  <li>更好的中文支持</li>
                  <li>更多预编译软件包</li>
                  <li>优化的网络性能</li>
                  <li>针对中国网络环境优化</li>
                  <li>活跃的中文社区</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- LEDE -->
          <div class="firmware-card">
            <div class="firmware-header">
              <div class="firmware-icon">🚀</div>
              <h3 class="firmware-title">LEDE</h3>
              <span class="firmware-badge">历史版本</span>
            </div>
            <div class="firmware-content">
              <p class="firmware-description">
                LEDE（Linux嵌入式开发环境）曾是OpenWrt的一个分支，
                2018年已与OpenWrt合并。现在OpenWrt项目沿用LEDE的开发流程和规范。
              </p>
              <div class="firmware-features">
                <h4>历史意义：</h4>
                <ul>
                  <li>改进了OpenWrt的开发流程</li>
                  <li>引入了更现代的组件版本</li>
                  <li>提升了用户友好性</li>
                  <li>现已合并回OpenWrt项目</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 设备示例区域 -->
    <section class="devices-section">
      <div class="container">
        <h2 class="section-title">支持设备示例</h2>
        
        <div class="devices-grid">
          <!-- 小米R4A千兆版 -->
          <div class="device-card">
            <div class="device-image">
              <div class="image-placeholder">
                <RouterIcon :size="48" />
                <span>小米R4A千兆版</span>
              </div>
            </div>
            <div class="device-info">
              <h3 class="device-name">小米路由器4A 千兆版</h3>
              <div class="device-specs">
                <div class="spec-item">
                  <span class="spec-label">处理器：</span>
                  <span class="spec-value">MT7621A 双核880MHz</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">内存：</span>
                  <span class="spec-value">128MB DDR3</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">存储：</span>
                  <span class="spec-value">16MB ROM</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">无线：</span>
                  <span class="spec-value">2.4G 300Mbps + 5G 867Mbps</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">接口：</span>
                  <span class="spec-value">1WAN + 2LAN 千兆</span>
                </div>
              </div>
              <div class="device-compatibility">
                <span class="compatibility-badge openwrt">OpenWrt</span>
                <span class="compatibility-badge immortalwrt">ImmortalWrt</span>
              </div>
            </div>
          </div>

          <!-- CMCC RAX3000M -->
          <div class="device-card">
            <div class="device-image">
              <div class="image-placeholder">
                <RouterIcon :size="48" />
                <span>CMCC RAX3000M</span>
              </div>
            </div>
            <div class="device-info">
              <h3 class="device-name">中国移动 RAX3000M</h3>
              <div class="device-specs">
                <div class="spec-item">
                  <span class="spec-label">处理器：</span>
                  <span class="spec-value">MT7981B 双核1.3GHz</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">内存：</span>
                  <span class="spec-value">256MB DDR4</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">存储：</span>
                  <span class="spec-value">128MB NAND Flash</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">无线：</span>
                  <span class="spec-value">Wi-Fi 6 AX3000</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">接口：</span>
                  <span class="spec-value">1WAN + 3LAN 千兆</span>
                </div>
              </div>
              <div class="device-compatibility">
                <span class="compatibility-badge openwrt">OpenWrt</span>
                <span class="compatibility-badge immortalwrt">ImmortalWrt</span>
              </div>
            </div>
          </div>

          <!-- 小米WR30U -->
          <div class="device-card">
            <div class="device-image">
              <div class="image-placeholder">
                <RouterIcon :size="48" />
                <span>小米WR30U</span>
              </div>
            </div>
            <div class="device-info">
              <h3 class="device-name">小米路由器WR30U</h3>
              <div class="device-specs">
                <div class="spec-item">
                  <span class="spec-label">处理器：</span>
                  <span class="spec-value">MT7981B 双核1.3GHz</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">内存：</span>
                  <span class="spec-value">256MB</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">无线：</span>
                  <span class="spec-value">Wi-Fi 6 AX3000</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">速率：</span>
                  <span class="spec-value">2.4G 574Mbps + 5G 2402Mbps</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">接口：</span>
                  <span class="spec-value">1WAN + 3LAN 千兆</span>
                </div>
              </div>
              <div class="device-compatibility">
                <span class="compatibility-badge openwrt">OpenWrt</span>
                <span class="compatibility-badge immortalwrt">ImmortalWrt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 刷机指南区域 -->
    <section class="guide-section">
      <div class="container">
        <h2 class="section-title">刷机指南</h2>
        
        <div class="guide-content">
          <div class="warning-box">
            <h4>⚠️ 重要提醒</h4>
            <p>刷机存在风险，可能导致设备变砖。请在操作前：</p>
            <ul>
              <li>备份原厂固件</li>
              <li>确认设备型号完全匹配</li>
              <li>准备TFTP恢复工具</li>
              <li>确保电源稳定</li>
            </ul>
          </div>

          <div class="guide-steps">
            <h3>基本刷机步骤：</h3>
            <ol>
              <li>下载对应设备的固件文件</li>
              <li>进入路由器管理界面</li>
              <li>找到固件升级选项</li>
              <li>选择下载的固件文件</li>
              <li>等待刷机完成，设备自动重启</li>
              <li>重新配置网络设置</li>
            </ol>
          </div>

          <div class="resources">
            <h3>相关资源：</h3>
            <div class="resource-links">
              <a href="https://openwrt.org" target="_blank" class="resource-link">OpenWrt官网</a>
              <a href="https://immortalwrt.org" target="_blank" class="resource-link">ImmortalWrt官网</a>
              <a href="https://github.com/openwrt/openwrt" target="_blank" class="resource-link">GitHub仓库</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterIcon } from 'lucide-vue-next'
</script>

<style scoped>
.router-page {
  min-height: 100vh;
  background: var(--background-secondary);
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  padding: var(--spacing-xxl) 0 var(--spacing-xl);
  text-align: center;
  color: white;
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.page-description {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.container {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

/* 固件卡片样式 */
.firmware-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.firmware-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.firmware-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.firmware-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.firmware-icon {
  font-size: 2rem;
}

.firmware-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.firmware-badge {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.firmware-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.firmware-features h4 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.firmware-features ul {
  list-style: none;
  padding: 0;
}

.firmware-features li {
  padding: var(--spacing-xs) 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: var(--spacing-xl);
}

.firmware-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--success-color);
  font-weight: bold;
}

/* 设备卡片样式 */
.devices-section {
  background: var(--background-primary);
  padding: var(--spacing-xxl) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.devices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

.device-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.device-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.device-image {
  height: 200px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  text-align: center;
  color: white;
}

.image-placeholder span {
  display: block;
  margin-top: var(--spacing-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.device-info {
  padding: var(--spacing-lg);
}

.device-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.device-specs {
  margin-bottom: var(--spacing-md);
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--border-color);
}

.spec-label {
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

.spec-value {
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.device-compatibility {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.compatibility-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.compatibility-badge.openwrt {
  background: var(--primary-color);
  color: white;
}

.compatibility-badge.immortalwrt {
  background: var(--secondary-color);
  color: white;
}

/* 指南区域样式 */
.guide-section {
  padding: var(--spacing-xxl) 0;
}

.guide-content {
  max-width: 800px;
  margin: 0 auto;
}

.warning-box {
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.warning-box h4 {
  color: #c53030;
  margin-bottom: var(--spacing-xs);
}

.warning-box ul {
  margin: var(--spacing-xs) 0 0 var(--spacing-xl);
  color: #744210;
}

.guide-steps {
  margin-bottom: var(--spacing-lg);
}

.guide-steps h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.guide-steps ol {
  margin-left: var(--spacing-xl);
  color: var(--text-secondary);
  line-height: 1.6;
}

.guide-steps li {
  margin-bottom: var(--spacing-xs);
}

.resources h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.resource-links {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.resource-link {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: background var(--transition-fast);
}

.resource-link:hover {
  background: var(--primary-dark);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-xl);
  }
  
  .firmware-grid,
  .devices-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-links {
    flex-direction: column;
  }
}
</style>