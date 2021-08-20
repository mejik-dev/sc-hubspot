import {
  FetchResult,
  MutationHookOptions,
  QueryHookOptions,
  QueryResult,
  useMutation,
  useQuery,
} from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getActivities: gql`
    query getActivities($filter: ActivityFilter) {
      activities(where: $filter) {
        id
        title
        desc
        createdAt
      }
    }
  `,
  sendEmail: gql`
    mutation sendEmail($input: SendEmailInput) {
      sendEmail(input: $input) {
        message
      }
    }
  `,
}

type ActivityMutation = {
  sendEmail: (options: MutationHookOptions) => Promise<FetchResult<{ message: string }>>
}

interface ActivityResult {
  activities: Activity[]
}

interface ActivityFilter extends Activity {
  customerId: string
  companyId: string
}

interface ActivityHookVariables {
  filter: Partial<ActivityFilter>
}

type ActivityQuery = QueryResult<ActivityResult, ActivityHookVariables>

const useActivityQuery = (options: QueryHookOptions<ActivityResult, ActivityHookVariables>): ActivityQuery => {
  return useQuery<ActivityResult, ActivityHookVariables>(query.getActivities, options)
}

const useActivityMutation = (): ActivityMutation => {
  const [sendEmail] = useMutation<{ message: string }>(query.sendEmail)

  return {
    sendEmail,
  }
}

export { useActivityMutation, useActivityQuery }
