import { SettingOutlined } from "@ant-design/icons"
import { Dropdown, Menu } from "antd"
import * as React from "react"

const TagsViewAction: React.FC = () => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0">tag </Menu.Item>
          <Menu.Item key="1">tag </Menu.Item>
          <Menu.Item key="2">tag </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">tag </Menu.Item>
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  )
}

export default TagsViewAction
