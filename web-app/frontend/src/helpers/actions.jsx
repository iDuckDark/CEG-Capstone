import { bindActionCreators } from "redux";
import * as allActions from "../actions/allActions";

export const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(allActions, dispatch) };
};

export const mapStateToProps = () => {};
