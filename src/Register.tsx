import "./styles/login.css"

import { Button, Form, Input, Typography } from "antd"
import * as React from "react"

const { Link } = Typography

const Register: React.FC = () => {
  return (
    <div className="login-page">
      <Form className="login-page-form">
        <h2>HUBSPOT</h2>
        <Form.Item name="firstName" rules={[{ required: true, message: "Full Name" }]}>
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Password" }]}>
          <Input type="password" placeholder="Password" />
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
