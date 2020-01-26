import { connect } from "react-redux";
import TodoHistoryItem from "../../Statistics/TodoHistoryItem";
import { updateTodo } from "./../actions/todos";

const mapStateToProps = (state = {}, ownProps = {}) => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = {
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryItem);
