import React from "react";
import { connect } from "react-redux";
import Form, { Field } from "react-redux-form";
import { CHG_CURRENT_STARWARS } from "../../constants";
import { AddStarWars } from "../../action-creators/SW";

const StarWarsForm = props => (
  <div>
    {!props.isFetching ? (
      <React.Fragment>
        <marquee> Star Wars Add Character.</marquee>
        <Form
          onChange={props.onChange}
          onSubmit={props.onSubmit(props.history)}
          cancelURL="/starwars"
          {...props.CurrentStarWars}
        />
      </React.Fragment>
    ) : (
      <p>Adding...........</p>
    )}
  </div>
);

const mapStateToProps = state => ({
  CurrentStarWars: state.CurrentStarWars,
  isFetching: state.isFetching
});

const mapActionToProps = dispatch => ({
  onChange: (field, value) => {
    dispatch({ type: CHG_CURRENT_STARWARS, payload: { [field]: value } });
  },
  onSubmit: history => value => dispatch(AddStarWars(history, value))
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(StarWarsForm);
