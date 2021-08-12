import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
// import { useNavigate } from "react-router-dom"
// import HeaderNoticeComponent from './notice';
import Avator from "assets/header/avator.jpeg"
import { ReactComponent as EnUsSvg } from "assets/header/en_US.svg"
import { ReactComponent as LanguageSvg } from "assets/header/language.svg"
import { ReactComponent as ZhCnSvg } from "assets/header/zh_CN.svg"
import AntdSvg from "assets/logo/antd.svg"
// import { LocaleFormatter, useLocale } from 'locales';
import ReactSvg from "assets/logo/react.svg"
// import { FC } from "react"
import * as React from "react"
// import { logoutAsync, setUserItem } from 'stores/user.store';
// import { useAppDispatch, useAppState } from 'stores';

const { Header } = Layout

interface HeaderProps {
  collapsed: boolean
  toggle: () => void
}

type Action = "userInfo" | "userSetting" | "logout"

// eslint-disable-next-line react/prop-types
const HeaderComponent: React.FC = () => {
  // const navigate = useNavigate()

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span>header.avator.accoun </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span>header.avator.logout </span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="layout-page-header">
      <div className="logo" style={{ width: 200 }}>
        <img src={ReactSvg} alt="" style={{ marginRight: "20px" }} />
        <img src={AntdSvg} alt="" />
      </div>
      <div className="layout-page-header-main">
        <div>
          <span id="sidebar-trigger">{<MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          {/* <HeaderNoticeComponent /> */}

          <span style={{ cursor: "pointer" }}>login</span>
        </div>
      </div>
    </Header>
  )
}

export default HeaderComponent
