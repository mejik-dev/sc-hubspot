import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Space, Table, Tooltip } from "antd"
import * as React from "react"

const { Column } = Table

interface TableProps {
  customers?: Customer[]
  setOpenModalFormCS: (arg0: boolean) => void
  setDataCustomer: (dataCustomer: DataCustomer) => void
  handleDeleteCustomer: (arg0: string) => void
}

interface DataCustomer {
  id: string
  name: string
  phoneNumber: string
  email: string
  type?: string
  __typename?: string
}

const TableCustomer: React.FC<TableProps> = ({
  customers,
  setOpenModalFormCS,
  setDataCustomer,
  handleDeleteCustomer,
}: TableProps) => {
  const handleEditCustomer = (value: DataCustomer) => {
    delete value.__typename
    setDataCustomer({ ...value })
    setOpenModalFormCS(true)
  }

  return (
    <Table dataSource={customers}>
      <Column title="name" dataIndex="name" key="name" />

      <Column title="phoneNumber" dataIndex="phoneNumber" key="phoneNumber" />
      <Column title="email" dataIndex="email" key="email" />

      <Column
        title="Action"
        key="action"
        render={(record) => (
          <Space size="middle">
            <Tooltip title="search">
              <Button
                onClick={(recorde) => handleEditCustomer(record)}
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title="search">
              <Button
                type="primary"
                shape="circle"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteCustomer(record.id)}
              />
            </Tooltip>
          </Space>
        )}
      />
    </Table>
  )
}

export default TableCustomer
