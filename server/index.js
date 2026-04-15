const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const DATA_DIR = path.join(__dirname, 'data');

// 中间件配置
app.use(cors());
app.use(express.json());
// 只有在dist目录存在时才启用静态文件服务
if (fs.existsSync(DIST_DIR)) {
    app.use(express.static(DIST_DIR));
}

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readDataFile(fileName) {
    const filePath = path.join(DATA_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// API路由

// 首页数据
app.get('/api/home', (req, res) => {
    try {
        const homeData = readDataFile('home.json');
        if (!homeData) {
            return res.status(404).json({ error: '首页数据不存在' });
        }
        res.json(homeData);
    } catch (error) {
        res.status(500).json({ error: '首页数据加载失败' });
    }
});

// 安卓刷机数据
app.get('/api/android', (req, res) => {
    try {
        const androidData = readDataFile('android.json');
        if (!androidData) {
            return res.status(404).json({ error: '安卓数据不存在' });
        }
        res.json(androidData);
    } catch (error) {
        res.status(500).json({ error: '安卓数据加载失败' });
    }
});

// 电脑装机数据
app.get('/api/pc', (req, res) => {
    try {
        const pcData = readDataFile('pc.json');
        if (!pcData) {
            return res.status(404).json({ error: '电脑装机数据不存在' });
        }
        res.json(pcData);
    } catch (error) {
        res.status(500).json({ error: '电脑装机数据加载失败' });
    }
});

// 教程数据
app.get('/api/tutorials', (req, res) => {
    try {
        const tutorialsData = readDataFile('tutorials.json');
        if (!tutorialsData) {
            return res.status(404).json({ error: '教程数据不存在' });
        }
        res.json(tutorialsData);
    } catch (error) {
        res.status(500).json({ error: '教程数据加载失败' });
    }
});

// 音乐播放器数据
app.get('/api/music', (req, res) => {
    try {
        const musicData = readDataFile('music.json');
        if (!musicData) {
            return res.status(404).json({ error: '音乐数据不存在' });
        }
        res.json(musicData);
    } catch (error) {
        res.status(500).json({ error: '音乐数据加载失败' });
    }
});

// 工具箱数据
app.get('/api/tools', (req, res) => {
    try {
        const toolsData = readDataFile('tools.json');
        if (!toolsData) {
            return res.status(404).json({ error: '工具箱数据不存在' });
        }
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
if (process.env.NODE_ENV === 'production' && fs.existsSync(DIST_DIR)) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
}

// 尝试启动服务器，处理端口占用问题
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`服务器运行在 http://localhost:${port}`);
        // 存储实际使用的端口
        module.exports.port = port;
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.log(`端口 ${port} 已被占用，尝试使用端口 ${port + 1}`);
            startServer(port + 1);
        } else {
            console.error('服务器启动失败:', error);
        }
    });
}

// 启动服务器
startServer(PORT);

// 导出app供Electron使用
module.exports = app;
