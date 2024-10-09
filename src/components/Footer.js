import React from 'react';
import { Row, Col, Space, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import '../css/Footer.css'; 

const { Text } = Typography;

const Footer = () => {
  return (
    <footer className="first-page-footer">
      <Row justify="space-between" align="middle" className="footer-row">
        <Col>
          <Text>© 2024 EcoHabit. All rights reserved.</Text>
        </Col>
        <Col>
          <Space className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
          </Space>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
