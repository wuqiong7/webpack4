import {Form, Input, Radio, Select, Row, Col} from 'antd'
import io from './io'

const FormItem = Form.Item

// 搜索表单
exports.SearchForm = Form.create({
  onFieldsChange: props => {
    props.onChange()
  },
})(
  props => {
    const {form} = props
    const {getFieldDecorator} = form
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    }
    return (
      <Form>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="工号"
            >
              {getFieldDecorator('workNo')(
                <Input placeholder="请输入工号" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('name')(
                <Input placeholder="请输入姓名" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="部门"
            >
              {getFieldDecorator('deptId', {
                initialValue: 'all',
              })(
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="请下拉选择"
                >
                  <Select.Option key="all" value="all">全部</Select.Option>
                  {
                    (props.deptList || []).map(item => (
                      <Select.Option key={item.deptId} value={item.deptId}>
                        {item.deptName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('sex', {})(
                <Radio.Group>
                  <Radio value="M">男</Radio>
                  <Radio value="F">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="手机"
            >
              {getFieldDecorator('mobile')(
                <Input placeholder="请输入手机号" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="邮箱"
            >
              {getFieldDecorator('email')(
                <Input placeholder="请输入邮箱" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
)

// 新增、编辑表单
exports.CreateForm = Form.create()(
  props => {
    const {form, values} = props
    const {getFieldDecorator} = form
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    }
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="工号"
        >
          {getFieldDecorator('workNo', {
            initialValue: values.workNo,
            validateFirst: true,
            rules: [{
              required: true, message: '请输入工号',
            }, {
              max: 6, message: '工号长度不能超过6位',
            }, {
              validator: (rule, value, callback) => {
                io.checkWorkNo({
                  workNo: value,
                }).then(res => {
                  if (res.isExist) {
                    callback('工号已存在，请重新输入')
                  }
                  callback()
                }, res => {
                  callback(res.message)
                })
              },
            }],
          })(
            <Input placeholder="请输入工号" disabled={!!values.workNo} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('name', {
            initialValue: values.name,
            validateFirst: true,
            rules: [{
              required: true, message: '请输入姓名',
            }, {
              max: 32, message: '姓名长度不能超过32位',
            }, {
              pattern: /^((\w)|-|([\u4e00-\u9fa5]))+$/, message: '只能中文、大小写字母、数字、下划线、中划线',
            }, {
              validator: (rule, value, callback) => {
                io.checkName({
                  workNo: values.workNo,
                  name: value,
                }).then(res => {
                  if (res.isExist) {
                    callback('姓名已存在，请重新输入')
                  }
                  callback()
                }, res => {
                  callback(res.message)
                })
              },
            }],
          })(
            <Input placeholder="请输入姓名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门"
        >
          {getFieldDecorator('deptId', {
            initialValue: values.deptId,
            rules: [{
              required: true, message: '请选择部门',
            }],
          })(
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="请下拉选择"
            >
              {
                (props.deptList || []).map(item => (
                  <Select.Option key={item.deptId} value={item.deptId}>
                    {item.deptName}
                  </Select.Option>
                ))
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex', {
            initialValue: values.sex,
            rules: [{
              required: true, message: '请选择性别',
            }],
          })(
            <Radio.Group>
              <Radio value="M">男</Radio>
              <Radio value="F">女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机"
        >
          {getFieldDecorator('mobile', {
            initialValue: values.mobile,
            validateFirst: true,
            rules: [{
              required: true, message: '请输入手机号',
            }, {
              pattern: /^1\d{10}$/, message: '手机号格式不正确',
            }],
          })(
            <Input placeholder="请输入手机号" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            initialValue: values.email,
            validateFirst: true,
            rules: [{
              required: true, message: '请输入邮箱',
            }, {
              type: 'email', message: '邮箱格式不正确',
            }],
          })(
            <Input placeholder="请输入邮箱" />
          )}
        </FormItem>
        <FormItem 
          {...formItemLayout}
          label="人物说明"
        >
          {getFieldDecorator('comment', {
            initialValue: values.comment,
            rules: [{
              max: 200, message: '内容不能超过200个字符',
            }],
          })(
            <Input.TextArea
              autosize={{minRows: 3, maxRows: 10}}
              placeholder="请输入人物说明"
            />
          )}
        </FormItem>
      </Form>
    )
  }
)
