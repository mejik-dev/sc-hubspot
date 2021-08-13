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
    // eslint-disable-next-line react/display-name
    render: (e: string) => (
      <Space size="middle">
        <Tooltip title="search">
          <Button onClick={() => console.log(e)} type="primary" shape="circle" icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title="search">
          <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
]

const data = [
  {
    key: "1",
    name: "John Brown",
    email: "aldi@gmail.com",
    phoneNumber: +628998300060,
  },
  {
    key: "2",
    name: "Jim Green",
    email: "aldi@gmail.com",
    phoneNumber: +628998300060,
  },
  {
    key: "3",
    name: "Joe Black",
    email: "aldi@gmail.com",
    phoneNumber: +628998300060,
  },
]

interface TableProps {
  customers?: Customers
}

const TableCustomer: React.FC<TableProps> = ({ customers }: TableProps) => {
  console.log(customers)

  return <Table columns={columns} dataSource={data} />
}

export default TableCustomer
