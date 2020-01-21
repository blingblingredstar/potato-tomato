import { connect } from "react-redux";
import TodoInput from "../../Todos/TodoInput";
import { addTodo } from "../actions";

const mapStateToProps = (state = { todos: [] }, ownProps = {}) => {
  return { todos: state.todos, ...ownProps };
};

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
