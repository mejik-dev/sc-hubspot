import "styles/customer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Input, Layout, Modal, Select, Tabs } from "antd"
import { AddCompany, AddContact } from "assets/icons"
import List from "components/List"
import { useCompanyMutation, useCompanyQuery } from "hooks/company"
import { useCustomerMutation, useCustomerQuery } from "hooks/customer"
import * as React from "react"
import { useHistory, useParams } from "react-router-dom"

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
  const { currentTab } = useParams<{ currentTab: string }>()

  const { data: dataCustomers, refetch: refetchDataQustomers } = useCustomerQuery()
  const { deleteCustomer } = useCustomerMutation()

  const { data: companies, refetch: refetchDataCompanies } = useCompanyQuery()
  const { deleteCompany } = useCompanyMutation()

  const [groupedCustomer, setGroupedCustomer] = React.useState<IGroupedData<Customer[]>[]>()
  const [groupedCompanies, setGroupedCompanies] = React.useState<IGroupedData<Company[]>[]>()
  const [activeTab, setActiveTab] = React.useState<number>(currentTab === "companies" ? 2 : 1)
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

  React.useEffect(() => {
    if (history.action === "POP") {
      if (currentTab === "companies") {
        refetchDataCompanies()
      } else {
        refetchDataQustomers()
      }
    }
  }, [dataCustomers, companies, history.action, refetchDataQustomers, refetchDataCompanies, currentTab])

  React.useEffect(() => {
    if (currentTab === "companies") {
      setActiveTab(2)
    } else {
      setActiveTab(1)
    }
  }, [currentTab])

  function changeTabs(key: string) {
    if (parseInt(key) === 1) {
      history.replace("/dashboard/contacts")
    } else {
      history.replace("/dashboard/companies")
    }
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
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
          refetchDataQustomers()
        })
      },
    })
  }

  const handleDeleteCompany = (id: string) => {
    confirm({
      title: "Do you Want to delete these record?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      onOk() {
        deleteCompany({
          variables: {
            id,
          },
        }).then(() => {
          refetchDataCompanies()
        })
      },
    })
  }

  return (
    <Layout className="layout-contact">
      <Search
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="input-search"
        placeholder="Contacts"
        style={{ padding: "0px 20px" }}
      />
      <div className="btn-add">
        {activeTab === 1 ? (
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
      <Content className="container-content-dashboard">
        <Tabs activeKey={String(activeTab)} onChange={changeTabs} className="tab-list">
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
            <div style={{ overflow: "auto", height: "calc(100vh - 18%)" }}>
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
                    onClickItem={(item) => {
                      history.push({
                        pathname: "/dashboard/customer/" + item.id,
                        state: { customer: item },
                      })
                    }}
                  />
                )
              })}
            </div>
          </TabPane>
          <TabPane tab="Company" key="2">
            <div style={{ overflow: "auto", height: "calc(100vh - 18%)" }}>
              {Array.from(groupedCompanies || []).map((item) => {
                return (
                  <List
                    key={item.key}
                    title={item.key}
                    list={item.data}
                    renderItem={(item) => item.name}
                    onDelete={(item) => handleDeleteCompany(item.id)}
                    onEdit={(item) =>
                      history.push({
                        pathname: "/dashboard/update-company",
                        state: { mode: "update", data: item },
                      })
                    }
                    onClickItem={(item) => {
                      history.push({
                        pathname: "/dashboard/company/" + item.id,
                        state: { company: item },
                      })
                    }}
                  />
                )
              })}
            </div>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  )
}

export default Customer
