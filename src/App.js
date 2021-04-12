import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={"/pokemon/"}>Search</NavLink>
      </nav>
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
