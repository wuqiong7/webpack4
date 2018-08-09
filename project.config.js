const pkg = require('./package.json')
const path = require('path')
const env = require(process.env.ONER_SERVER_ENV === 'development' ? '../@dtwave/oner-server/common/env' : '@dtwave/oner-server/common/env')
const plugins = require('./server')

const nattyStorage = env.nattyStorage
const SERVER_ENV = env.SERVER_ENV

module.exports = {
  client: {
    // 项目名称 影响生产环境的cdn地址
    name: pkg.name,

    // 项目版本号 影响生产环境的cdn地址
    version: pkg.version,

    // 前端监听静态资源服务的端口号
    port: 3000,

    // 是否的单页面项目
    spa: true,

    // 页面配置
    page: {
      // 单页面的项目，页面 title 和 额外引用资源配置。
      title: pkg.name,
      css: [],
      js: [],

      // 多页项目，对每个页面个性化定制引用资源。上面引用的为通用的
      // hello:{
      //   title: 'Hello',
      //   css: ['//xxx.xxx.a.css'],
      //   js: ['//xxx.xxx.a.js'],
      // }

      njkPath: path.join(__dirname, 'template.njk'),
    },

  },

  server: {
    // 这个port仅用在前端开发环境
    port: 9999,

    // 向每一个请求注入自定义 header 键值对
    apiHeader: {
      // k: 'v',
    },

    // 白名单，不在白名单里的请求均为无效请求
    refererWhiteList: nattyStorage.env(SERVER_ENV, {
      development: [
        '0.0.0.0:9999',
        'localhost:9999',
        '127.0.0.1:9999',
      ],
      // 测试环境
      test: [
        `${pkg.name}-test.dtwave-inc.com:8081`,
      ],
      // 数澜生产环境
      production: [
        `${pkg.name}.dtwave-inc.com`,
      ],
    }),

    // 是不是把用户的功能点列表注入到页面中 window.__onerConfig.functionCodes
    showFunCode: false,

    // 是否使用私有化 cdn
    cdnHost: '//cdn.dtwave.com/',

    // 多页应用用的到 自定义路由，默认文件夹 page- 后面的名字
    // router: {
    //   hello: '/',
    // },

    // Node层代理API的域名，网关的，一般不用改
    apiPrefix: nattyStorage.env(SERVER_ENV, {
      development: 'http://120.26.105.132:9018',
      test: 'http://10.51.44.149:9018',
      production: 'http://api-in.dtwave-inc.com',
    }),

    // 自定义插件
    plugins,

    // node层自动注入的参数 ，userId , tenantId , productId 前两个是从 cookie 里读的，productId 是在下面配的
    autoInjectApiData: [],

    // 鉴权模块配置
    authorize: {
      // productId 找晓涛要，每个项目都会有的
      productId: '',

      // 每个项目都有自己的 code ，用户中心配权限用得到
      pageFunctionCode: '',

      // 用户中心的使用方式， private : 私有化部署    public : 跳转到用户中心
      useUserCenter: 'private',

      // 是否禁用登录
      disabled: true,

      // 和用户中心有关接口前缀
      apiPrefix: nattyStorage.env(SERVER_ENV, {
        development: 'http://120.26.105.132:9018',
        test: 'http://10.51.44.149:9018',
        production: 'http://api-in.dtwave-inc.com',
      }),

      // 使用用户中心的时候开启，用户中心的域名，主要要用这个拼登录/注册页地址
      loginUrlPrefix: nattyStorage.env(SERVER_ENV, {
        development: 'http://account-test.dtwave-inc.com:8080',
        test: 'http://account-test.dtwave-inc.com:8080',
        production: 'https://account.dtwave.com',
      }),
    },

    // 文件模块配置
    fs: {
      apiPrefix: nattyStorage.env(SERVER_ENV, {
        development: 'http://120.26.105.132:9018',
        test: 'http://10.51.44.149:9018',
        production: 'http://api-in.dtwave-inc.com',
      }),
      // 是否保存文件名及类型，设为true后，同名文件会被覆盖
      saveWithName: false,
    },
  },
}
