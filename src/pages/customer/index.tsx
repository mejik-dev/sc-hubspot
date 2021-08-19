import "styles/customer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Input, Layout, Modal, Select, Tabs } from "antd"
import { AddContact } from "assets/icons"
import List from "components/List"
import ModalCustomer from "components/ModalCustomer"
import ModalDetailContact from "components/ModalDetailContact"
import { useCompanyQuery } from "hooks/company"
import { useCustomerMutation, useCustomerQuery } from "hooks/customer"
import * as React from "react"

const { Content } = Layout
const { Search } = Input
const { TabPane } = Tabs
const { Option } = Select
const { confirm } = Modal

interface IGroupedData<T> {
  key: string
  data: T
}

interface DataCustomer {
  id: string
  name: string
  phoneNumber: string
  email: string
  type?: string
}

interface BaseData {
  name: string
}

const Customer: React.FC = () => {
  const { data: dataCustomers, refetch } = useCustomerQuery()
  const { data: companies } = useCompanyQuery()

  const [groupedCustomer, setGroupedCustomer] = React.useState<IGroupedData<Customer[]>[]>()
  const [groupedCompanies, setGroupedCompanies] = React.useState<IGroupedData<Company[]>[]>()
  const { createCustomer, updateCustomer, deleteCustomer } = useCustomerMutation()

  const [openModalFormCS, setOpenModalFormCS] = React.useState(false)
  const [openModalDetailCS, setOpenModalDetailCS] = React.useState(false)
  const [dataCustomer, setDataCustomer] = React.useState<DataCustomer>({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    type: "",
  })

  function groupDataByFirstCharName<Type extends BaseData>(data: Type[]) {
    return data.reduce<{ [key: string]: Type[] }>((groups, item) => {
      const letter = item.name.charAt(0)

      groups[letter] = groups[letter] || []
      groups[letter].push(item)

      return groups
    }, {})
  }

  React.useEffect(() => {
    if (dataCustomers?.customers.length) {
      const groupedCustomer = groupDataByFirstCharName<Customer>(dataCustomers.customers)
      if (groupedCustomer) {
        const newData = Object.keys(groupedCustomer).map((key) => ({ key, data: groupedCustomer[key] }))
        setGroupedCustomer(newData)
      }
    }
  }, [dataCustomers])

  React.useEffect(() => {
    if (companies?.companies.length) {
      const groupedCompanies = groupDataByFirstCharName<Company>(companies.companies)
      if (groupedCompanies) {
        const newData = Object.keys(groupedCompanies).map((key) => ({ key, data: groupedCompanies[key] }))
        setGroupedCompanies(newData)
      }
    }
  }, [companies])

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            {Array.from(groupedCustomer || []).map((item) => {
              return (
                <List
                  key={item.key}
                  title={item.key}
                  list={item.data}
                  renderItem={(item) => item.name}
                  onDelete={() => console.log("delete")}
                  onEdit={() => setOpenModalFormCS(true)}
                />
              )
            })}
          </TabPane>
          <TabPane tab="Company" key="2">
            {Array.from(groupedCompanies || []).map((item) => {
              return (
                <List
                  key={item.key}
                  title={item.key}
                  list={item.data}
                  renderItem={(item) => item.name}
                  onDelete={() => console.log("delete")}
                  onEdit={() => console.log("edit")}
                />
              )
            })}
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
      {openModalDetailCS && (
        <ModalDetailContact
          setOpenModalFormCS={setOpenModalDetailCS}
          openModalFormCS={openModalDetailCS}
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
