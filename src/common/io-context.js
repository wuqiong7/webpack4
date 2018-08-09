import nattyFetch from 'natty-fetch/dist/natty-fetch'

const context = nattyFetch.context({
  urlPrefix: '/',
  method: 'POST',
  mock: false,
  rest: true,
  header: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // 目前还没有做鉴权，下面的设置为`false`，和服务端的*相对应
  // 如果设为`true`，需要服务端设置响应头`Access-Control-Allow-Origin`为具体的白名单
  withCredentials: false,
  mockUrlPrefix: '/mock/',
  urlMark: false, // 添加额外参数后端会报错，如：_api，略坑
  urlStamp: false, // 添加额外参数后端会报错，如：_stamp，略坑
  fit(response) {
    return {
      success: response.success,
      content: response.content || {},
      error: {
        message: response.message,
        code: response.code,
      },
    }
  },
})

export default context
