import React from "react";
import { map } from "ramda";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const li = sw => (
  <li key={sw.id}>
    <Link to={`/starwars/${sw.id}`}>{sw.name}</Link>
  </li>
);

const StarWars = props => (
  <div>
    <marquee direction="right">Star Wars</marquee>
    <Link to="/starwars/new">Star Wars add a new Character.</Link>
    <ul>{map(li, props.StarWarsNames
    )}</ul>
  </div>
);

const mapStateToProps = state => {
  return { StarWarsNames: state.starwars };
};

export default connect(mapStateToProps)(StarWars);
