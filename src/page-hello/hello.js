import {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {Button, Modal} from 'antd'

import HelloStore from './store-hello'

const store = new HelloStore()

@observer
export default class Hello extends Component {
  render() {
    return (
      <div className="page-hello">
        <div>
          <h2>新建页面：</h2>
          <p>
            oner page [name]
          </p>

          <h2 className="mt10">新建组件：</h2>
          <p>
            oner mod [name]
          </p>

          <h2 className="mt10">antd主题自定义：</h2>
          <p>
            通过查看 `node_modules/antd/lib/style/themes/default.less` 知道你需要修改的key,
            再到 `src/theme/index.js` 下将其覆盖。
          </p>

          <h2 className="mt10">SvgIcon：</h2>
          <p>
            <h3>资源引用</h3>
            <code>
              import {`{SvgIcon}`} from '@dtwave/uikit' <br />
              import '../icon'
            </code>

            <h3>使用使用</h3>
            &lt;SvgIcon name="image" fill="red" /&gt;<br />
          </p>

        </div>
      </div>
    )
  }
}
