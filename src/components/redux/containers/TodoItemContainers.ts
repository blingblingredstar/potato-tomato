import { connect } from "react-redux";
import TodoItem from "../../Todos/TodoItem";
import { editTodo, updateTodo } from "../actions/todos";

const mapStateToProps = (state = { todos: [] }, ownProps = {}) => {
  return { todos: state.todos, ...ownProps };
};

const mapDispatchToProps = {
  editTodo,
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
