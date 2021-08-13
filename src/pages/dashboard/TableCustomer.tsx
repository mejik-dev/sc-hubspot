import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Space, Table, Tooltip } from "antd"
import * as React from "react"

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Action",
    key: "action",
    render: function ActionColumn(e: string) {
      return (
        <Space size="middle">
          <Tooltip title="search">
            <Button onClick={() => console.log(e)} type="primary" shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="search">
            <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      )
    },
  },
]

interface TableProps {
  customers?: Customer[]
}

const TableCustomer: React.FC<TableProps> = ({ customers }: TableProps) => {
  console.log(customers)

  return <Table columns={columns} dataSource={customers} />
}

export default TableCustomer
