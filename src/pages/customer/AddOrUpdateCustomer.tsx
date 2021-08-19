import { Form, Input, message } from "antd"
import { PageHeader } from "antd"
import { useCustomerMutation } from "hooks/customer"
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

const AddOrUpdateCustomer: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const history = useHistory()
  const location = useLocation<{ mode: string; data: Customer | undefined }>()

  const [form] = Form.useForm()

  const { createCustomer, updateCustomer } = useCustomerMutation()

  const onFinish = async (values: ValueFormCustomer) => {
    if (loading) {
      return
    }

    setLoading(true)
    delete values.prefix

    const { name, email, phoneNumber } = values
    const allFieldFilled = name && email && phoneNumber

    if (!allFieldFilled) {
      message.error("All fields must be filled")
      return
    }
    try {
      if (location.state.mode === "create") {
        await createCustomer({
          variables: {
            input: {
              name,
              email,
              phoneNumber,
            },
          },
        })
      }

      if (location.state.mode === "update") {
        await updateCustomer({
          variables: {
            id: location.state.data?.id,
            input: {
              name,
              email,
              phoneNumber,
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
    email: "",
    phoneNumber: "",
    prefix: "62",
  }

  if (location.state && location.state.mode === "update" && location.state.data) {
    const { name, email, phoneNumber } = location.state.data
    initialValues = {
      name,
      email,
      phoneNumber,
      prefix: "62",
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
        name="register"
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: "Please input your name!", whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: "Please input your phone number!" }]}
        >
          <Input
            addonBefore={
              <Form.Item name="prefix" noStyle>
                +62
              </Form.Item>
            }
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default AddOrUpdateCustomer
