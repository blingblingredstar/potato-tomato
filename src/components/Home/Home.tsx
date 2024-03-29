import React, { useEffect, useState } from "react";

import { Button, Icon } from "antd";
import { RouteChildrenProps } from "react-router-dom";
import axios from "../../config/axios";

import "./Home.scss";
import Todos from "../redux/containers/TodosContainers";
import Tomatoes from "../redux/containers/TomatoesContainers";
import Logo from "./Logo";
import Statistics from "../redux/containers/StatisticsContainer";

const Home = (props: RouteChildrenProps) => {
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
      }
    };

    getMe();
  }, [account, props.history]);

  return (
    <div className="Home">
      <header className="header">
        <Logo />
        <span className="logout">
          {account && `欢迎，${account}`}
          <Button onClick={logout} size="small" type="danger">
            <Icon type="logout" />
            登出
          </Button>
        </span>
      </header>
      <main>
        <Tomatoes></Tomatoes>
        <Todos></Todos>
      </main>
      <Statistics />
    </div>
  );
};

export default Home;
