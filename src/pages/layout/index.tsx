import "./index.css"

import { Layout, Menu } from "antd"
import { useCustomer } from "hooks/useCustomer"
import { parseCookies } from "nookies"
import * as React from "react"

// import MenuComponent from "./menu"
import HeaderComponent from "./header"
import TableCustomer from "./TableCustomer"
import TagsView from "./tagView"

const { Content, Sider } = Layout

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
  const cookies = parseCookies()
  const { data: dataCustomers, loading: loadingGet } = useCustomer()

  // const [customers, setCustomers] = React.useState([])

  const isLogged = Boolean(cookies.token)

  // React.useEffect(() => {
  //   if (dataCustomers?.customers) {
  //     dataCustomers?.customers.map((item) => {
  //       return {
  //         key: item.id,
  //         ...item,
  //       }
  //     })
  //   }
  // }, [dataCustomers])

  return (
    <Layout className="layout-page">
      <HeaderComponent isLogged={isLogged} />
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
          <TableCustomer customers={dataCustomers?.customers} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
