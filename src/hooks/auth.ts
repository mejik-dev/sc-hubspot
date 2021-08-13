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

const useLogin = () => {
  const [signUp] = useMutation<{ login: Login }>(query.login)
  return [signUp]
}

export { useLogin }
