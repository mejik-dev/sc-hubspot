import { Card, Tag } from "antd"
import * as React from "react"

interface ActivityProps {
  title: string
  createdAt: string
  description?: string
  style?: React.CSSProperties
}

const Activity: React.FC<ActivityProps> = ({ title, description, createdAt, style = {} }: ActivityProps) => {
  return (
    <Card style={style}>
      <p className="title-card">{title}</p>
      <Tag className="tag-card">{createdAt}</Tag>
      <p className="subtitle-card">{description}</p>
    </Card>
  )
}

export default Activity
