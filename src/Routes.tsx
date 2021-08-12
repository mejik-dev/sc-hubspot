import { parseCookies } from "nookies"
import LayoutPage from "pages/layout"
import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import { UserQuery } from "./hooks/user"
import Login from "./pages/login/login"
import Register from "./pages/register/Register"

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
  const { loading } = UserQuery()
  const cookies = parseCookies()

  const authenticated = Boolean(cookies?.token)

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
          <LayoutPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default RouterProvider
