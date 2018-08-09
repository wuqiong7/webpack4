import {asyncComponent} from '../common/util'
import './hello.styl'

export default asyncComponent(async () => {
  try {
    const module = await import('./hello')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})
