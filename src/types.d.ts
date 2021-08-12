interface User {
  id: string
  email: string
  firstName: string
}

interface Message {
  id: string
  data: string
  createdBy: User
}

interface ItemLogin {
  token?: string
}

interface Login {
  id: string
  email: string
  firstName: string
  login: {
    [key: string]: ItemLogin
  }
}
