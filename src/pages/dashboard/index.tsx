import "./index.css"

import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Layout, Menu, Modal } from "antd"
import ModalCustomer from "components/ModalCustomer"
import { useCustomerMutation, useCustomerQuery } from "hooks/customer"
import { parseCookies } from "nookies"
import * as React from "react"

// import MenuComponent from "./menu"
import HeaderComponent from "./header"
import TableCustomer from "./TableCustomer"
import TagsView from "./tagView"

const { Content, Sider } = Layout
const { confirm } = Modal

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

interface DataCustomer {
  id: string
  name: string
  phoneNumber: string
  email: string
  type?: string
}

const LayoutPage: React.FC = () => {
  const cookies = parseCookies()
  const { data: dataCustomers, refetch } = useCustomerQuery()
  const { createCustomer, updateCustomer, deleteCustomer } = useCustomerMutation()

  const [openModalFormCS, setOpenModalFormCS] = React.useState(false)
  const [dataCustomer, setDataCustomer] = React.useState<DataCustomer>({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    type: "",
  })

  const handleOpenModal = (type: string) => {
    setOpenModalFormCS(true)
    setDataCustomer((prev) => ({ ...prev, type }))
  }

  const handleUpdateCustomer = (value: ValueFormCustomer) => {
    updateCustomer({
      variables: {
        id: dataCustomer.id,
        input: value,
      },
    }).then(() => {
      refetch()
    })
  }

  const handleCreateCustomer = (value: ValueFormCustomer) => {
    createCustomer({
      variables: {
        input: value,
      },
    }).then(() => {
      refetch()
    })
  }

  const handleDeleteCustomer = (id: string) => {
    confirm({
      title: "Do you Want to delete these record?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      onOk() {
        deleteCustomer({
          variables: {
            id,
          },
        }).then(() => {
          refetch()
        })
      },
      onCancel() {
        refetch()
      },
    })
  }

  const isLogged = Boolean(cookies.token)

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
          <TagsView handleOpenModal={handleOpenModal} />
          <TableCustomer
            customers={dataCustomers?.customers}
            setOpenModalFormCS={setOpenModalFormCS}
            setDataCustomer={setDataCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
          />
        </Content>
      </Layout>
      {openModalFormCS && (
        <ModalCustomer
          setOpenModalFormCS={setOpenModalFormCS}
          openModalFormCS={openModalFormCS}
          dataCustomer={dataCustomer}
          setDataCustomer={setDataCustomer}
          handleUpdateCustomer={handleUpdateCustomer}
          handleCreateCustomer={handleCreateCustomer}
        />
      )}
    </Layout>
  )
}

export default LayoutPage
