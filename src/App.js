import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import PokemonList from './containers/PokemonList';
import PokemonCard from './containers/PokemonCard';
import { NavLink } from 'react-router-dom';
import PokeballImg from './pokeball.svg';

function App() {
  return (
    <div className="App">
      <nav>
        <div>
          <NavLink to={"/pokemon/"}>
            <img src={PokeballImg} />
            <p>Pokemon</p>
          </NavLink>
        </div>
        
      </nav>
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={PokemonCard} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
