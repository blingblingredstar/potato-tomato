import React, { useState } from "react";
import { Input, Icon, Button } from "antd";
import axios from "../../config/axios";
import { RouteChildrenProps, Link } from "react-router-dom";

import "./Login.scss";

const Login = (props: RouteChildrenProps) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const URL = "sign_in/user";
    try {
      await axios.post(URL, {
        account,
        password
      });

      props.history.push("/");
    } catch (error) {
      console.error("用户登录失败");
    }
  };

  return (
    <div className="Login" id="Login">
      <h1>土豆番茄闹钟-登录</h1>
      <Input.Group>
        <Input
          placeholder="请输入用户名"
          prefix={<Icon type="user" />}
          value={account}
          onChange={e => {
            setAccount(e.target.value || "");
          }}
        />
        <Input.Password
          placeholder="请输入密码"
          prefix={<Icon type="lock" />}
          value={password}
          onChange={e => {
            setPassword(e.target.value || "");
          }}
        />
      </Input.Group>

      <Button block type="primary" onClick={submit}>
        登录
      </Button>
      <p>
        如果没有账号，<Link to="/signUp">现在注册</Link>
      </p>
    </div>
  );
};

export default Login;
