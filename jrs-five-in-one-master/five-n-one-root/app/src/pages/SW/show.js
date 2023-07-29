import React from "react";
import Component from "@reactions/component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GetStarWars } from "../../action-creators/SW";

const ShowStarWars = props => (
  <Component>
    {() => (
      <div>
        {props.match.params.id === props.id ? (
          <div>
            <h1>{props.name}</h1>
            <Link to={`/starwars/${props.id}/edit`}>
              <button type="button">Edit</button>
            </Link>
            <button
              type="button"
              onClick={() => props.RemoveStarWars(props.id)}
            >
              Remove
            </button>
          </div>
        ) : (
          <p>Loading....</p>
        )}
      </div>
    )}
  </Component>
);

const mapStateToProps = state => {
  return state.CurrentStarWars;
};

const mapActionToProps = dispatch => ({
  GetStarWars: id => dispatch(GetStarWars(id)),
  RemoveStarWars: id => null
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ShowStarWars);
