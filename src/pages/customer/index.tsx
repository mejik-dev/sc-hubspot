import "styles/customer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Input, Layout, Modal, Select, Tabs } from "antd"
import { AddCompany, AddContact } from "assets/icons"
import ListComponet from "components/ListComponet"
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

interface IGroupedCostumers {
  key: string
  contacts: Customer[]
}

interface IGroupedCompanies {
  key: string
  contacts: Company[]
}

interface DataCustomer {
  id: string
  name: string
  phoneNumber: string
  email: string
  type?: string
}

const Customer: React.FC = () => {
  const { data: dataCustomers, refetch } = useCustomerQuery()
  const { data: dataCompanies } = useCompanyQuery()

  const [groupedCustomer, setGroupedCustomer] = React.useState<IGroupedCostumers[]>()
  const [groupCompanies, setGroupCompanies] = React.useState<IGroupedCompanies[]>()
  const [typeTabs, setTypeTabs] = React.useState<number>(1)
  const [searchText, setSearchText] = React.useState<string>("")
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

  React.useEffect(() => {
    const groupedCostumer = dataCustomers?.customers.reduce<{ [key: string]: Customer[] }>((groups, contact) => {
      const letter = contact.name.charAt(0)
      groups[letter] = groups[letter] || []
      groups[letter].push(contact)
      return groups
    }, {})
    if (groupedCostumer) {
      setGroupedCustomer(Object.keys(groupedCostumer).map((key) => ({ key, contacts: groupedCostumer[key] })))
    }
  }, [dataCustomers])

  React.useEffect(() => {
    const groupCompanies = dataCompanies?.companies.reduce<{ [key: string]: Company[] }>((groups, contact) => {
      const letter = contact.name.charAt(0)

      groups[letter] = groups[letter] || []
      groups[letter].push(contact)

      return groups
    }, {})
    if (groupCompanies) {
      setGroupCompanies(Object.keys(groupCompanies).map((key) => ({ key, contacts: groupCompanies[key] })))
    }
  }, [dataCompanies])

  const changeTabs = (key: string) => {
    if (parseInt(key) === 1) {
      setTypeTabs(parseInt(key))
    } else {
      setTypeTabs(parseInt(key))
    }
  }

  const handleChange = (value: string) => {
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

  // const onSearch = () => {
  //   if (!searchText) {
  //     return groupedCustomer
  //   }

  //   return groupedCustomer?.map((item) => {
  //     return item.contacts.filter((customer) => {
  //       return customer.name.toLowerCase().includes(searchText.toLowerCase())
  //     })
  //   })
  // }

  return (
    <Layout className="layout-contact">
      <div className="btn-add">
        <Icon component={typeTabs === 1 ? AddContact : AddCompany} onClick={() => handleOpenModal("create")} />
      </div>
      <Search
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="input-search"
        placeholder="Contacts"
        style={{ padding: "0px 20px" }}
      />
      <Content className="container-content-dashboard">
        <Tabs defaultActiveKey="1" onChange={changeTabs} className="tab-list">
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
              const contacts = item.contacts

              return (
                <ListComponet
                  key={item.key}
                  label={item.key}
                  setOpenModalFormCS={setOpenModalFormCS}
                  setDataCustomer={setDataCustomer}
                  dataSource={contacts}
                  handleDeleteCustomer={handleDeleteCustomer}
                />
              )
            })}
          </TabPane>
          <TabPane tab="Company" key="2">
            {Array.from(groupCompanies || []).map((item) => {
              const contacts = item.contacts

              return (
                <ListComponet
                  label={item.key}
                  setOpenModalFormCS={setOpenModalFormCS}
                  setDataCustomer={setDataCustomer}
                  key={item.key}
                  dataSource={contacts}
                  handleDeleteCustomer={handleDeleteCustomer}
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
