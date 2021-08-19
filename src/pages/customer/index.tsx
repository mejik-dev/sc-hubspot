import "styles/customer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Input, Layout, List, Modal, Select, Tabs } from "antd"
import { AddContact } from "assets/icons"
import ModalCustomer from "components/ModalCustomer"
import { useCreateCustomer, useCustomer, useDeleteCustomer, useUpdateCustomer } from "hooks/useCustomer"
import * as React from "react"

const { Content } = Layout
const { Search } = Input
const { TabPane } = Tabs
const { Option } = Select
const { confirm } = Modal

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
]

interface Grouping {
  key: string
  contacts: Customer[]
}

interface DataCustomer {
  id: string
  name: string
  phoneNumber: string
  email: string
  type?: string
}

const Customer: React.FC = () => {
  const { data: dataCustomers, refetch: getCustomerRefect } = useCustomer()

  const [grouping, setGrouping] = React.useState<Grouping[]>()
  const [updateCustomer] = useUpdateCustomer()
  const [createCustomer] = useCreateCustomer()
  const [deleteCustomer] = useDeleteCustomer()

  const [openModalFormCS, setOpenModalFormCS] = React.useState(false)
  const [dataCustomer, setDataCustomer] = React.useState<DataCustomer>({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    type: "",
  })

  React.useEffect(() => {
    const output = dataCustomers?.customers.reduce<any>((groups, contact) => {
      const letter = contact.name.charAt(0)

      groups[letter] = groups[letter] || []
      groups[letter].push(contact)

      return groups
    }, {})
    if (output) {
      setGrouping(Object.keys(output).map((key) => ({ key, contacts: output[key] })))
    }
  }, [dataCustomers])

  function callback(key: string) {
    console.log(key)
  }

  function handleChange(value: string) {
    console.log(`selected ${value}`)
  }

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
      getCustomerRefect()
    })
  }

  const handleCreateCustomer = (value: ValueFormCustomer) => {
    createCustomer({
      variables: {
        input: value,
      },
    }).then(() => {
      getCustomerRefect()
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
          getCustomerRefect()
        })
      },
      onCancel() {
        getCustomerRefect()
      },
    })
  }

  return (
    <Layout className="layout-contact">
      <div className="btn-add">
        <Icon component={AddContact} onClick={() => handleOpenModal("create")} />
      </div>
      <Search className="input-search" placeholder="Contacts" style={{ padding: "0px 20px" }} />
      <Content className="container-content-dashboard">
        <Tabs defaultActiveKey="1" onChange={callback} className="tab-list">
          <TabPane tab="Contacts" key="1">
            <div className="wrapper-select">
              <Select defaultValue="lucy" className="input-select" onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select defaultValue="lucy" className="input-select" onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            {Array.from(grouping || []).map((item) => {
              const contacts = item.contacts

              return (
                <List
                  key={item.key}
                  size="large"
                  header={<div>{item.key}</div>}
                  dataSource={contacts}
                  renderItem={(item) => <List.Item>{item.name}</List.Item>}
                />
              )
            })}
          </TabPane>
          <TabPane tab="Company" key="2">
            <List
              size="large"
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </TabPane>
        </Tabs>
      </Content>
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

export default Customer
