import { FetchResult, MutationHookOptions, QueryResult, useMutation, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getCompany: gql`
    query getCompanies {
      companies {
        id
        name
        address
        phoneNumber
      }
    }
  `,
  createCompany: gql`
    mutation createCompany($input: CreateCompanyInput!) {
      createCompany(input: $input) {
        id
        name
        address
        phoneNumber
      }
    }
  `,
  updateCompany: gql`
    mutation updateCompany($id: String!, $input: UpdateCompanyInput!) {
      updateCompany(id: $id, input: $input) {
        id
        name
        address
        phoneNumber
      }
    }
  `,
  deleteCompany: gql`
    mutation deleteCompany($id: String!) {
      deleteCompany(id: $id) {
        id
        name
        address
        phoneNumber
      }
    }
  `,
}

type CompanyQuery = QueryResult<
  {
    companies: Company[]
  },
  Record<string, Company>
>

type CompanyMutation = {
  createCompany: (options: MutationHookOptions) => Promise<FetchResult<{ createCompany: Company }>>
  updateCompany: (options: MutationHookOptions) => Promise<FetchResult<{ updateCompany: Company }>>
  deleteCompany: (options: MutationHookOptions) => Promise<FetchResult<{ deleteCompany: Company }>>
}

const useCompanyQuery = (): CompanyQuery => {
  return useQuery<{ companies: Company[] }>(query.getCompany)
}

const useCompanyMutation = (): CompanyMutation => {
  const [createCompany] = useMutation<{ createCompany: Company }>(query.createCompany)
  const [updateCompany] = useMutation<{ updateCompany: Company }>(query.updateCompany)
  const [deleteCompany] = useMutation<{ deleteCompany: Company }>(query.deleteCompany)

  return {
    createCompany,
    deleteCompany,
    updateCompany,
  }
}

export { useCompanyMutation, useCompanyQuery }
