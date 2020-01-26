import React from "react";

import { Dictionary } from "lodash";
import { ITodo } from "../Todos/Todos";

import "./TodoHistoryList.scss";
import { format } from "date-fns";
import TodoHistoryItemContainer from "../redux/containers/TodoHistoryItemContainer";

interface ITodoHistoryListProps {
  dates: Array<keyof Dictionary<ITodo[]>>;
  todos: Dictionary<ITodo[]>;
  content: string;
  deleted: boolean;
  finished: boolean;
}

const TodoHistoryList: React.FC<ITodoHistoryListProps> = ({
  dates,
  todos,
  content,
  deleted,
  finished
}) => {
  const dayOfWeek = {
    "1": "周一",
    "2": "周二",
    "3": "周三",
    "4": "周四",
    "5": "周五",
    "6": "周六",
    "7": "周日"
  };

  const isValidDay = (value: string): value is keyof typeof dayOfWeek =>
    value in dayOfWeek;

  const getDay = (date: Date) => {
    const day = format(date, "e");
    return isValidDay(day) ? dayOfWeek[day] : "无法获取星期";
  };

  return (
    <>
      {dates.map(date => (
        <div key={date} className="TodoHistoryList">
          <div className="summary">
            <p className="date">
              <span>{format(new Date(date), "MM月dd日")}</span>
              <span>{getDay(new Date(date))}</span>
            </p>

            <p className="finishedCount">
              {`${content} ${todos[date].length} 个番茄任务`}
            </p>
          </div>
          <div className="content">
            {todos[date].map(todo => (
              <TodoHistoryItemContainer
                deleted={deleted}
                finished={finished}
                key={todo.id}
                {...todo}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoHistoryList;
