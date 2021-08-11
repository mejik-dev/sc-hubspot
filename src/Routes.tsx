import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import { UserQuery } from "./hooks/user"
import Login from "./login"
import Register from "./Register"

type IPrivateRoute = {
  path: string
  autheticated: boolean
  nonAuthenticatedRedirect: string
  children: React.ReactNode
}

const PrivateRoute = ({ path, autheticated, nonAuthenticatedRedirect, children }: IPrivateRoute) => {
  if (!autheticated) {
    return <Route render={() => <Redirect to={nonAuthenticatedRedirect} />} />
  }

  return (
    <Route exact path={path}>
      {children}
    </Route>
  )
}

function RouterProvider(): JSX.Element {
  const { data, loading } = UserQuery()

  const authenticated = Boolean(data?.user)

  if (loading) {
    return <b>loading</b>
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/public">
          <div>Public</div>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <PrivateRoute autheticated={authenticated} nonAuthenticatedRedirect="/login" path="/">
          <div>autheticated user page</div>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default RouterProvider
