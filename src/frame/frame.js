import {Component} from 'react'
import {DtHeader} from '@dtwave/uikit'

// 国际化
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

// 公用CSS模块
import 'antd/dist/antd.less'
import '@dtwave/oner-flexbox/flexbox.css'
import '@dtwave/uikit/dist/uikit.min.css'
import '../common/common.styl'

// 公用模块
import Sidebar from '../sidebar'

export default class Frame extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="frame FBV" id="entry">
          <DtHeader
            logo="//cdn.dtwave.com/public/logo/shuxi-mini-h.svg"
            nickName="数栖平台"
            avatar="//cdn.dtwave.com/public/ide/avatar.svg"
            showAccount
          />
          <div className="frame-main FBH">

            {/* 左侧边栏 */}
            <div className="sidebar-col">
              <Sidebar />
            </div>

            {/* 正文部分 */}
            <div className="FB1 main-col p24">
              {this.props.children}
            </div>

          </div>
        </div>
      </LocaleProvider>
    )
  }
}
