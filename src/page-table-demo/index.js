import {asyncComponent} from '../common/util'
import './table-demo.styl'

export default asyncComponent(async () => {
  try {
    const module = await import('./table-demo')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})
