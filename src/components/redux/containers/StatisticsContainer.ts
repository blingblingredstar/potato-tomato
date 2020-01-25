import { connect } from "react-redux";
import Statistics from "../../Statistics/Statistics";

const mapStateToProps = (state = { todos: [] }, ownProps = {}) => {
  return {
    todos: state.todos,
    ...ownProps
  };
};

export default connect(mapStateToProps)(Statistics);
