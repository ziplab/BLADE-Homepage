# Video-BLADE 学术论文主页

这是Video-BLADE论文的专业学术主页，用于展示ICLR 2025提交的研究工作。

## 🎯 主要特性

- **专业设计**：符合学术界审美标准的现代化设计
- **响应式布局**：完美适配桌面、平板和手机设备
- **交互功能**：平滑滚动导航、图片画廊、视频展示
- **性能优化**：快速加载、懒加载图片、优化动画
- **可访问性**：支持键盘导航、屏幕阅读器兼容

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
│   ├── performance_chart.png
│   ├── attention_vis1.png
│   ├── attention_vis2.png
│   └── ...
├── videos/            # 视频资源
│   ├── cogvideo_baseline_p3.mp4
│   ├── cogvideo_blade_p3.mp4
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

## 🌐 部署选项

### GitHub Pages
1. 将homepage文件夹内容推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源

### Netlify
1. 将homepage文件夹拖拽到Netlify部署页面
2. 或连接GitHub仓库自动部署

### Vercel
1. 连接GitHub仓库
2. 设置根目录为homepage文件夹
3. 自动部署

## 🎨 自定义修改

### 更新内容
- 修改 `index.html` 中的论文信息
- 替换 `images/` 文件夹中的图片
- 更新 `videos/` 文件夹中的视频

### 样式调整
- 修改 `css/style.css` 中的颜色变量
- 调整 `css/responsive.css` 中的响应式断点

### 功能扩展
- 在 `js/main.js` 中添加新的交互功能
- 在 `js/gallery.js` 中修改画廊行为

## 📱 响应式断点

- **大屏幕**：1024px以上（桌面）
- **平板**：768px-1024px
- **手机**：480px-768px
- **小屏手机**：480px以下

## 🎯 主要组件

### 导航栏
- 固定在顶部
- 平滑滚动到各个section
- 响应式汉堡菜单（移动端）

### 主要sections
- **Hero**：标题、作者、会议信息
- **Abstract**：摘要和关键结果
- **Contributions**：三大核心贡献
- **Method**：方法概述和架构图
- **Results**：实验结果和性能对比
- **Gallery**：视觉结果展示
- **Citation**：引用信息

### 交互功能
- 图片点击放大（Lightbox）
- 标签页切换
- 一键复制BibTeX
- 平滑滚动动画

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

## 🧧 测试完成

运行 `test.html` 查看完整的测试报告，包括：
- 文件结构检查
- 内容结构验证
- 交互功能测试
- 可访问性检查
- 性能评估
- 浏览器兼容性

## 🎉 部署状态

✅ 所有功能已完成并测试通过
✅ 响应式设计已优化
✅ 性能已优化
✅ 可访问性已实现
✅ 准备投入生产使用

---

**Video-BLADE Homepage** - 专业、美观、高效的学术论文展示页面