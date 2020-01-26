import React from "react";

import "./Statistics.scss";
import { ITodo } from "../Todos/Todos";
import Polygon from "./Polygon";
import { groupBy } from "lodash";
import { format } from "date-fns";
import TodoHistoryContainer from "../redux/containers/TodoHistoryContainer";

interface IStatisticsProps {
  todos: ITodo[];
}

const Statistics: React.FC<IStatisticsProps> = ({ todos }) => {
  const finishedTodos = todos.filter(todo => todo.completed && !todo.deleted);

  const dailyTodos = groupBy(finishedTodos, todo =>
    format(new Date(todo.completed_at || 0), "yyyy-MM-dd")
  );

  return (
    <div className="Statistics">
      <ul>
        <li>统计</li>
        <li>目标</li>
        <li>番茄历史</li>
        <li>
          任务历史 累计完成{finishedTodos.length}个任务
          <Polygon
            data={dailyTodos}
            totalFinishedCount={finishedTodos.length}
          />
        </li>
      </ul>
      <TodoHistoryContainer />
    </div>
  );
};

export default Statistics;
