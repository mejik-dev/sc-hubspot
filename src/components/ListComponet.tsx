import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, List } from "antd"
import * as React from "react"

interface ListProps {
  key: string
  dataSource: Customer[]
  handleDeleteCustomer: (arg0: string) => void
  setOpenModalFormCS: (arg0: boolean) => void
  setDataCustomer: (dataCustomer: DataCustomer) => void
}

interface DataCustomer {
  id: string
  name: string
  phoneNumber: string
  email: string
  type?: string
  __typename?: string
}

const ListComponet: React.FC<ListProps> = ({
  key,
  dataSource,
  handleDeleteCustomer,
  setDataCustomer,
  setOpenModalFormCS,
}: ListProps) => {
  const handleEditCustomer = (value: DataCustomer) => {
    delete value.__typename
    setDataCustomer({ ...value })
    setOpenModalFormCS(true)
  }

  return (
    <>
      <List
        key={key}
        size="large"
        header={<div>{key}</div>}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => handleEditCustomer(item)}
                key="list-loadmore-edit"
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
              />,
              <Button
                type="primary"
                shape="circle"
                key="list-loadmore-more"
                onClick={() => handleDeleteCustomer(item.id)}
                danger
                icon={<DeleteOutlined />}
              />,
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </>
  )
}

export default ListComponet
