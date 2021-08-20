import "styles/detailCustomer.css"

import Icon from "@ant-design/icons"
import { MoreOutlined } from "@ant-design/icons"
import { PageHeader, Tabs, Typography } from "antd"
import { Chat, Msg, Phone } from "assets/icons/actions/index"
import Activity from "components/Activity"
import BasicList from "components/detail-contact/BasicList"
import SelectList from "components/detail-contact/SelectList"
import { useActivityQuery } from "hooks/activity"
import React from "react"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"

const { Text } = Typography
const { TabPane } = Tabs

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

  return (
    <div style={{ height: "100%", background: "#f1faf9" }}>
      <PageHeader
        title={TitleModal}
        onBack={() => history.goBack()}
        extra={[
          <div key="save" className="btn-more">
            <MoreOutlined />
          </div>,
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
                    style={{ width: "100%", marginBottom: 10 }}
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
