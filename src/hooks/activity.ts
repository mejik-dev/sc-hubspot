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

// TODO: fix typing for variable ops
// interface ActivityFilter extends Activity {
//   customerId: string
//   companyId: string
// }

type ActivityQuery = QueryResult<
  {
    activities: Activity[]
  },
  Record<string, Activity>
>

const useActivityQuery = (options: QueryHookOptions): ActivityQuery => {
  return useQuery<{ activities: Activity[] }>(query.getActivities, options)
}

export { useActivityQuery }
