import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import MainContent from '../components/MainContent'; 

function LoginPage() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="Login-page-container">
      <Header />
      <MainContent
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
      <Footer />
    </div>
  );
}

export default LoginPage;
