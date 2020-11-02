import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { isServerSideRendering } from "./utils";
import * as allActions from "../redux/allActions";

export const connectProps = (
    PageComponent,
    mapStateToProps,
    mapDispatchToProps
) => {
    return isServerSideRendering()
        ? PageComponent
        : connect(mapStateToProps, mapDispatchToProps)(PageComponent);
};

export const connectPropsWithStyles = (
    PageComponent,
    mapStateToProps,
    mapDispatchToProps,
    styles
) => {
    return withStyles(styles, { withTheme: true })(
        connectProps(PageComponent, mapStateToProps, mapDispatchToProps)
    );
};

export const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(allActions, dispatch) };
};

export const mapStateToProps = () => {};
