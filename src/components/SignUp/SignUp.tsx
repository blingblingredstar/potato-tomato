import React, { useState, ChangeEvent } from "react";
import { Input, Icon, Button } from "antd";
import axios from "../../config/axios";
import { RouteChildrenProps, Link } from "react-router-dom";

import "./SignUp.scss";

const SignUp = (props: RouteChildrenProps) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onChangeAccount = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value || "");
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value || "");
  };
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value || "");
  };

  const submit = async () => {
    const URL = "sign_up/user";
    try {
      await axios.post(URL, {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
      console.log("注册成功");
    } catch (error) {
      console.error("提交注册用户密码失败");
    }
  };

  return (
    <div className="SignUp" id="SignUp">
      <h1>土豆番茄闹钟-注册</h1>
      <Input
        placeholder="请输入用户名"
        prefix={<Icon type="user" />}
        value={account}
        onChange={onChangeAccount}
      />
      <Input.Password
        placeholder="请输入密码"
        value={password}
        onChange={onChangePassword}
      />
      <Input.Password
        placeholder="请确认密码"
        value={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
      />
      <Button block type="primary" onClick={submit}>
        注册
      </Button>
      <p>
        如果已有账号，请<Link to="login">登录</Link>
      </p>
    </div>
  );
};

export default SignUp;
