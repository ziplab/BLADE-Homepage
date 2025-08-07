# VIDEO-BLADE

This is the official repository for Video-BLADE, a framework for efficient video generation through joint training of adaptive sparse attention and step distillation.

## 🌐 Homepage

Visit our project homepage: [https://tacossp.github.io/VIDEO-BLADE/](https://tacossp.github.io/VIDEO-BLADE/)

## 🎯 主要特性

- **专业设计**：符合学术界审美标准的现代化设计
- **响应式布局**：完美适配桌面、平板和手机设备
- **交互功能**：平滑滚动导航、图片画廊、视频展示
- **性能优化**：快速加载、懒加载图片、优化动画
- **可访问性**：支持键盙导航、屏幕阅读器兼容

## 📁 文件结构

```
homepage/
├── index.html          # 主页面
├── css/
│   ├── style.css      # 主样式文件
│   └── responsive.css # 响应式样式
├── js/
│   ├── main.js        # 主要JavaScript功能
│   └── gallery.js     # 图片画廊功能
├── images/            # 图片资源
│   ├── method_overview.png
│   ├── Table1.png
│   ├── Table2.png
│   └── ...
├── videos/            # 视频资源
│   ├── cogvideox_baseline_*.mp4
│   ├── cogvideox_blade_*.mp4
│   └── ...
├── assets/            # 其他资源
├── test.html          # 测试页面
└── README.md          # 说明文档
```

## 🚀 本地测试

### 方法1：HTTP服务器（推荐）
```bash
cd homepage
python3 -m http.server 8000
```
然后在浏览器中访问：http://localhost:8000

### 方法2：直接打开文件
双击 `index.html` 文件（某些功能可能受限）

## 🌐 GitHub Pages部署

本项目已部署到GitHub Pages，可通过以下URL访问：
https://tacossp.github.io/VIDEO-BLADE/

## 🔧 技术栈

- **HTML5**：语义化标记
- **CSS3**：现代样式特性（Grid、Flexbox、Variables）
- **JavaScript**：原生ES6+代码
- **字体**：Inter（Google Fonts）
- **图标**：Font Awesome

## 📊 性能优化

- 图片懒加载
- CSS和JavaScript压缩（生产环境）
- 现代浏览器特性检测
- 渐进式增强设计

---

**Video-BLADE Homepage** - 专业、美观、高效的学术论文展示页面
