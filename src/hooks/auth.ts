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

const querySignUp = {
  register: gql`
    mutation register($input: RegisterInput) {
      register(input: $input) {
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
  const [signIn] = useMutation<{ login: Login }>(query.login)
  return [signIn]
}

const useRegister = () => {
  const [signUp] = useMutation<{ register: Register }>(querySignUp.register)
  return [signUp]
}

export { useLogin, useRegister }
