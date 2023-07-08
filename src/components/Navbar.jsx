import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 801) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const getItem = (label, key, icon, children, type) => {
    return { label, key, icon, children, type };
  };

  const items = [
    getItem(<Link to="/">Home</Link>, "home", <HomeOutlined />),
    getItem(
      <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      "cryptocurrencies",
      <FundOutlined />
    ),

    getItem(
      <Link to="/exchanges">Exchanges</Link>,
      "exchanges",
      <MoneyCollectOutlined />
    ),
    getItem(<Link to="/news">News</Link>, "news", <BulbOutlined />),
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size={window.innerWidth > 801 ? 64 : 40} />
        <Typography.Title
          level={window.innerWidth > 801 ? 2 : 3}
          className="logo"
        >
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          defaultSelectedKeys={
            !window.location.pathname.slice(1)
              ? "home"
              : window.location.pathname.slice(1)
          }
          items={items}
        />
      )}
    </div>
  );
};

export default Navbar;
