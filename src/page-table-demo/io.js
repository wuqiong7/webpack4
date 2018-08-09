import ioContext from '../common/io-context'

ioContext.create('table', {
  // 获取部门下拉列表
  getDeptList: {
    mock: true,
    mockUrl: 'page-table-demo/getDeptList',
    url: '',
    method: 'GET',
  },
  // 获取表格数据
  getTableData: {
    mock: true,
    mockUrl: 'page-table-demo/getTableData',
    url: '',
    method: 'GET',
  },
  // 删除人员
  deletePeople: {
    mock: true,
    mockUrl: 'page-table-demo/deletePeople',
    url: '',
  },
  // 新增、编辑人员
  savePeople: {
    mock: true,
    mockUrl: 'page-table-demo/savePeople',
    url: '',
  },
  // 校验工号重复
  checkWorkNo: {
    mock: true,
    mockUrl: 'page-table-demo/checkWorkNo',
    url: '',
  },
  // 校验姓名重复
  checkName: {
    mock: true,
    mockUrl: 'page-table-demo/checkName',
    url: '',
  },
})

export default ioContext.api.table
