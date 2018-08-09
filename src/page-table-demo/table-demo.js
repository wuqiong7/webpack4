import {Component} from 'react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import _ from 'lodash'
import {Button, Table, Modal, Popconfirm} from 'antd'
import {SearchForm, CreateForm} from './form'
import TableStore from './store-table-demo'

const store = new TableStore()

@observer
export default class TableDemo extends Component {
  render() {
    const me = this
    // 表格配置
    const columns = [{
      title: '工号',
      dataIndex: 'workNo',
      width: '8%',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    }, {
      title: '部门',
      dataIndex: 'deptId',
      width: '15%',
      render: val => _.find(toJS(store.deptList), dept => dept.deptId === val).deptName,
    }, {
      title: '性别',
      dataIndex: 'sex',
      width: '10%',
      render: val => (val === 'M' ? '男' : '女'),
    }, {
      title: '手机',
      dataIndex: 'mobile',
      width: '15%',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }, {
      key: 'action',
      title: '操作',
      width: '15%',
      render: (val, rowData) => (
        <span>
          <a
            className="mr8"
            onClick={() => { store.editPeople(rowData) }}
          >编辑</a>
          <Popconfirm
            placement="top"
            title="删除后不可恢复，确认要删除吗？"
            onConfirm={() => { store.deletePeople(rowData) }}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    }]

    return (
      <div className="page-table-demo">
        <SearchForm
          ref={form => me.searchForm = form}
          deptList={toJS(store.deptList)}
          onChange={() => { store.formChange(me.searchForm.getFieldsValue()) }}
        />

        <div className="pb16">
          <Button
            type="primary"
            onClick={() => { store.createPeople() }}
          >
            新增人员
          </Button>
        </div>

        <Table
          dataSource={toJS(store.tableData)}
          columns={columns}
          onChange={pagination => { store.getTableData(pagination) }}
          loading={store.tableLoading}
          pagination={store.pagination}
        />

        <Modal
          visible={store.dialogVisible}
          width={700}
          title={store.formValues.workNo ? '编辑人员' : '新增人员'}
          maskClosable={false}
          destroyOnClose
          confirmLoading={store.dialogDisabled}
          onOk={() => { me.handleDialogOk() }} 
          onCancel={() => { store.dialogVisible = false }}
        >
          <CreateForm
            ref={form => { me.editForm = form }}
            values={toJS(store.formValues)}
            deptList={toJS(store.deptList)}
          />
        </Modal>
        
      </div>
    )
  }

  componentDidMount() {
    store.getDeptList()
    store.getTableData()
  }

  handleDialogOk() {
    const me = this
    me.editForm.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      store.savePeople(values)
    })
  }
}
