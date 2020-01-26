import React from "react";
import { ITodo } from "../Todos/Todos";
import { Dictionary } from "lodash";
import { ITomato } from "../Tomatoes/Tomatoes";
import { Chart, Geom, Axis } from "bizcharts";

interface IPolygonProps {
  data: Dictionary<ITodo[] | ITomato[]>;
  totalFinishedCount: number;
}

const Polygon: React.FC<IPolygonProps> = ({ data, totalFinishedCount }) => {
  const dates = Object.keys(data).sort((a, b) => Date.parse(a) - Date.parse(b));
  const chartData = dates.map(date => ({
    date,
    count: data[date].length || 0
  }));

  return (
    <Chart
      renderer="svg"
      className="Polygon"
      height={200}
      width={330}
      data={chartData}
    >
      <Axis name="date" label={null} tickLine={null} />
      <Axis name="count" label={null} tickLine={null} />
      <Geom
        type="area"
        opacity={0.5}
        position="date*count"
        color={["count", "rgba(215,78,78,0.5)"]}
      />
    </Chart>
  );
};

export default Polygon;
