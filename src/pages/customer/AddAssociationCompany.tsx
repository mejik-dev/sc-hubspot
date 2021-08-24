import { Checkbox, Col, Input, Layout, PageHeader, Row } from "antd"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import { useCompanyMutation } from "hooks/company"
import { useCustomerQuery } from "hooks/customer"
import * as React from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"

const { Content } = Layout
const { Search } = Input

interface CustomerProps {
  user?: User
}

const defaultUser = {
  id: "",
  email: "Anonymouse@gmail.com",
  firstName: "anonymouse",
}

const AddAssociationCompany = ({ user = defaultUser }: CustomerProps): JSX.Element => {
  const [selected, setSelected] = React.useState<CheckboxValueType[]>()
  const [searchText, setSearchText] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)

  const { companyId } = useParams<{ companyId: string }>()
  const history = useHistory()
  const { state } = useLocation<{ association: Customer[] }>()

  const { association } = state

  const { updateCompany } = useCompanyMutation()

  const { data: dataCustomers } = useCustomerQuery({
    variables: {
      sort: "name_ASC",
      filter: {
        createdById: user?.id,
      },
    },
  })

  React.useEffect(() => {
    if (association.length) {
      setSelected([...association.map((item) => item.id)])
    }
  }, [association])

  const handleAddAssociation = async () => {
    setLoading(true)
    await updateCompany({
      variables: {
        id: companyId,
        input: {
          customersIds: selected,
        },
      },
    })
      .then((response) => {
        setLoading(false)
        history.goBack()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setSelected(checkedValues)
  }

  return (
    <Layout className="layout-contact">
      <PageHeader
        title="Add Contact"
        onBack={() => history.goBack()}
        extra={[
          <div key="save" className="btn-save-modal" aria-hidden="true" onClick={() => handleAddAssociation()}>
            {loading ? "Loading" : "Save"}
          </div>,
        ]}
        style={{ background: "#fff", width: "100%" }}
      />
      <Search
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="input-search"
        placeholder="Contacts"
        style={{ padding: "0px 20px" }}
      />

      <Content className="container-content-dashboard">
        <div style={{ overflow: "auto", height: "100%", width: "100%" }}>
          <Checkbox.Group value={selected} defaultValue={selected} style={{ width: "100%" }} onChange={onChange}>
            {Array.from(dataCustomers?.customers || []).map((item) => {
              return (
                <Row
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 53,
                    borderBottom: "1px solid lightgray",
                    background: "#fff",
                    width: "100%",
                    padding: "7px 22px",
                  }}
                >
                  <Col span={24}>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                  </Col>
                </Row>
              )
            })}
          </Checkbox.Group>
        </div>
      </Content>
    </Layout>
  )
}

export default AddAssociationCompany
