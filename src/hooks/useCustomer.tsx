import { QueryResult, useMutation, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const queryGetCustomers = {
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

const queryUpdateCustomer = {
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
}

const queryCreateCustomer = {
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
}

const queryDeleteCustomer = {
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

type CustomerQueryResult = QueryResult<
  {
    customers: Customer[]
  },
  Record<string, Customer>
>

const useCustomer = (): CustomerQueryResult => {
  return useQuery<{ customers: Customer[] }>(queryGetCustomers.getCustomer)
}

const useUpdateCustomer = () => {
  const [updateCustomer] = useMutation<{ customers: Customer }>(queryUpdateCustomer.updateCustomer)
  return [updateCustomer]
}

const useCreateCustomer = () => {
  const [createCustomer] = useMutation<{ customers: Customer }>(queryCreateCustomer.createCustomer)
  return [createCustomer]
}

const useDeleteCustomer = () => {
  const [deleteCustomer] = useMutation<{ customers: Customer }>(queryDeleteCustomer.deleteCustomer)
  return [deleteCustomer]
}

export { useCreateCustomer, useCustomer, useDeleteCustomer, useUpdateCustomer }
