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
  const [signIn] = useMutation<{ login: ResponseLogin }>(query.login)
  return [signIn]
}

const useRegister = () => {
  const [signUp] = useMutation<{ register: ResponseRegister }>(querySignUp.register)
  return [signUp]
}

export { useLogin, useRegister }
