import React from "react";
import { ITodo } from "../Todos/Todos";
import { groupBy } from "lodash";
import { format } from "date-fns";

import { Tabs } from "antd";
import "./TodoHistory.scss";
import TodoHistoryList from "./TodoHistoryList";

const { TabPane } = Tabs;

interface ITodoHistoryProps {
  todos: ITodo[];
}

const TodoHistory: React.FC<ITodoHistoryProps> = ({ todos }) => {
  const finishedTodos = todos.filter(todo => {
    return todo.completed && !todo.deleted;
  });

  const dailyFinishedTodos = groupBy(finishedTodos, todo =>
    format(new Date(todo.completed_at || 0), "yyyy-MM-dd")
  );

  const deletedTodos = todos.filter(todo => todo.deleted);

  const dailyDeletedTodos = groupBy(deletedTodos, todo =>
    format(new Date(todo.updated_at || 0), "yyyy-MM-dd")
  );

  const finishedDates = Object.keys(dailyFinishedTodos).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  const deletedDates = Object.keys(dailyDeletedTodos).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="已完成任务" key="1">
        <TodoHistoryList
          deleted={false}
          finished={true}
          dates={finishedDates}
          todos={dailyFinishedTodos}
          content="完成"
        />
      </TabPane>
      <TabPane tab="已删除任务" key="2">
        <TodoHistoryList
          deleted={true}
          finished={false}
          dates={deletedDates}
          todos={dailyDeletedTodos}
          content="删除"
        />
      </TabPane>
    </Tabs>
  );
};

export default TodoHistory;
