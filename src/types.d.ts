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

interface Login {
  token: string
  user: User
}

interface Register {
  token: string
  user: User
}

interface Customer {
  id: string
  email: string
  name: string
  phoneNumber: string
}
