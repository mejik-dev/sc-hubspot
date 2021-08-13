import { useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getCustomer: gql`
    query {
      customers {
        id
        name
        email
        phoneNumber
      }
    }
  `,
}

const useCustomer = () => {
  return useQuery<{ customers: Customer[] }>(query.getCustomer)
}

export { useCustomer }
