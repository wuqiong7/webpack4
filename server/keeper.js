// 这里面的 k v 键值对会被渲染到 html 里。主要放一些容易改动的配置，修改后无需重新发布项目

module.exports = ENV => {
  const env = data => data[ENV]
  const data = {
    name: env({
      development: '7w',
    }),
    env: ENV,
  }
  return data
}
