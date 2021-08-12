import { Layout } from "antd"
import ReactSvg from "assets/logo/react.svg"
import { destroyCookie } from "nookies"
import * as React from "react"
import { useHistory } from "react-router-dom"

const { Header } = Layout

interface HeaderProps {
  isLogged: boolean
}

const HeaderComponent: React.FC<HeaderProps> = ({ isLogged }: HeaderProps) => {
  const history = useHistory()

  const handleLogout = () => {
    destroyCookie(null, "token")
    history.push("/login")
  }

  return (
    <Header className="layout-page-header">
      <div className="logo" style={{ width: 200 }}>
        <img src={ReactSvg} alt="" style={{ marginRight: "20px" }} />
      </div>
      <div className="layout-page-header-main">
        <div></div>
        <div className="actions">
          <span style={{ cursor: "pointer" }} onClick={handleLogout} aria-hidden="true">
            {isLogged ? "logout" : "login"}
          </span>
        </div>
      </div>
    </Header>
  )
}

export default HeaderComponent
