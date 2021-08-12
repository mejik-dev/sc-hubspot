import { Tabs } from "antd"
import * as React from "react"

import TagsViewAction from "./tagViewAction"

const { TabPane } = Tabs

const tags: { title: string; id: number }[] = [
  {
    id: 0,
    title: "Dashboard",
  },
  {
    id: 0,
    title: "Customer",
  },
  {
    id: 0,
    title: "Company",
  },
  {
    id: 0,
    title: "Account",
  },
]

const TagsView: React.FC = () => {
  return (
    <div id="pageTabs" style={{ background: "#fff", padding: "6px 4px" }}>
      <Tabs tabBarStyle={{ margin: 0 }} type="editable-card" hideAdd tabBarExtraContent={<TagsViewAction />}>
        {tags.map((tag) => (
          <TabPane tab={tag.title} key={tag.id} />
        ))}
      </Tabs>
    </div>
  )
}

export default TagsView
