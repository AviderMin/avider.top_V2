const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
// 只有在dist目录存在时才启用静态文件服务
if (fs.existsSync(path.join(__dirname, '../dist'))) {
    app.use(express.static(path.join(__dirname, '../dist')));
}

// 数据文件路径
const DATA_DIR = path.join(__dirname, 'data');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// API路由

// 首页数据
app.get('/api/home', (req, res) => {
    try {
        const homeData = require('./data/home.json');
        res.json(homeData);
    } catch (error) {
        res.status(500).json({ error: '首页数据加载失败' });
    }
});

// 安卓刷机数据
app.get('/api/android', (req, res) => {
    try {
        const androidData = require('./data/android.json');
        res.json(androidData);
    } catch (error) {
        res.status(500).json({ error: '安卓数据加载失败' });
    }
});

// 电脑装机数据
app.get('/api/pc', (req, res) => {
    try {
        const pcData = require('./data/pc.json');
        res.json(pcData);
    } catch (error) {
        res.status(500).json({ error: '电脑装机数据加载失败' });
    }
});

// 音乐播放器数据
app.get('/api/music', (req, res) => {
    try {
        const musicData = require('./data/music.json');
        res.json(musicData);
    } catch (error) {
        res.status(500).json({ error: '音乐数据加载失败' });
    }
});

// 工具箱数据
app.get('/api/tools', (req, res) => {
    try {
        const toolsData = require('./data/tools.json');
        res.json(toolsData);
    } catch (error) {
        res.status(500).json({ error: '工具箱数据加载失败' });
    }
});

// 文件下载统计
app.post('/api/download/:fileId', (req, res) => {
    try {
        const { fileId } = req.params;
        const statsFile = path.join(DATA_DIR, 'download_stats.json');
        
        let stats = {};
        if (fs.existsSync(statsFile)) {
            stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
        }
        
        stats[fileId] = (stats[fileId] || 0) + 1;
        fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
        
        res.json({ success: true, count: stats[fileId] });
    } catch (error) {
        res.status(500).json({ error: '下载统计失败' });
    }
});

// 获取下载统计
app.get('/api/download-stats', (req, res) => {
    try {
        const statsFile = path.join(DATA_DIR, 'download_stats.json');
        if (fs.existsSync(statsFile)) {
            const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
            res.json(stats);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ error: '获取下载统计失败' });
    }
});

// 默认路由 - 只在生产环境下返回Vue应用
if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, '../dist'))) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});