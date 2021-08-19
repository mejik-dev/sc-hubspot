import "styles/detailCustomer.css"

import { MoreOutlined } from "@ant-design/icons"
import Icon from "@ant-design/icons"
import { Card, PageHeader, Tabs, Tag, Typography } from "antd"
import { Chat, Msg, Phone } from "assets/icons/actions/index"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Text } = Typography
const { TabPane } = Tabs

const DetailCustomer: React.FC = () => {
  const history = useHistory()

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

        <Text className="header-title">Joko</Text>
      </div>
    </div>
  )

  return (
    <div>
      <PageHeader
        title={TitleModal}
        onBack={() => history.goBack()}
        extra={[
          <div key="save" className="btn-more">
            <MoreOutlined />
          </div>,
        ]}
      />
      <div className="modal-action">
        <div className="icon-actions">
          <Icon component={Phone} onClick={() => console.log("click")} />
          <Text>Call</Text>
        </div>
        <div className="icon-actions">
          <Icon component={Msg} onClick={() => console.log("click")} />
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
            <Card style={{ width: "100%" }}>
              <p className="title-card">Contact created</p>
              <Tag className="tag-card">data time</Tag>
            </Card>
            <Card style={{ width: "100%", marginTop: 10 }}>
              <p className="title-card">Lifecycle change</p>
              <Tag className="tag-card">data time</Tag>
              <p className="subtitle-card">The lifecycle stage was changed to Subscriber</p>
            </Card>
          </div>
        </TabPane>
        <TabPane tab="About" key="2"></TabPane>
      </Tabs>
    </div>
  )
}

export default DetailCustomer
