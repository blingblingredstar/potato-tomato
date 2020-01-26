import React from "react";

import "./Statistics.scss";
import { ITodo } from "../Todos/Todos";
import Polygon from "./Polygon";
import { groupBy } from "lodash";
import { format } from "date-fns";
import TodoHistoryContainer from "../redux/containers/TodoHistoryContainer";
import { ITomato } from "../Tomatoes/Tomatoes";

interface IStatisticsProps {
  todos: ITodo[];
  tomatoes: ITomato[];
}

const Statistics: React.FC<IStatisticsProps> = ({ todos, tomatoes }) => {
  const finishedTodos = todos.filter(todo => todo.completed && !todo.deleted);
  const dailyTodos = groupBy(finishedTodos, todo =>
    format(new Date(todo.completed_at || 0), "yyyy-MM-dd")
  );

  const finishedTomatoes = tomatoes.filter(
    tomato => tomato.ended_at && tomato.description
  );

  const dailyFinishedTomatoes = groupBy(finishedTomatoes, tomato =>
    format(new Date(tomato.ended_at || 0), "yyyy-MM-dd")
  );

  return (
    <div className="Statistics">
      <ul>
        <li className="StatisticItem">
          <div className="title">
            <span>统计</span>
            <span>一月累计</span>
            <span>{finishedTomatoes.length}</span>
          </div>
          <div className="chart">
            <Polygon
              data={dailyFinishedTomatoes}
              totalFinishedCount={finishedTomatoes.length}
            />
          </div>
        </li>
        <li className="StatisticItem">
          <div className="title">
            <span>番茄历史</span>
            <span>累计完成番茄</span>
            <span>{finishedTomatoes.length}</span>
          </div>
          <div className="chart">
            <Polygon
              data={dailyFinishedTomatoes}
              totalFinishedCount={finishedTomatoes.length}
            />
          </div>
        </li>
        <li className="StatisticItem">
          <div className="title">
            <span>任务历史</span>
            <span>累计完成任务</span>
            <span>{finishedTodos.length}</span>
          </div>
          <div className="chart">
            <Polygon
              data={dailyTodos}
              totalFinishedCount={finishedTodos.length}
            />
          </div>
        </li>
      </ul>
      <TodoHistoryContainer />
    </div>
  );
};

export default Statistics;
