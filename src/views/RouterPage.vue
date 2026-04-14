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
        <h2 class="section-title">固件系统介绍</h2>
        
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.page-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 60px 0 40px;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.page-description {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: #2d3748;
}

/* 固件卡片样式 */
.firmware-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.firmware-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.firmware-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.firmware-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.firmware-icon {
  font-size: 2rem;
}

.firmware-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.firmware-badge {
  background: #4299e1;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.firmware-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.firmware-features h4 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.firmware-features ul {
  list-style: none;
  padding: 0;
}

.firmware-features li {
  padding: 0.25rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.firmware-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

/* 设备卡片样式 */
.devices-section {
  background: #f7fafc;
  padding: 4rem 0;
}

.devices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.device-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.device-card:hover {
  transform: translateY(-4px);
}

.device-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.device-info {
  padding: 1.5rem;
}

.device-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.device-specs {
  margin-bottom: 1rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.spec-label {
  color: #718096;
  font-weight: 500;
}

.spec-value {
  color: #2d3748;
  font-weight: 600;
}

.device-compatibility {
  display: flex;
  gap: 0.5rem;
}

.compatibility-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.compatibility-badge.openwrt {
  background: #4299e1;
  color: white;
}

.compatibility-badge.immortalwrt {
  background: #48bb78;
  color: white;
}

/* 指南区域样式 */
.guide-section {
  padding: 4rem 0;
}

.guide-content {
  max-width: 800px;
  margin: 0 auto;
}

.warning-box {
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.warning-box h4 {
  color: #c53030;
  margin-bottom: 0.5rem;
}

.warning-box ul {
  margin: 0.5rem 0 0 1.5rem;
  color: #744210;
}

.guide-steps {
  margin-bottom: 2rem;
}

.guide-steps h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.guide-steps ol {
  margin-left: 1.5rem;
  color: #4a5568;
  line-height: 1.6;
}

.guide-steps li {
  margin-bottom: 0.5rem;
}

.resources h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.resource-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.resource-link {
  background: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;
}

.resource-link:hover {
  background: #3182ce;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
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