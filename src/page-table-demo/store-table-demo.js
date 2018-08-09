import {observable, action, runInAction, toJS} from 'mobx'
import {message} from 'antd'
import _ from 'lodash'
import io from './io'

export default class HelloStore {
  // 被观察的属性
  @observable dialogVisible = false
  @observable dialogDisabled = false
  @observable searchValues = {}
  @observable formValues = {}
  @observable deptList = []
  @observable tableLoading = true
  @observable tableData = []
  @observable pagination = {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
  }

  // 获取部门下拉列表
  @action async getDeptList() {
    try {
      const res = await io.getDeptList()
      this.deptList = res
    } catch (res) {
      message.error(res.message)
    }
  }

  // 获取表格数据
  @action async getTableData(pagination) {
    const me = this
    if (!pagination) {
      pagination = {
        current: 1,
        pageSize: me.pagination.pageSize,
      }
    }
    const params = _.assign({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
    }, me.searchValues)

    try {
      me.tableLoading = true
      const res = await io.getTableData(params)
      const newPagination = _.assign({}, me.pagination, {
        total: res.totalCount,
        current: res.currentPage,
        pageSize: res.pageSize,
      })
      runInAction(() => {
        me.tableData = res.data
        me.pagination = newPagination
        me.tableLoading = false
      })
    } catch (res) {
      message.error(res.message)
    }
  }

  // 表单值发生改变
  @action formChange(values) {
    this.searchValues = values
    this.getTableData()
  }

  // 删除人员
  @action async deletePeople(rowData) {
    const me = this
    try {
      await io.deletePeople({
        workNo: rowData.workNo,
      })
      message.success('删除成功!')
      me.getTableData()
    } catch (res) {
      message.error(res.message)
    }
  }

  // 新增基线
  @action createPeople() {
    const me = this
    me.formValues = {}
    me.dialogVisible = true
  }

  // 编辑基线
  @action editPeople(rowData) {
    const me = this
    me.formValues = toJS(rowData)
    me.dialogVisible = true
  }

  // 保存基线
  @action async savePeople(values) {
    const me = this
    me.dialogDisabled = true
    try {
      await io.savePeople(values)
      message.success('保存成功!')
      me.getTableData()
      runInAction(() => {
        me.dialogVisible = false
        me.dialogDisabled = false
      })
    } catch (res) {
      message.error(res.message)
    }
  }
  
}
