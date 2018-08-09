import {asyncComponent} from '../common/util'
import './<%component-name%>.styl'

export default asyncComponent(async () => {
  try {
    const module = await import('./<%component-name%>')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})
