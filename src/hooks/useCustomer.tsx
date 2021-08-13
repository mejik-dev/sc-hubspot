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
  const { data, loading, error } = useQuery<{ customers: Customers }>(query.getCustomer)
  return { data, loading, error }
}

export { useCustomer }
