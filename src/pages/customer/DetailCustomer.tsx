import Icon from "@ant-design/icons"
import { Tabs, Typography } from "antd"
import { Chat, Msg, Phone } from "assets/icons/actions/index"
import Activity from "components/Activity"
import { useActivityQuery } from "hooks/activity"
import React from "react"
import { useParams } from "react-router-dom"

const { Text } = Typography
const { TabPane } = Tabs

const DetailCustomer: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>()

  const { data, refetch, loading } = useActivityQuery({
    variables: {
      input: {
        customerId,
      },
    },
  })

  return (
    <>
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
          {loading
            ? "Loading ..."
            : data?.activities.map((activity) => (
                <Activity
                  key={activity.id}
                  title={activity.title}
                  description={activity.desc}
                  createdAt={activity.createdAt}
                />
              ))}
        </TabPane>
        <TabPane tab="About" key="2"></TabPane>
      </Tabs>
    </>
  )
}

export default DetailCustomer
