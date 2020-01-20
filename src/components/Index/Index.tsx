import React, { useEffect, useState } from "react";

import { Button } from "antd";
import { RouteChildrenProps } from "react-router-dom";
import axios from "../../config/axios";

const Index = (props: RouteChildrenProps) => {
  const [account, setAccount] = useState("");

  const logout = () => {
    localStorage.setItem("x-token", "");
    props.history.push("/login");
  };

  useEffect(() => {
    const getMe = async () => {
      let response;
      try {
        response = await axios.get("me");
        setAccount(response.data.account || "");
      } catch (e) {
        console.error("获取用户信息失败", e);
        // if (!response || response.status === 401) {
        //   props.history.push("/login");
        // }
      }
    };

    getMe();
  }, [account, props.history]);

  return (
    <div>
      <p>{account && `欢迎，${account}`}</p>
      <Button onClick={logout}>注销</Button>
    </div>
  );
};

export default Index;
