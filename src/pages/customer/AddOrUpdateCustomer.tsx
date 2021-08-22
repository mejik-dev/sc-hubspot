import { Form, message } from "antd"
import { PageHeader } from "antd"
import CustomInputFloating from "components/CustomInputFloating"
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

interface IStateForm {
  name: string
  email: string
  phoneNumber: string
}

const AddOrUpdateCustomer: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [values, setValues] = React.useState<IStateForm>({
    name: "",
    email: "",
    phoneNumber: "",
  })

  const history = useHistory()
  const location = useLocation<{ mode: string; data: Customer | undefined }>()

  const [form] = Form.useForm()

  const { createCustomer, updateCustomer } = useCustomerMutation()

  const onFinish = async (values: ValueFormCustomer) => {
    if (loading) {
      return
    }

    setLoading(true)

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

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    prefix: "62",
  }

  React.useEffect(() => {
    if (location.state && location.state.mode === "update" && location.state.data) {
      const { name, email, phoneNumber } = location.state.data
      setValues({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      })
    }
  }, [location.state])

  const onChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement
    setValues({ ...values, [target.name]: target.value })
  }

  return (
    <>
      <PageHeader
        title=""
        onBack={() => history.goBack()}
        extra={[
          <div key="save" className="btn-save-modal" aria-hidden="true" onClick={() => onFinish(values)}>
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
        <CustomInputFloating
          label="Name"
          classNameValue="select-style"
          name="name"
          placeholder="Name"
          value={values?.name}
          onChange={onChange}
          containerStyle={{ flexDirection: "column", alignItems: "start", justifyContent: "center" }}
        />
        <CustomInputFloating
          label="Email"
          classNameValue="select-style"
          name="email"
          value={values?.email}
          placeholder="Email"
          onChange={onChange}
          containerStyle={{ flexDirection: "column", alignItems: "start", justifyContent: "center" }}
        />
        <CustomInputFloating
          label="Phone"
          classNameValue="select-style"
          name="phoneNumber"
          value={values?.phoneNumber}
          placeholder="Phone"
          onChange={onChange}
          containerStyle={{ flexDirection: "column", alignItems: "start", justifyContent: "center" }}
        />
      </Form>
    </>
  )
}

export default AddOrUpdateCustomer
