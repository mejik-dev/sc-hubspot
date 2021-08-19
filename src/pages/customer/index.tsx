import "styles/customer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Input, Layout, Modal, Select, Tabs } from "antd"
import { AddCompany, AddContact } from "assets/icons"
import List from "components/List"
import { useCompanyQuery } from "hooks/company"
import { useCustomerMutation, useCustomerQuery } from "hooks/customer"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Content } = Layout
const { Search } = Input
const { TabPane } = Tabs
const { Option } = Select
const { confirm } = Modal

interface IGroupedData<T> {
  key: string
  data: T
}
interface BaseData {
  name: string
}

const Customer: React.FC = () => {
  const history = useHistory()

  const { data: dataCustomers, refetch: refetchDataQustomers } = useCustomerQuery()

  const { data: companies } = useCompanyQuery()
  const { deleteCustomer } = useCustomerMutation()

  const [groupedCustomer, setGroupedCustomer] = React.useState<IGroupedData<Customer[]>[]>()
  const [groupedCompanies, setGroupedCompanies] = React.useState<IGroupedData<Company[]>[]>()
  const [typeTabs, setTypeTabs] = React.useState<number>(1)
  const [searchText, setSearchText] = React.useState<string>("")

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

  function changeTabs(key: string) {
    if (parseInt(key) === 1) {
      setTypeTabs(parseInt(key))
    } else {
      setTypeTabs(parseInt(key))
    }
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
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
          refetchDataQustomers()
        })
      },
      onCancel() {
        refetchDataQustomers()
      },
    })
  }

  React.useEffect(() => {
    if (history.action === "POP" && dataCustomers) {
      refetchDataQustomers()
    }
  }, [dataCustomers, history.action, refetchDataQustomers])

  return (
    <Layout className="layout-contact">
      <div className="btn-add">
        {typeTabs === 1 ? (
          <Icon
            component={AddContact}
            onClick={() =>
              history.push({
                pathname: "/dashboard/add-customer",
                state: {
                  mode: "create",
                },
              })
            }
          />
        ) : (
          <Icon
            component={AddCompany}
            onClick={() =>
              history.push({
                pathname: "/dashboard/add-company",
                state: {
                  mode: "create",
                },
              })
            }
          />
        )}
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
              return (
                <List
                  key={item.key}
                  title={item.key}
                  list={item.data}
                  renderItem={(item) => item.name}
                  onDelete={(item) => handleDeleteCustomer(item.id)}
                  onEdit={(item) =>
                    history.push({
                      pathname: "/dashboard/update-customer",
                      state: { mode: "update", data: item },
                    })
                  }
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
    </Layout>
  )
}

export default Customer
