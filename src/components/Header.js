import React from 'react';
import { Row, Col, Menu } from 'antd';
import '../css/Header.css'; // 헤더 스타일

const Header = () => {
  return (
    <header className="first-page-header">
      <Row justify="space-between" align="middle" className="header-row">
        <Col>
          <div className="logo">EcoHabit</div>
        </Col>
        <Col>
          <Menu mode="horizontal" className="navigation-menu">
            <Menu.Item key="home">
              <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="about">
              <a href="/about">About</a>
            </Menu.Item>
            <Menu.Item key="contact">
              <a href="/contact">Contact</a>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
