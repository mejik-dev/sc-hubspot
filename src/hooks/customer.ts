import { FetchResult, MutationHookOptions, QueryResult, useMutation, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getCustomer: gql`
    query {
      customers(orderBy: name_ASC) {
        id
        name
        email
        phoneNumber
      }
    }
  `,
  createCustomer: gql`
    mutation CreateCustomer($input: CreateCustomerInput!) {
      createCustomer(input: $input) {
        id
        name
        email
        phoneNumber
      }
    }
  `,
  updateCustomer: gql`
    mutation UpdateCustomer($id: String!, $input: UpdateCustomerInput!) {
      updateCustomer(id: $id, input: $input) {
        id
        name
        email
        phoneNumber
      }
    }
  `,
  deleteCustomer: gql`
    mutation DeleteCustomer($id: String!) {
      deleteCustomer(id: $id) {
        id
        name
        email
        phoneNumber
      }
    }
  `,
}

type CustomerQuery = QueryResult<
  {
    customers: Customer[]
  },
  Record<string, Customer>
>

type CustomerMutation = {
  createCustomer: (options: MutationHookOptions) => Promise<FetchResult<{ createCustomer: Customer }>>
  updateCustomer: (options: MutationHookOptions) => Promise<FetchResult<{ updateCustomer: Customer }>>
  deleteCustomer: (options: MutationHookOptions) => Promise<FetchResult<{ deleteCustomer: Customer }>>
}

const useCustomerQuery = (): CustomerQuery => {
  return useQuery<{ customers: Customer[] }>(query.getCustomer)
}

const useCustomerMutation = (): CustomerMutation => {
  const [createCustomer] = useMutation<{ createCustomer: Customer }>(query.createCustomer)
  const [updateCustomer] = useMutation<{ updateCustomer: Customer }>(query.updateCustomer)
  const [deleteCustomer] = useMutation<{ deleteCustomer: Customer }>(query.deleteCustomer)

  return {
    createCustomer,
    deleteCustomer,
    updateCustomer,
  }
}

export { useCustomerMutation, useCustomerQuery }
