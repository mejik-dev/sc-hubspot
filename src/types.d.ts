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

interface ResponseLogin {
  token: string
  user: User
}

interface ResponseRegister {
  token: string
  user: User
}

interface Customer {
  id: string
  email: string
  name: string
  phoneNumber: string
}

interface ValueFormCustomer {
  name: string
  phoneNumber: string
  email: string
  prefix?: string
}
