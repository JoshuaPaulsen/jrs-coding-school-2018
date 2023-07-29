import React from "react";
import Form from "react-redux-form";
import { connect } from "react-redux";
import { addColor, chgColor } from "../../action-creators/colors";

const ColorForm = props => {
  return (
    <div>
      {!props.isFetching ? (
        <React.Fragment>
          <h1>Color Add Color</h1>
          <Form
            cancelURL="/colors"
            onSubmit={props.onSubmit(props.history)}
            onChange={props.onChange}
            isColor={true}
            {...props.currentColor}
          />
        </React.Fragment>
      ) : (
        <p>Adding a New Color...</p>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentColor: state.currentColor,
    isFetching: state.isFetching
  };
};

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch(chgColor(field, value));
    },
    onSubmit: history => color => {
      dispatch(addColor(color, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ColorForm);
