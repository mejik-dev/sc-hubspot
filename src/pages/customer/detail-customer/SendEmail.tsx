import "styles/sendEmail.css"

import { Input, PageHeader } from "antd"
import CInputEmail from "components/send-email/CInputEmail"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { TextArea } = Input

interface FormValueSendEmail {
  to?: string
  cc?: string
  from?: string
  subject?: string
  body?: string
}

const SendEmail: React.FC = () => {
  const history = useHistory()

  const [values, setValues] = React.useState<FormValueSendEmail>()

  const onChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement
    setValues({ ...values, [target.name]: target.value })
  }

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
      <CInputEmail label="To" value={values?.to} classNameValue="select-style" name="to" onChange={onChange} />
      <CInputEmail label="Cc/Bcc" value={values?.cc} classNameValue="select-style" name="cc" onChange={onChange} />
      <CInputEmail label="From" value={values?.from} classNameValue="select-style" name="from" onChange={onChange} />

      {/* <SelectEmail label="From" value="radiegtya@gmail.com" classNameValue="select-style" /> */}
      <CInputEmail
        label="Subject"
        value={values?.subject}
        classNameValue="select-style"
        name="subject"
        onChange={onChange}
      />

      <TextArea
        rows={4}
        placeholder="Type something brilliant..."
        name="body"
        onChange={onChange}
        // onChange={(e) => setValues({ ...values, body: e.target.value })}
      />
    </div>
  )
}

export default SendEmail
