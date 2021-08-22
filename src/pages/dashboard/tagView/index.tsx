import { SettingOutlined } from "@ant-design/icons"
import { Dropdown, Menu, Tabs } from "antd"
import * as React from "react"

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

interface TagViewProps {
  handleOpenModal: (arg0: string) => void
}

const TagsView: React.FC<TagViewProps> = ({ handleOpenModal }: TagViewProps) => {
  return (
    <div id="pageTabs" style={{ background: "#fff", padding: "6px 4px" }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        type="editable-card"
        hideAdd
        tabBarExtraContent={
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0" onClick={() => handleOpenModal("create")}>
                  Create
                </Menu.Item>
              </Menu>
            }
          >
            <span id="pageTabs-actions">
              <SettingOutlined className="tagsView-extra" />
            </span>
          </Dropdown>
        }
      >
        {tags.map((tag) => (
          <TabPane tab={tag.title} key={tag.id} />
        ))}
      </Tabs>
    </div>
  )
}

export default TagsView
