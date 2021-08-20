import "styles/sendEmail.css"

import { Input, PageHeader, Typography } from "antd"
import SelectEmail from "components/send-email/SelectEmail"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Text } = Typography
const { TextArea } = Input

const SendEmail: React.FC = () => {
  const history = useHistory()

  return (
    <div>
      <PageHeader
        className="page-header-email"
        title="Tracked Email"
        onBack={() => history.goBack()}
        extra={[
          <div key="save" className="btn-save-modal" aria-hidden="true">
            Send
          </div>,
        ]}
      />
      <div className="list-data-email">
        <Text className="label-field">To</Text>
      </div>
      <div className="list-data-email">
        <Text className="label-field">Cc/Bcc</Text>
      </div>
      <SelectEmail label="From" value="radiegtya@gmail.com" classNameValue="select-style" />
      <div className="list-data-email">
        <Text className="label-field">Subject</Text>
      </div>
      <TextArea rows={4} placeholder="Type something brilliant..." />
    </div>
  )
}

export default SendEmail
