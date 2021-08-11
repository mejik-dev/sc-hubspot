import "./styles/login.css"

import { Button, Form, Input } from "antd"
import * as React from "react"

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
      </Form>
    </div>
  )
}

export default Login
