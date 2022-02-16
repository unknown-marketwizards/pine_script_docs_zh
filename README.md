# Pine v5 中文版用户手册

[在线浏览](https://unknown-marketwizards.github.io/pine_script_docs_zh)

> Pine是一种轻量级语言，专注于开发指标和策略这种特定任务。TradingView的大多数内置指标都是用Pine编写的。我们的最终目标是让广泛的用户对Pine更易接受并且容易理解。
>
> 本项目基于[docsify](https://github.com/docsifyjs/docsify/)翻译自[Pine Script 5 ](https://www.tradingview.com/pine-script-docs/en/v5/index.html)



## 文件描述

`_sidebar.md` 文档目录



## 如何一起翻译？

（环境可以选择性搭建）

1. 克隆本库
1. 在`_sidebar.md`中创建对应目录然后新建md文件
2. 对照[Pine Script 5 ](https://www.tradingview.com/pine-script-docs/en/v5/index.html)翻译文档
3. 提交pr





## 如何在本地运行？

### 环境

- nodejs或python

### 步骤(根据环境2选1)：

#### nodejs环境

1.  克隆本库
2.  安装docsify

```bash
npm i docsify-cli -g
```

3. 预览

```bash
cd pine_script_docs_zh && docsify serve
```

在浏览器中输入网址

`http://localhost:3000`

#### Python环境

1. 克隆本库
2. 启动http服务

- python3：

```bash
cd pine_script_docs_zh && python -m http.server 3000
```

- python2

```bash
cd pine_script_docs_zh && python -m SimpleHTTPServer 3000
```

3. 在浏览器中输入网址

`http://localhost:3000`



## 链接

[Pine Script 5 User Manual ](https://www.tradingview.com/pine-script-docs/en/v5/index.html)

[docsify中文版文档](https://docsify.js.org/#/zh-cn/)

[docsify英文版文档](https://docsify.js.org/#/quickstart)



