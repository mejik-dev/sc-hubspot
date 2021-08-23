import { CaretDownOutlined } from "@ant-design/icons"
import { Dropdown, Menu } from "antd"
import * as React from "react"

interface IBasicListProps {
  label: string
  value?: string
  classNameValue: string
}

const SelectList: React.FC<IBasicListProps> = ({ label, value, classNameValue }: IBasicListProps) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">{value}</Menu.Item>
    </Menu>
  )

  return (
    <div className="list-data-contact">
      <p
        style={{
          marginBottom: 5,
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: value ? 12 : 14,
        }}
      >
        {label}
      </p>
      {value && (
        <Dropdown overlay={menu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className={classNameValue} style={{ marginBottom: 5 }}>
              {value}
            </p>
            <CaretDownOutlined style={{ color: "#55988d" }} />
          </div>
        </Dropdown>
      )}
    </div>
  )
}

export default SelectList
