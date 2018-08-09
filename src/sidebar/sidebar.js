import {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {Link, withRouter} from 'react-router-dom'
import cls from 'classnames'
import {Menu, Icon} from 'antd'

const SubMenu = Menu.SubMenu

@observer
class Sidebar extends Component {
  @observable collapsed = false

  @action toggleCollapsed() {
    this.collapsed = !this.collapsed
  }

  render() {
    return (
      <div className={cls('sidebar FBV FBJB', {fold: this.collapsed})}>
        <Menu
          defaultSelectedKeys={['hello']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={this.collapsed}
        >
          <Menu.Item key="hello">
            <Icon type="pie-chart" />
            <Link to="/hello">Hello</Link>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>场景</span></span>}>
            <Menu.Item key="table">
              <Link to="/table-demo">表格表单</Link>
            </Menu.Item>
            <Menu.Item key="uikit">
              <Link to="/uikit">oner-uikit</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <div className="sidebar-bottom">
          <label htmlFor="icon" onClick={() => this.toggleCollapsed()}>
            <Icon type={this.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </label>
        </div>
      </div>
    )
  }
}

export default withRouter(Sidebar)
