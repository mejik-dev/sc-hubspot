import "styles/detailCustomer.css"

import Icon from "@ant-design/icons"
import { CloseOutlined, ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons"
import { Button, Dropdown, List, Menu, Modal, PageHeader, Tabs, Typography } from "antd"
import { Chat, Msg, Phone } from "assets/icons/actions/index"
import Activity from "components/Activity"
import CInputAdd from "components/CustomInputAdd"
import BasicList from "components/detail-contact/BasicList"
import SelectList from "components/detail-contact/SelectList"
import { useActivityQuery } from "hooks/activity"
import { useCompanyQuery } from "hooks/company"
import { useCustomerMutation, useCustomerQuery } from "hooks/customer"
import React from "react"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"

const { Text } = Typography
const { TabPane } = Tabs
const { confirm } = Modal

interface CustomerProps {
  user?: User
}

const defaultUser = {
  id: "",
  email: "Anonymouse@gmail.com",
  firstName: "anonymouse",
}

const DetailCustomer = ({ user = defaultUser }: CustomerProps): JSX.Element => {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>()

  const history = useHistory()
  const { customerId } = useParams<{ customerId: string }>()
  const { state } = useLocation<{ customer: Customer }>()
  const { customer } = state

  const { data: dataCustomers, refetch: refetchDataQustomers } = useCustomerQuery({
    variables: {
      filter: {
        id: customerId,
      },
    },
  })

  const { data: dataCompany } = useCompanyQuery({
    variables: {
      sort: "name_ASC",
      filter: {
        createdById: user.id,
      },
    },
  })

  const { data, refetch, loading } = useActivityQuery({
    variables: {
      filter: {
        customerId,
      },
    },
  })

  const { deleteCustomer, updateCustomer } = useCustomerMutation()

  React.useEffect(() => {
    refetch({
      filter: {
        customerId,
      },
    })
  }, [customerId, refetch])

  if (!state?.customer) {
    return <Redirect to="/dashboard/contact" />
  }

  const handleAddAssociation = async () => {
    const newCustomer = Array.from(dataCustomers?.customers[0].companies || [])

    await updateCustomer({
      variables: {
        id: customerId,
        input: {
          companiesIds: [
            ...newCustomer.map((item) => {
              return item.id
            }),
            selectedCustomer,
          ],
        },
      },
    })
      .then((response) => {
        refetchDataQustomers()
        refetch()
        setSelectedCustomer("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDeleteAssociation = async (id: string) => {
    const newCustomer = Array.from(dataCustomers?.customers[0].companies || [])

    confirm({
      title: "Do you want to remove these association?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      async onOk() {
        await updateCustomer({
          variables: {
            id: customerId,
            input: {
              companiesIds: [...newCustomer.filter((item) => item.id !== id).map((item) => item.id)],
            },
          },
        })
          .then((response) => {
            refetchDataQustomers()
            refetch()
            setSelectedCustomer("")
          })
          .catch((err) => {
            console.log(err)
          })
      },
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
          history.goBack()
        })
      },
    })
  }

  const TitleModal = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
      <div
        style={{
          marginLeft: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Text className="header-subtitle">Contact</Text>

        <Text className="header-title">{customer.name}</Text>
      </div>
    </div>
  )

  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleDeleteCustomer(customerId)} key="0">
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <div style={{ height: "100%", maxHeight: "100vh", background: "#f1faf9", overflow: "hidden" }}>
      <PageHeader
        title={TitleModal}
        onBack={() => history.goBack()}
        extra={[
          <Dropdown key="more" overlay={menu} trigger={["click"]} placement="bottomCenter">
            <div key="save" className="btn-more">
              <MoreOutlined />
            </div>
          </Dropdown>,
        ]}
        style={{ background: "#fff" }}
      />

      <div className="detail-action">
        <div className="icon-actions">
          <a href={`tel:${customer.phoneNumber}`}>
            <Icon component={Phone} onClick={() => console.log("click")} />
          </a>
          <Text>Call</Text>
        </div>
        <div className="icon-actions">
          <a href="/dashboard/customer/send-email" onClick={(e) => e.preventDefault()}>
            <Icon
              component={Msg}
              onClick={() =>
                history.push({
                  pathname: "/dashboard/customer/send-email",
                  state: { customer: customer },
                })
              }
            />
          </a>

          <Text>Email</Text>
        </div>
        <div className="icon-actions">
          <a href={`sms:${customer.phoneNumber}`}>
            <Icon component={Chat} onClick={() => console.log("click")} />
          </a>
          <Text>Text</Text>
        </div>
      </div>
      <Tabs defaultActiveKey="1" className="tab-list">
        <TabPane tab="Activity" key="1">
          <div style={{ padding: 20, marginTop: 10, overflowY: "auto", height: "calc(100vh - 20%)" }}>
            <p style={{ marginBottom: 10 }}>Date</p>

            {loading
              ? "Loading ..."
              : data?.activities.map((activity) => (
                  <Activity
                    key={activity.id}
                    title={activity.title}
                    description={activity.desc}
                    createdAt={activity.createdAt}
                    style={{
                      width: "100%",
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      flexDirection: "column",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                ))}
          </div>
        </TabPane>
        <TabPane tab="Association" key="2">
          <div style={{ overflowY: "auto", height: "calc(100vh - 20%)" }}>
            <div style={{ padding: "3px 20px" }}>
              <Typography>Customers</Typography>
            </div>
            <List
              bordered
              size="large"
              dataSource={dataCustomers?.customers[0]?.companies || []}
              renderItem={(item) => (
                <List.Item
                  style={{ background: "#FFF" }}
                  actions={[
                    <Button
                      onClick={() => handleDeleteAssociation(item.id)}
                      style={{ border: "none" }}
                      key="list-loadmore-edit"
                      shape="circle"
                      icon={<CloseOutlined />}
                    />,
                  ]}
                >
                  <Typography>{item.name}</Typography>
                </List.Item>
              )}
            />
            <CInputAdd
              option={dataCompany?.companies}
              placeholder="Add contact"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e)}
              onAdd={handleAddAssociation}
            />
          </div>
        </TabPane>
        <TabPane tab="About" key="3">
          <div style={{ padding: 20, marginTop: 10 }}>
            <p style={{ marginBottom: 10 }}>About {customer.name}</p>
          </div>
          <BasicList label="Email" value={customer.email} classNameValue="text-style" />
          <BasicList label={customer.phoneNumber} classNameValue="text-style" />
          <SelectList label="Contact Owner" value={customer.name} classNameValue="select-style" />
          <SelectList label="Last contacted" classNameValue="select-style" />
          <SelectList label="Lifecycle stage" value="Subscriber" classNameValue="select-style" />
          <SelectList label="Lead status" value="New" classNameValue="select-style" />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DetailCustomer
