import { connect } from "react-redux";
import Tomatoes from "../../Tomatoes/Tomatoes";

const mapStateToProps = (state = { tomatoes: [] }, ownProps = {}) => {
  return {
    tomatoes: state.tomatoes,
    ...ownProps
  };
};

export default connect(mapStateToProps)(Tomatoes);
