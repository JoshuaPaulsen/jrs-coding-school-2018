import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Colors from "./pages/colors";
import ShowColor from "./pages/colors/show";
import ColorForm from "./pages/colors/form";
import StarWars from "./pages/SW";
import ShowStarWarsForm from "./pages/SW/show";
import StarWarsForm from "./pages/SW/form";

const Menu = props => {
  return (
    <div>
      <h1>Five in One</h1>
      <ul>
        <li>
          <Link to="/colors">Colors</Link>
        </li>
        <li>
          <Link to="/starwars">Star Wars Names</Link>
        </li>
        <li>
          <Link to="/fortune-cookies">Fortune Cookies</Link>
        </li>
        <li>
          <Link to="/emojis">Emojis</Link>
        </li>
      </ul>
    </div>
  );
};

const App = props => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route exact path="/colors" component={Colors} />
          <Route exact path="/colors/new" component={ColorForm} />
          <Route exact path="/colors/:id" component={ShowColor} />
          <Route exact path="/starwars" component={StarWars} />
          <Route exact path="/starwars/:id" component={ShowStarWarsForm} />
          <Route exact path="/starwars/new" component={StarWarsForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
