import { connect } from "react-redux";
import Tomatoes from "../../Tomatoes/Tomatoes";
import { addTomato, initTomatoes, updateTomato } from "../actions/tomatoes";

const mapStateToProps = (state = { tomatoes: [] }, ownProps = {}) => {
  return {
    tomatoes: state.tomatoes,
    ...ownProps
  };
};

const mapDispatchToProps = {
  addTomato,
  initTomatoes,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);
