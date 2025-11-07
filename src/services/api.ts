import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证token等
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// 首页相关API
export const homeAPI = {
  // 获取首页数据
  getHomeData: () => api.get('/home'),
  
  // 更新首页数据
  updateHomeData: (data: any) => api.put('/home', data),
  
  // 获取首页统计数据
  getHomeStats: () => api.get('/home/stats'),
  
  // 获取首页推荐内容
  getHomeRecommendations: () => api.get('/home/recommendations')
}

// 安卓刷机相关API
export const androidAPI = {
  // 获取所有设备列表
  getDevices: () => api.get('/android/devices'),
  
  // 获取单个设备详情
  getDevice: (deviceId: string) => api.get(`/android/devices/${deviceId}`),
  
  // 下载文件
  downloadFile: (fileId: string) => api.get(`/android/download/${fileId}`),
  
  // 记录下载统计
  recordDownload: (fileId: string) => api.post(`/download/${fileId}`),
  
  // 获取下载统计
  getDownloadStats: () => api.get('/download-stats'),
  
  // 获取安卓数据
  getAndroidData: () => api.get('/android')
}

// 电脑装机相关API
export const pcAPI = {
  // 获取配置单列表
  getConfigurations: () => api.get('/pc/configurations'),
  
  // 获取硬件排行榜
  getRankings: (type: string) => api.get(`/pc/rankings/${type}`),
  
  // 获取配置对比数据
  getComparison: (config1: string, config2: string) => 
    api.get(`/pc/compare?config1=${config1}&config2=${config2}`),
  
  // 获取PC数据
  getPCData: () => api.get('/pc')
}

// 音乐播放器相关API
export const musicAPI = {
  // 获取播放列表
  getPlaylist: () => api.get('/music/playlist'),
  
  // 添加歌曲到播放列表
  addToPlaylist: (song: any) => api.post('/music/playlist', song),
  
  // 从播放列表移除歌曲
  removeFromPlaylist: (songId: string) => api.delete(`/music/playlist/${songId}`),
  
  // 清空播放列表
  clearPlaylist: () => api.delete('/music/playlist'),
  
  // 上传音乐文件
  uploadMusic: (formData: FormData) => api.post('/music/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // 获取音乐数据
  getMusicData: () => api.get('/music')
}

// 工具箱相关API
export const toolsAPI = {
  // 获取工具列表
  getTools: () => api.get('/tools'),
  
  // 获取工具分类
  getCategories: () => api.get('/tools/categories'),
  
  // 获取工具详情
  getTool: (toolId: string) => api.get(`/tools/${toolId}`),
  
  // 启动工具
  launchTool: (toolId: string) => api.post(`/tools/${toolId}/launch`),
  
  // 获取工具数据
  getToolsData: () => api.get('/tools/data')
}

// 通用下载功能
export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob'
    })
    
    // 创建下载链接
    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
    
    return true
  } catch (error) {
    console.error('Download failed:', error)
    return false
  }
}

// 文件上传辅助函数
export const uploadFile = async (file: File, onProgress?: (progress: number) => void) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}

export default api