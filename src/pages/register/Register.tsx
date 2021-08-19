import "styles/signup.css"

import Icon from "@ant-design/icons"
import { Button, Col, Form, Input, Layout, Row, Typography } from "antd"
import { Logo } from "assets/icons"
import { useRegister } from "hooks/auth"
import { setCookie } from "nookies"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Link, Text } = Typography
const { Header, Footer, Content } = Layout

const Register: React.FC = () => {
  const register = useRegister()
  const history = useHistory()

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const disabled = !values.email || !values.firstName || !values.password || !values.lastName

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

  console.log(values)

  return (
    <Layout className="layout-signup">
      <Header className="header-signup">
        <Icon component={Logo} />
      </Header>
      <Content className="container-content-signup">
        <h1>Create your free account</h1>

        <Form className="signup-page-form" onFinish={handleRegister}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="firstName" rules={[{ required: true, message: "First name" }]}>
                <Input
                  className="input-form-signup"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" rules={[{ required: true, message: "Last name" }]}>
                <Input
                  className="input-form-signup"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="email" rules={[{ required: true, message: "Email" }]}>
            <Input
              className="input-form-signup"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Password" }]}>
            <Input
              className="input-form-signup"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Button disabled={disabled} htmlType="submit" type="primary" className="button-primary-register">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer className="footer-signup">
        <Text>Have an account?</Text>
        <Link href="/login" className="button-signin">
          Sign in
        </Link>
      </Footer>
    </Layout>
  )
}

export default Register
