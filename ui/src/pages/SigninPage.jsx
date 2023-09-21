import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userSignIn } from "../api/user.api";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';

const SigninPage = () => {
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSignIn = async ({ username, password }) => {
    if (isRequest) return;
    setIsRequest(true);

    const { response, err } = await userSignIn({ username, password });

    setIsRequest(false);

    if (response) {
      localStorage.setItem("tkn", response.token);
      navigate("/");
    }

    if (err) toast.error(err.message);
  };

  return (
    <div className="content sign-in">
      <div className="introduce">
        <div className="introduce-content">
          <p className="tips animate__animated animate__slideInLeft">
            Enter your personal details and start journey with us
          </p>
        </div>

      </div>
      <div className="form-wrapper animate__animated animate__slideInRight">
        <div className="login-form">
          <h1>Login</h1>
          <span className="login-tips">
            Measure the performance of cryptos,get big profits!
          </span>
          <div className="divider">
            <span className="line"></span>
            <span className="divider-text">Or Sigin With Email</span>
            <span className="line"></span>
          </div>
          <div className="form">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;