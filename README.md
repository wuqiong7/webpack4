## 目录结构

```
.
├── _template  --------------------  页面/组件 模板
├── dist  -------------------------  打包后的静态资源文件夹
├── mock  -------------------------  mock 数据存放的地方
├── server  -----------------------  写自定义插件的地方，keeper.js 是写动态配置的
├── .babelrc  ---------------------  转码规则和插件配置文件
├── .eslintrc  --------------------  eslint代码规范配置文件
├── jsconfig.json  ----------------  vscode 需要的配置文件，否则使用 @observer 之类的修饰符会报错
├── package.json  -----------------  项目配置
├── postcss.config.js  ------------  处理css，加前缀的
├── project.config.js  ------------  oner-server 的配置文件，相当强大
├── project.plugins.js  -----------  oner-server 的自定义插件
├── README.md  --------------------  说明文件
├── template.njk  -----------------  渲染模板
├── webpack.config.js  ------------  webpack的配置文件
├── app.js  -----------------------  项目的入口
└── src  --------------------------  源码目录
    ├── common  -------------------  通用工具的文件夹
    │   ├── io-context.js  --------  配置 nattay-fetch
    │   └── util.js  --------------  异步 require 需要的工具
    │   └── common.styl  ----------  通用样式
    ├── frame ---------------------  整体框架组件
    │   ├── index.js  -------------  组件入口文件，不需要异步
    │   ├── frame.js  -------------  整体框架视图逻辑
    │   └── frame.styl  -----------  组件样式
    ├── xxx -----------------------  自定义组件
    │   ├── index.js  -------------  组件入口文件，不需要异步
    │   ├── xxx.js  ---------------  组件视图逻辑
    │   └── xxx.styl  -------------  组件样式
    └── page-xxx  -----------------  页面集合目录
        ├── index.js  -------------  页面入口文件,异步按需加载
        ├── io.js  ----------------  接口配置
        ├── store-xxx.js  ---------  mobx 数据管理器
        ├── xxx.js  ---------------  页面视图逻辑
        └── xxx.styl  -------------  页面样式
```

## 常用命令

- 本地启动项目
    - 下面的命令会启动两个服务，一个是静态资源的监听服务，一个是 node 端服务

```
npm start
```
    
- 新增页面

```
// hello 是页面名称，不要加上 page-
oner page hello
```

- 新增页面

```
// test 是组件名称，不要加上 component-
oner mod test
```



- 打包项目 ，项目发布两步走：
    1. npm run build 后 用 [oss](oss.cadillac.dtwave-inc.com:9999/file-list.html) 上传 dist 文件夹下的静态资源文件
    2. 提交代码，用 [ops](ops.dtwave-inc.com) 部署 node

```
npm run build
```



- 杀掉占用端口的进程

```
npm run k3 // 杀掉 3000 端口进程
npm run k9 // 杀掉 9999 端口进程
```


## 调试 oner-server
1 把 oner-server pull 下来，配置启动项

```
    "program": "${workspaceRoot}/oner-server",
    "cwd":"/Users/lvon/Desktop/project/pc/estates-v2",
    "env":{
        "CLIENT_ENV":"development",
        "NODE_ENV":"development",
        "ONER_SERVER_ENV":"development"
    }
```

2 项目只启动监听静态资源的服务

```
npm run watch
```

3 修改项目的 project.config.js

```
// const env = require('oner-server/env') // 这句注释掉
const env = require('../oner-server/env') // 加上 ../
```


## mock 数据
- 在 mock 文件夹中放 mock 数据，文件路径就是 io 中的 mockUrl 路径
- 为啥用 .js 不用 .json ？  
	- .js 更强大，扩展性更强。
- src/common/io-context 中添加

```
mockUrlPrefix: '/mock/'
```

- xxx/xxx/io.js 中你要 mock 的接口中添加

```
mock: true,
mockUrl: 'page-hello/getData',
```

- 其他的跟 natty-fetch 使用方式一样
- natty-fetch [使用说明](https://github.com/jias/natty-fetch)


## 其他
- 模板提供了最经典的布局，想要更复杂的布局，需要自行修改 component-frame 
- 全局样式可以写在 src/component-frame/frame.styl
- 全局的js脚本可以写在 src/index.js
