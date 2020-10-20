import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    cssLabel: {
        color: "green",
    },

    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `${theme.palette.primary.main} !important`,
        },
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: "1px",
        borderColor: "green !important",
    },
});

class ValidField extends React.Component {
    state = {
        name: "InputMode",
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete='off'>
                <TextField
                    id='standard-name'
                    label='Name'
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                    margin='normal'
                    variant='outlined'
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        inputMode: "numeric",
                    }}
                />
            </form>
        );
    }
}

ValidField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ValidField);
