// import { FC, useEffect, Suspense, useCallback, useState } from "react"
import "./index.css"

import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons"
import { Breadcrumb, Layout, Menu } from "antd"
import * as React from "react"

// import MenuComponent from "./menu"
import HeaderComponent from "./header"
import TagsView from "./tagView"

const { SubMenu } = Menu
const { Content, Sider } = Layout

const WIDTH = 992

const menuList: { title: string; id: number }[] = [
  {
    id: 0,
    title: "Dashboard",
  },
  {
    id: 0,
    title: "Customer",
  },
  {
    id: 0,
    title: "Company",
  },
  {
    id: 0,
    title: "Account",
  },
]

const LayoutPage: React.FC = () => {
  return (
    <Layout className="layout-page">
      <HeaderComponent />
      <Layout>
        <Sider width={200} className="layout-page-sider" breakpoint="md">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {menuList.map((item, index) => (
              <Menu.Item key={`${index}-${item.title}`}>{item.title}</Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Content className="layout-page-content">
          <TagsView />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
