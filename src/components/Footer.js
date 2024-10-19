import React from 'react';
import { Row, Col, Space, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import '../css/Footer.css'; 

const { Text } = Typography;

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#001529', color: 'white', padding: '10px 20px' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Text>© 2024 EcoHabit. All rights reserved.</Text>
        </Col>
        <Col>
          <Space>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              <FacebookOutlined />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              <TwitterOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              <InstagramOutlined />
            </a>
          </Space>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
