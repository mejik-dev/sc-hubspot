import { Card, Tag } from "antd"
import * as React from "react"

interface ActivityProps {
  title: string
  createdAt: string
  description?: string
}

const Activity: React.FC<ActivityProps> = ({ title, description, createdAt }: ActivityProps) => {
  return (
    <Card style={{ width: "100%" }}>
      <p className="title-card">{title}</p>
      <Tag className="tag-card">{createdAt}</Tag>
      <div>{description}</div>
    </Card>
  )
}

export default Activity
