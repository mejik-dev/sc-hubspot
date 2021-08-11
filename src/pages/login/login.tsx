import "styles/login.css"

import { Button, Form, Input, Typography } from "antd"
import * as React from "react"

const { Link } = Typography

const Login: React.FC = () => {
  return (
    <div className="login-page">
      <Form className="login-page-form">
        <h2>HUBSPOT</h2>
        <Form.Item name="username" rules={[{ required: true, message: "Email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Password" }]}>
          <Input type="password" placeholder="Password" />
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
