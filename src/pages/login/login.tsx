import "styles/login.css"

import { Button, Form, Input, Typography } from "antd"
import { useLogin } from "hooks/auth"
import { setCookie } from "nookies"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Link } = Typography

const Login: React.FC = () => {
  const [login] = useLogin()
  const history = useHistory()

  const [value, setValue] = React.useState({
    email: "",
    password: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((previous) => ({ ...previous, [e.target.name]: e.target.value }))
  }

  const handleLogin = (values: React.FormEvent) => {
    login({
      variables: {
        input: values,
      },
    })
      .then((response) => {
        const token: string = response.data?.login?.token as string

        setCookie(null, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })

        if (token) {
          history.push("/")
        }
      })
      .catch(() => {
        alert("Invalid Login")
      })
  }

  return (
    <div className="login-page">
      <Form className="login-page-form" onFinish={handleLogin}>
        <h2>HUBSPOT</h2>
        <Form.Item name="email" rules={[{ required: true, message: "Email" }]}>
          <Input placeholder="Email" name="email" value={value.email} onChange={onChange} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Password" }]}>
          <Input type="password" placeholder="Password" name="password" value={value.password} onChange={onChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="login-page-form_button">
            Login
          </Button>
        </Form.Item>
        <Link href="/register">Register</Link>
      </Form>
    </div>
  )
}

export default Login
