import { Form, Input, message } from "antd"
import { PageHeader } from "antd"
import { useCompanyMutation } from "hooks/company"
import * as React from "react"
import { useHistory, useLocation } from "react-router-dom"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const AddOrUpdateCompany: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const history = useHistory()
  const location = useLocation<{ mode: string; data: Company | undefined }>()

  const [form] = Form.useForm()

  const { createCompany, updateCompany } = useCompanyMutation()

  const onFinish = async (values: Partial<Company>) => {
    if (loading) {
      return
    }

    setLoading(true)

    const { name } = values

    if (!name) {
      message.error("All fields must be filled")
      return
    }
    try {
      if (location.state.mode === "create") {
        await createCompany({
          variables: {
            input: {
              name,
            },
          },
        })
      }

      if (location.state.mode === "update") {
        await updateCompany({
          variables: {
            id: location.state.data?.id,
            input: {
              name,
            },
          },
        })
      }
    } catch (e) {
      alert(e.message)
    }

    setLoading(false)
    form.resetFields()
    history.goBack()
  }

  let initialValues = {
    name: "",
  }

  if (location.state && location.state.mode === "update" && location.state.data) {
    const { name } = location.state.data
    initialValues = {
      name,
    }
  }

  return (
    <>
      <PageHeader
        title=""
        onBack={() => history.goBack()}
        extra={[
          <div key="save" className="btn-save-modal" aria-hidden="true" onClick={() => onFinish(form.getFieldsValue())}>
            {loading ? "Loading .." : "Save"}
          </div>,
        ]}
      />

      <Form
        {...formItemLayout}
        form={form}
        name="createOrUpdateCompany"
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Company Name"
          tooltip="What is your company name?"
          rules={[{ required: true, message: "Please input your company name!", whitespace: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  )
}

export default AddOrUpdateCompany
