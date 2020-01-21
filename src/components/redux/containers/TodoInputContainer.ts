import { connect } from "react-redux";
import TodoInput from "../../Todos/TodoInput";
import { addTodo } from "../actions/todos";

const mapStateToProps = (state = { todos: [] }, ownProps = {}) => {
  return { todos: state.todos, ...ownProps };
};

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
