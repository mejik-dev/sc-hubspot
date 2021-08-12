import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const query = {
  login: gql`
    mutation login($input: LoginInput) {
      login(input: $input) {
        token
        user {
          id
          firstName
        }
      }
    }
  `,
}

function useLogin() {
  const [signUp] = useMutation<Login>(query.login)
  return [signUp]
}

export { useLogin }
