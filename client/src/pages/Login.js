import { Alert, Button, Form, Input } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch("http://localhost:8000/user/signin", requestOptions)
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          const { token, refresh_token } = data;
          Cookies.set("accessToken", token);
          Cookies.set("refreshToken", refresh_token);
          navigate("/dashboard");
        } else setError("S.th went wrong !");
      })

      .catch((err) => {
        console.log("err", err);
        setError("internal server error");
      })
      .finally(() => setIsLoading(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onClose = (e) => {
    console.log(e, "I was closed.");
  };
  return (
    <div className="login__container">
      {error && (
        <Alert
          className="login__alert-box"
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClose}
        />
      )}
      <div className="login__card">
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ width: "100%" }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input className="input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="input" />
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
