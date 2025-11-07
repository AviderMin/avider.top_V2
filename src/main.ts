import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Lucide Vue 图标库
import { Home, Smartphone, Monitor, Music, Wrench, Moon, Bot, Globe, Palette, File, Key, Box, Laptop, Cog, Info, Network, Code, Image, Ruler, DollarSign, Edit } from 'lucide-vue-next'

import App from './App.vue'
import router from './router'

// 引入全局样式
import './assets/css/variables.css'
import './assets/css/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册Lucide图标组件
app.component('HomeIcon', Home)
app.component('SmartphoneIcon', Smartphone)
app.component('MonitorIcon', Monitor)
app.component('MusicIcon', Music)
app.component('WrenchIcon', Wrench)
app.component('MoonIcon', Moon)
app.component('BotIcon', Bot)
app.component('GlobeIcon', Globe)
app.component('PaletteIcon', Palette)
app.component('FileIcon', File)
app.component('KeyIcon', Key)
app.component('BoxIcon', Box)
app.component('LaptopIcon', Laptop)
app.component('CogIcon', Cog)
app.component('InfoIcon', Info)
app.component('NetworkIcon', Network)
app.component('CodeIcon', Code)
app.component('ImageIcon', Image)
app.component('RulerIcon', Ruler)
app.component('DollarSignIcon', DollarSign)
app.component('EditIcon', Edit)

app.mount('#app')
