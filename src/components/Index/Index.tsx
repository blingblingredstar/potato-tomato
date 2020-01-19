import React from "react";

import { Button } from "antd";
import { RouteChildrenProps } from "react-router-dom";

const Index = (props: RouteChildrenProps) => {
  const login = () => {
    props.history.push("/login");
  };

  return (
    <div>
      Index
      <Button onClick={login}>登录</Button>
    </div>
  );
};

export default Index;
