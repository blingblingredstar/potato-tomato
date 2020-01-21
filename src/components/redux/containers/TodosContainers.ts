import { connect } from "react-redux";
import Todos from "../../Todos/Todos";
import { initTodos } from "../actions/todos";

const mapStateToProps = (state = { todos: [] }, ownProps = {}) => {
  return {
    todos: state.todos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  initTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
