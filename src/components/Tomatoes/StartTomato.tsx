import React from "react";
import { Button } from "antd";

interface IStartTomatoProps {
  startTomato: () => void;
}

const StartTomato: React.FC<IStartTomatoProps> = props => {
  const { startTomato } = props;
  return (
    <Button
      onClick={() => {
        startTomato();
      }}
    >
      开始番茄
    </Button>
  );
};

export default StartTomato;
