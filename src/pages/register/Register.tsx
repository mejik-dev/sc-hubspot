import "styles/login.css"

import { Button, Form, Input, Typography } from "antd"
import { useRegister } from "hooks/auth"
import { setCookie } from "nookies"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Link } = Typography

const Register: React.FC = () => {
  const [register] = useRegister()
  const history = useHistory()

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    firstName: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((previous) => ({ ...previous, [e.target.name]: e.target.value }))
  }

  const handleRegister = (values: React.FormEvent) => {
    register({
      variables: {
        input: values,
      },
    })
      .then((response) => {
        const token: string = response.data?.register?.token as string
        console.log(response)
        setCookie(null, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })

        if (token) {
          history.push("/")
        }
      })
      .catch((err) => {
        if (JSON.stringify(err).includes("has been used")) {
          alert("email has been used")
        } else {
          alert(err)
        }
      })
  }

  return (
    <div className="login-page">
      <Form className="login-page-form" onFinish={handleRegister}>
        <h2>HUBSPOT</h2>
        <Form.Item name="firstName" rules={[{ required: true, message: "Full Name" }]}>
          <Input placeholder="Full Name" name="firstName" value={values.firstName} onChange={onChange} />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Email" }]}>
          <Input placeholder="Email" name="email" value={values.email} onChange={onChange} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Password" }]}>
          <Input type="password" placeholder="Password" name="password" value={values.password} onChange={onChange} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="login-page-form_button">
            Register
          </Button>
        </Form.Item>
        <Link href="/login">already have account</Link>
      </Form>
    </div>
  )
}

export default Register
