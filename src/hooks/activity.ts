import { QueryHookOptions, QueryResult, useQuery } from "@apollo/react-hooks"
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

export { useActivityQuery }
