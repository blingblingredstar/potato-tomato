import { connect } from "react-redux";
import TodoHistory from "../../Statistics/TodoHistory";

const mapStateToProps = (state = { todos: [] }, ownProps = {}) => {
  return {
    todos: state.todos,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TodoHistory);
