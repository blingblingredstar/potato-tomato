import { connect } from "react-redux";
import Statistics from "../../Statistics/Statistics";

const mapStateToProps = (
  state = { todos: [], tomatoes: [] },
  ownProps = {}
) => {
  return {
    todos: state.todos,
    tomatoes: state.tomatoes,
    ...ownProps
  };
};

export default connect(mapStateToProps)(Statistics);
