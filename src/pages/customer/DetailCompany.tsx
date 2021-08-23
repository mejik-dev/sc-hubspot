import "styles/detailCustomer.css"

import Icon from "@ant-design/icons"
import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons"
import { Dropdown, Menu, Modal, PageHeader, Tabs, Typography } from "antd"
import { Phone } from "assets/icons/actions/index"
import Activity from "components/Activity"
import BasicList from "components/detail-contact/BasicList"
import SelectList from "components/detail-contact/SelectList"
import { useActivityQuery } from "hooks/activity"
import { useCompanyMutation } from "hooks/company"
import React from "react"
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom"

const { Text } = Typography
const { TabPane } = Tabs
const { confirm } = Modal

const DetailCompany: React.FC = () => {
  const history = useHistory()
  const { companyId } = useParams<{ companyId: string }>()
  const { state } = useLocation<{ company: Company }>()
  const { deleteCompany } = useCompanyMutation()

  const { data, refetch, loading } = useActivityQuery({
    variables: {
      filter: {
        companyId,
      },
    },
  })

  React.useEffect(() => {
    refetch({
      filter: {
        companyId,
      },
    })
  }, [companyId, refetch])

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
          history.goBack()
        })
      },
    })
  }

  if (!state?.company) {
    return <Redirect to="/dashboard/contact" />
  }

  const { company } = state

  const TitleModal = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
      <div
        style={{
          marginLeft: 5,
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Text className="header-subtitle">Company</Text>

        <Text className="header-title">{company.name}</Text>
        <Text className="header-title">{company.address}</Text>
      </div>
    </div>
  )

  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleDeleteCompany(companyId)} key="0">
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
          <a href={`tel:${company.phoneNumber}`}>
            <Icon component={Phone} onClick={() => console.log("click")} />
          </a>
          <Text>Call</Text>
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
            <p style={{ marginBottom: 10 }}>About {company.name}</p>
          </div>
          <BasicList label="Email" value={`${company.name}@gmail.com`} classNameValue="text-style" />
          <BasicList value={company.phoneNumber} label="Phone" classNameValue="text-style" />
          <SelectList label="Contact Owner" value={company.name} classNameValue="select-style" />
          <SelectList label="Last contacted" classNameValue="select-style" />
          <SelectList label="Lifecycle stage" value="Subscriber" classNameValue="select-style" />
          <SelectList label="Lead status" value="New" classNameValue="select-style" />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DetailCompany
