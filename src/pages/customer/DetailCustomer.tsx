import "styles/detailCustomer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons"
import { Dropdown, Menu, Modal, PageHeader, Tabs, Typography } from "antd"
import { Chat, Msg, Phone } from "assets/icons/actions/index"
import Activity from "components/Activity"
import BasicList from "components/detail-contact/BasicList"
import SelectList from "components/detail-contact/SelectList"
import { useActivityQuery } from "hooks/activity"
import { useCustomerMutation } from "hooks/customer"
import React from "react"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"

const { Text } = Typography
const { TabPane } = Tabs
const { confirm } = Modal

const DetailCustomer: React.FC = () => {
  const history = useHistory()
  const { customerId } = useParams<{ customerId: string }>()
  const { state } = useLocation<{ customer: Customer }>()

  const { data, refetch, loading } = useActivityQuery({
    variables: {
      filter: {
        customerId,
      },
    },
  })

  const { deleteCustomer } = useCustomerMutation()

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

  const { customer } = state

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
    <div style={{ height: "100%", background: "#f1faf9" }}>
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
          <Icon component={Phone} onClick={() => console.log("click")} />
          <Text>Call</Text>
        </div>
        <div className="icon-actions">
          <Icon
            component={Msg}
            onClick={() =>
              history.push({
                pathname: "/dashboard/customer/send-email",
                state: { customer: customer },
              })
            }
          />
          <Text>Email</Text>
        </div>
        <div className="icon-actions">
          <Icon component={Chat} onClick={() => console.log("click")} />
          <Text>Text</Text>
        </div>
      </div>
      <Tabs defaultActiveKey="1" className="tab-list">
        <TabPane tab="Activity" key="1">
          <div style={{ padding: 20, marginTop: 10 }}>
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
        <TabPane tab="About" key="2">
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
