# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是Video-BLADE学术论文的专业主页网站，是一个纯静态HTML/CSS/JavaScript网站，用于展示ICLR 2025提交的研究工作。项目采用现代化的响应式设计，包含论文摘要、方法介绍、实验结果展示、图片画廊等功能。

## 开发和测试命令

### 本地测试服务器
```bash
# 启动HTTP服务器进行本地测试（推荐方式）
cd homepage
python3 -m http.server 8000
```
然后访问 http://localhost:8000

### 测试页面
- 打开 `test.html` 查看完整的功能测试报告
- 包含文件结构检查、内容验证、交互功能测试等

## 代码架构

### 文件结构
```
homepage/
├── index.html          # 主页面，包含所有section和内容结构
├── css/
│   ├── style.css      # 主样式文件，包含CSS变量、组件样式
│   └── responsive.css # 响应式样式，断点：1024px/768px/480px
├── js/
│   ├── main.js        # 主要功能：导航、滚动、复制、动画、标签页
│   └── gallery.js     # 图片画廊：lightbox、懒加载、键盘导航
├── images/            # 图片资源（PNG/JPG）
├── videos/            # 视频资源（MP4）
├── assets/            # 其他资源和文档
└── test.html          # 功能测试页面
```

### 核心组件架构

#### 1. 样式系统 (CSS)
- **CSS变量**: 在`:root`中定义颜色、字体、间距等设计token
- **响应式设计**: 移动优先，四个断点（480px/768px/1024px/1200px+）
- **组件化**: 每个section都有独立的样式类

#### 2. JavaScript模块
- **main.js**: 处理导航、滚动效果、动画、标签页系统、复制功能
- **gallery.js**: 独立的画廊模块，包含lightbox、触摸手势、键盘导航
- **无框架**: 使用原生ES6+ JavaScript，没有外部依赖

#### 3. 页面结构
- **单页面应用**: 所有内容在index.html中，使用锚点导航
- **主要sections**: hero, abstract, contributions, method, results, gallery, citation
- **导航系统**: 固定导航栏，平滑滚动到对应section

## 开发规范

### 样式约定
- 使用CSS变量进行颜色和尺寸管理
- 遵循BEM命名约定（block__element--modifier）
- 移动优先的响应式设计
- 使用CSS Grid和Flexbox进行布局

### JavaScript约定
- 使用ES6+语法和现代JavaScript特性
- 模块化设计，每个功能独立
- 事件委托和性能优化
- 无外部依赖，纯原生JavaScript

### 文件管理
- 图片文件放在`images/`目录
- 视频文件放在`videos/`目录  
- 保持文件命名的一致性和描述性

### 性能优化
- 图片懒加载已实现
- CSS和JavaScript按功能分离
- 使用现代浏览器特性
- 渐进式增强设计

## 常见修改任务

### 更新内容
- 修改`index.html`中的论文信息、作者、摘要等
- 替换`images/`中的图片文件
- 更新`videos/`中的视频文件

### 样式调整
- 修改`css/style.css`中的CSS变量来改变主题颜色
- 调整`css/responsive.css`中的断点和布局

### 功能扩展
- 在`js/main.js`中添加新的交互功能
- 在`js/gallery.js`中修改画廊行为
- 确保新功能在移动端也能正常工作

### 部署选项
- GitHub Pages: 直接部署静态文件
- Netlify/Vercel: 拖拽部署或Git连接
- 任何静态文件托管服务

## 资源管理

### 视频和图像文件夹
- 所有视频文件均在`All_videos`文件夹下
- `images`文件夹包含：
  - ASA mask产生机制的可视化
  - 计算过程的attention可视化
  - 模型整体流程图

## 文件位置记录

- **论文LaTeX文件**: AAAI26.tex

## 仓库信息

- **BLADE论文GitHub仓库**: https://github.com/Tacossp/VIDEO-BLADE